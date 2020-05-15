/**
 * Project: Predire in Grafana
 * File: Data.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-05-06
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing Data interface for hierarchy base on the algortihm.
 */

export default interface Data {
    setValue(dataset: number[][]): void;
    getPoints(): number[][];
}
