/**
 * Project: Predire in Grafana
 * File: Props.ts
 * Author: Federico Carboni
 * Created: 2020-02-25
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing Props.
 */

import Predictor from 'common/Predictor';

export interface Props {
    predictor?: Predictor<any>;
}
