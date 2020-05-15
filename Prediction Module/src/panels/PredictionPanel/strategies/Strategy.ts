/**
 * Project: Predire in Grafana
 * File: Strategy.ts
 * Author: Federico Carboni
 * Created: 2020-04-30
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Abstract strategy.
 */

import { Data } from 'panels/PredictionPanel/utils/Data';
import { Predicted } from 'panels/PredictionPanel/utils/Predicted';
import Option from '../../../common/Options';
import Predictor from 'common/Predictor';

export interface Strategy {
    predict(data: Data, predictor: Predictor<Option>): Predicted;
    saveToInflux(): void;
}
