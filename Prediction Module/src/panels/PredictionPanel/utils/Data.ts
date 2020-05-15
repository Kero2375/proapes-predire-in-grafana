/**
 * Project: Predire in Grafana
 * File: Data.ts
 * Author: Federico Carboni
 * Created: 2020-04-15
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing Data class for incpsulation of measured data.
 */

import { DataFrame } from '@grafana/data';
import { Iterator, AbstractData } from './AbstractData';

interface ValType {
    a: number;
    b: number;
    time: number;
}

export class Data extends AbstractData<ValType> {
    addValues(val: ValType) {
        this.data.push([val.a, val.b, val.time]);
    }

    getAt(index: number): ValType {
        return {
            a: this.data[index][0],
            b: this.data[index][1],
            time: this.data[index][2],
        };
    }

    static fromSeries(series: DataFrame[]): Data {
        if (!series[0] || !series[1]) {
            throw Error('Set at least 2 query before');
        }

        const time = series[0].fields[1].values.toArray();
        const s: number[][] = []; // [ [valA, valA ...] [valB, valB ...] ]
        series.forEach(serie => {
            s.push(serie.fields[0].values.toArray());
        });
        let data = new Data();
        for (const i of time.keys()) {
            data.addValues({ a: s[0][i], b: s[1][i], time: time[i] });
        }
        return data;
    }
}

export class DataIterator extends Iterator<ValType> {}
