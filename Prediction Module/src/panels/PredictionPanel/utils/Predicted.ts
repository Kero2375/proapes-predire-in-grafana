/**
 * Project: Predire in Grafana
 * File: Predicted.ts
 * Author: Federico Carboni
 * Created: 2020-04-15
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing Predicted class for incpsulation of predicted data.
 */

import { Iterator, AbstractData } from './AbstractData';

interface ValType {
    value: number;
    time: number;
}

export class Predicted extends AbstractData<ValType> {
    addValues(val: ValType) {
        this.data.push([val.value, val.time]);
    }

    getAt(index: number): ValType {
        return {
            value: this.data[index][0],
            time: this.data[index][1],
        };
    }
}

export class PredIterator extends Iterator<ValType> {}
