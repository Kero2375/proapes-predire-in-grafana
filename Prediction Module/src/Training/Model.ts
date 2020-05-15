/**
 * Project: Predire in Grafana
 * File: Model.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-05-06
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing Model class for incpsulation of buisness logic.
 */

import Strategy from './strategies/Strategy';
import { strategies, data, opt } from './strategies/Strategies';
import Predictor from '../common/Predictor';
import Data from './strategies/Data';
import Option from 'common/Options';

export default class Model {
    private data?: Data;
    private predictor?: Predictor<any>;
    private strategy?: Strategy;

    getData(): Data | undefined {
        return this.data;
    }

    getPredictor(): Predictor<Option> | undefined {
        return this.predictor;
    }

    /** Load file and save it in data */
    setData(input: number[][]): void {
        if (this.data) {
            this.data.setValue(input);
        }
    }

    /** Set the algorithm to use thanks to the Context*/
    setAlgorithm(alg: string): void {
        this.predictor = new Predictor(alg, [], '', opt[alg]);
        this.strategy = strategies[alg];
        this.data = data[alg];
    }

    setPredictorOptions(config: string): void {
        this.predictor?.setOpt(config);
    }

    /** Save the predictor in function */
    train(): void {
        const opt = this.predictor?.getOpt();
        if (this.strategy && this.data && opt) {
            this.predictor = this.strategy.train(this.data, opt);
        }
    }

    /** Download predictor as JSON */
    downloadPredictor(): void {
        if (this.predictor) {
            const FileSaver = require('file-saver'); // import file saver
            const text = this.predictor.toJSON();

            const file = new File([text], 'Training.json', { type: 'text/json;charset=utf-8' });
            FileSaver.saveAs(file); // download
        }
    }
}
