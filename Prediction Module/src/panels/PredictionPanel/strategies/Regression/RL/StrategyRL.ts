/**
 * Project: Predire in Grafana
 * File: StrategyRL.ts
 * Author: Federico Carboni
 * Created: 2020-04-10
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing of Linear Regression Strategy.
 */

import { Strategy } from '../../Strategy';
import { Data, DataIterator } from '../../../utils/Data';
import { Predicted } from '../../../utils/Predicted';
import Predictor from '../../../../../common/Predictor';
import OptionRL from '../../../../../common/OptionsRegression';

export class StrategyRL implements Strategy {
    predicted: Predicted = new Predicted();
    data!: Data;
    toPredict?: number;

    predict(data: Data, predictor: Predictor<OptionRL>) {
        this.predicted.clear();
        this.data = new Data();

        this.toPredict = predictor.getOpt().getToPredict();
        const base = 1 - (this.toPredict || 0); //the other one
        const coeff = predictor.getCoefficients();

        const f = (x: number) => {
            return x ? x * coeff[0] + coeff[1] : 0;
        };

        let it = new DataIterator(data);
        let val;
        while ((val = it.next())) {
            if (val.a || val.b) {
                this.predicted.addValues({ value: f(base === 0 ? val.a : val.b), time: val.time });
                this.data.addValues({ a: val.a, b: val.b, time: val.time });
            }
        }

        return this.predicted;
    }

    saveToInflux() {
        const index = this.predicted.size() - 1;

        $.post({
            url: 'http://localhost:8086/write?db=telegraf',
            data:
                'predictionRL value=' +
                this.predicted.getAt(index).value +
                ' ' +
                this.predicted.getAt(index).time +
                '000000', // + zeros for wrong time format
        });

        const time = this.predicted.getAt(index).time;
        let diff;

        if (!this.toPredict || this.toPredict === 0) {
            diff = this.data.getAt(index).a - this.predicted.getAt(index).value;
        } else {
            diff = this.data.getAt(index).b - this.predicted.getAt(index).value;
        }

        $.post({
            url: 'http://localhost:8086/write?db=telegraf',
            data: 'predictionDiffRL value=' + Math.abs(diff) + ' ' + time + '000000', // + zeros for wrong time format
        });
    }
}
