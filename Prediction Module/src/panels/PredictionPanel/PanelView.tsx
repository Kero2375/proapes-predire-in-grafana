/**
 * Project: Predire in Grafana
 * File: PanelView.tsx
 * Author: Carboni Federico
 * Created: 2020-02-30
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing Panel View for the MVVM.
 */

import React, { PureComponent } from 'react';
import Option from 'common/Options';

interface Props {
    algorithm: string;
    coefficients: any[];
    opt: Option;
    accuracy?: number;
    lastValue?: number;
    pause: () => void;
    start: () => void;
}

export class PanelView extends PureComponent<Props> {
    btn_stop: any;
    btn_start: any;

    componentDidMount() {
        this.btn_stop = document.getElementById('btn_stop');
        this.btn_start = document.getElementById('btn_start');
    }

    private pause = () => {
        this.props.pause();
        if (this.btn_stop) {
            this.btn_stop.hidden = true;
        }
        if (this.btn_start) {
            this.btn_start.hidden = false;
        }
    };

    private start = () => {
        this.props.start();
        if (this.btn_stop) {
            this.btn_stop.hidden = false;
        }
        if (this.btn_start) {
            this.btn_start.hidden = true;
        }
    };

    render() {
        const { algorithm, coefficients, opt, lastValue, accuracy } = this.props;

        return (
            <div>
                <pre>
                    - Algorithm: {algorithm + '\n'}- Coefficients: {coefficients + '\n'}
                    {opt ? '- Options: ' + JSON.stringify(opt, null, 4) + '\n' : ''}- Accuracy: {accuracy + '\n'}
                </pre>
                <div style={{ textAlign: 'center' }}>
                    <h1>{lastValue}</h1>
                    <button id="btn_stop" className="btn btn-danger" onClick={this.pause}>
                        {'Stop'}
                    </button>
                    <button id="btn_start" className="btn btn-success" onClick={this.start} hidden>
                        {'Start'}
                    </button>
                </div>
            </div>
        );
    }
}
