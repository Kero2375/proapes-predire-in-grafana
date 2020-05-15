/**
 * Project: Predire in Grafana
 * File: DataRegression.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-05-07
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing DataRegression class for the algortihm Regression-like.
 */

import { DataPoint } from 'regression';
import Data from '../Data';

export default class DataRegression implements Data {
    private points: DataPoint[] = [];

    setValue(dataset: number[][]): void {
        this.points = [];
        dataset.forEach(p => {
            let point: DataPoint = [0, 0];
            point[0] = p[0];
            point[1] = p[1];
            this.points.push(point);
        });
    }

    getPoints(): DataPoint[] {
        return this.points;
    }
}
