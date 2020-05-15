/**
 * Project: Predire in Grafana
 * File: Model.ts
 * Author: Carboni Federico
 * Created: 2020-02-24
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing Model.
 */

import Predictor from 'common/Predictor';
import { Data } from 'panels/PredictionPanel/utils/Data';
import { Predicted } from 'panels/PredictionPanel/utils/Predicted';
import { strategies } from './strategies/strategies';
import { Strategy } from './strategies/Strategy';
import Option from '../../common/Options';

export class Model {
    private data?: Data;
    private predicted?: Predicted;
    private predictor?: Predictor<any>;
    private strategy?: Strategy;

    setData(data: Data) {
        this.data = data;
    }

    setPredictor(predictor: Predictor<Option>) {
        this.predictor = predictor;
        if (!strategies[predictor.getAlgorithm()]) {
            throw Error('Wrong algorithm');
        }
        this.strategy = strategies[predictor.getAlgorithm()];
    }

    predict() {
        if (!this.data || !this.predictor) {
            throw Error('Predictor not found');
        }
        this.predicted = this.strategy?.predict(this.data, this.predictor);

        if (!this.predicted || this.predicted.size() < 1) {
            throw Error('Data not predicted');
        }
        return this.predicted.getAt(this.predicted.size() - 1).value;
    }

    async saveToInflux() {
        if (!this.predicted) {
            throw Error('Predicted data not found');
        }
        if (!this.strategy) {
            throw Error('Algorithm not found');
        }

        this.strategy.saveToInflux();
    }
}
