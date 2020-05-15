/**
 * Project: Predire in Grafana
 * File: StrategyRL.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-05-06
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing StrategyRL class for the algortihm Linear Regression.
 */

import Strategy from '../../Strategy';
import regression from 'regression';
import Predictor from '../../../../common/Predictor';
import DataRegression from '../DataRegression';
import OptionRegression from 'common/OptionsRegression';

export default class StrategyRL implements Strategy {
    train(dataset: DataRegression, options: OptionRegression): Predictor<OptionRegression> {
        return new Predictor(
            'RL',
            regression.linear(dataset.getPoints(), {
                order: options.getOrder(),
                precision: options.getPrecision(),
            }).equation,
            regression.linear(dataset.getPoints(), {
                order: options.getOrder(),
                precision: options.getPrecision(),
            }).string,
            options,
            regression.linear(dataset.getPoints(), { order: options.getOrder(), precision: options.getPrecision() }).r2
        );
    }
}
