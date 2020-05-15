/**
 * Project: Predire in Grafana
 * File: DataSVM.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-05-06
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing DataSVM class for the algortihm SVM.
 */

import Data from '../Data';

export default class DataSVM implements Data {
    private points: number[][] = [];
    private labels: number[] = [];

    setValue(dataset: number[][]): void {
        this.points = [];
        this.labels = [];
        dataset.forEach(triple => {
            this.points.push([triple[0], triple[1]]);
            this.labels.push(triple[2]);
        });
    }

    getPoints(): number[][] {
        return this.points;
    }

    getLabels(): number[] {
        return this.labels;
    }
}
