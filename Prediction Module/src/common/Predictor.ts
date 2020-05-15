/**
 * Project: Predire in Grafana
 * File: Predictor.ts
 * Author: Federico Carboni
 * Created: 2020-04-16
 * Version: 0.1
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 0.1 - Writing Predictor class for incpsulation of pred info.
 */

import Option from './Options';
import { options } from '../panels/PredictionPanel/strategies/strategies';

export default class Predictor<Opt extends Option> {
    private algorithm: string;
    private coefficients: number[];
    private predFun: string;
    private opt: Opt;
    private accuracy?: number;

    constructor(algorithm: string, coefficients: number[], predFun: string, opt: Opt, acc?: number) {
        this.algorithm = algorithm;
        this.coefficients = coefficients;
        this.predFun = predFun;
        this.opt = opt;
        if (acc) {
            this.accuracy = acc;
        }
    }

    getAlgorithm(): string {
        return this.algorithm;
    }

    getCoefficients(): number[] {
        return this.coefficients;
    }

    getPredFun(): string {
        return this.predFun;
    }

    getOpt(): Opt {
        return this.opt;
    }

    getAcc(): number | undefined {
        return this.accuracy;
    }

    setOpt(conf: string) {
        this.opt.setValueFile(conf);
    }

    static fromJSON(str: string | undefined): Predictor<Option> {
        if (!str) {
            throw Error('No file found');
        }

        let json = JSON.parse(str);
        let opt = options[json.algorithm];

        // if (!json.algorithm || !json.coefficients) {
        //     throw Error('Error reading file');
        // }

        let predictor = new Predictor(
            json.algorithm,
            json.coefficients,
            json.predFun || '',
            opt.fromJSON(json.opt || {}),
            json.accuracy
        );

        return predictor;
    }

    toJSON(): string {
        const textFile = JSON.stringify(
            {
                GroupName: 'ProApes',
                Version: '3.0.0-1.9',
                PluginName: 'PredireInGrafana',
                algorithm: this.algorithm,
                coefficients: this.coefficients,
                predFun: this.predFun,
                opt: this.opt,
                accuracy: this.accuracy,
            },
            null,
            2
        ); // string output

        return textFile;
    }
}
