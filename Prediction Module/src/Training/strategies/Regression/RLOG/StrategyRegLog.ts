/**
 * Project: Predire in Grafana
 * File: StrategyRegLog.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-05-07
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing StrategyRegLog class for the algortihm Logarithmic Regression.
 */

import Strategy from '../../Strategy';
import regression from 'regression';
import Predictor from '../../../../common/Predictor';
import OptionRegression from '../../../../common/OptionsRegression';
import DataRegression from '../DataRegression';

export default class StrategyRegLog implements Strategy {
    train(dataset: DataRegression, options: OptionRegression): Predictor<OptionRegression> {
        return new Predictor(
            'RLOG',
            regression.logarithmic(dataset.getPoints(), {
                order: options.getOrder(),
                precision: options.getPrecision(),
            }).equation,
            regression.logarithmic(dataset.getPoints(), {
                order: options.getOrder(),
                precision: options.getPrecision(),
            }).string,
            options,
            regression.logarithmic(dataset.getPoints(), {
                order: options.getOrder(),
                precision: options.getPrecision(),
            }).r2
        );
    }
}
