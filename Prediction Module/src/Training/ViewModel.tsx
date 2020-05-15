/**
 * Project: Predire in Grafana
 * File: ViewModel.tsx
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-05-06
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing ViewModel class for manage the Model and the View.
 */

import React, { PureComponent } from 'react';
import './App.css';
import View from './View';
import Model from './Model';
import { algview, opt } from './strategies/Strategies';
import { PluginConfigPageProps, AppPluginMeta } from '@grafana/data';

export default class ViewModel extends PureComponent<PluginConfigPageProps<AppPluginMeta>> {
    private model: Model;
    private algorithm: string;
    state = {
        algView: undefined,
        options: {},
        fun: '',
        acc: 0,
    };

    constructor(props: any) {
        super(props);
        this.model = new Model();
        this.algorithm = 'RL';
    }

    static validateFile(text: string): void {
        const fileReg = /^[-?\d.\d?,-?\d.\d?\n]+/;
        if (!text.match(fileReg)) {
            throw new Error('Data has wrong formattation!');
        }
    }

    /** Data parsed from string to Array */
    static parseCSVtoData(text: string): number[][] {
        /* csv delimiters */
        let row = '\n';
        let field = ',';
        let result: number[][] = []; //output

        text.trim() //remove white spaces
            .split(row) //separate rows
            .forEach(element => {
                let sPoint = element.split(field);
                let point: number[] = [];
                sPoint.forEach(e => {
                    point.push(parseFloat(e));
                });
                result.push(point);
            });
        return result;
    }

    loadData(input: File | null): void {
        const reader = new FileReader(); // declare file reader
        if (input) {
            reader.readAsText(input); // read file
            try {
                reader.onload = event => {
                    // when loaded
                    ViewModel.validateFile(
                        event.target ? (event.target.result ? event.target.result.toString() : '') : ''
                    );
                    const data = ViewModel.parseCSVtoData(
                        event.target ? (event.target.result ? event.target.result.toString() : '') : ''
                    );
                    this.model.setData(data);
                    let t = document.getElementById('train');
                    if (t) {
                        t.setAttribute('style', 'display: block');
                    }
                };
            } catch (e) {
                alert(e);
            }
        }
    }

    loadOpt(input: File | null): void {
        if (input) {
            const reader = new FileReader(); // declare file reader
            const exstension: string | undefined = input.name.split('.').pop();
            if (exstension === 'json') {
                reader.readAsText(input); // read file
                try {
                    reader.onload = event => {
                        // when loaded
                        const config: string = event.target
                            ? event.target.result
                                ? event.target.result.toString()
                                : ''
                            : '';
                        this.model.setPredictorOptions(config);
                        this.setState({ options: this.model.getPredictor()?.getOpt() });
                        this.setState({ fun: '' });
                        this.setState({ acc: 0 });
                    };
                } catch (e) {
                    alert(e);
                }
            } else {
                alert('File extension is not json!');
            }
        }
    }

    setAlgorithm(alg: string): void {
        this.algorithm = alg;
    }

    selectAlgorithm(): void {
        this.model.setAlgorithm(this.algorithm);
        this.setState({ algView: algview[this.algorithm] });
        this.setState({ options: opt[this.algorithm] });
        let a = document.getElementById('alg');
        if (a) {
            a.setAttribute('disabled', 'true');
        }
        let i = document.getElementById('import');
        if (i) {
            i.setAttribute('style', 'display: block');
        }
    }

    train(): void {
        if (this.model.getData()) {
            this.model.train();
            if (
                !this.model
                    .getPredictor()
                    ?.getPredFun()
                    .match(/NaN/)
            ) {
                let f = document.getElementsByClassName('function')[0];
                let f1 = document.getElementsByClassName('function')[1];
                if (f && f1) {
                    f.setAttribute('style', 'display: block');
                    f1.setAttribute('style', 'display: block');
                }
                let r = document.getElementById('reset');
                if (r) {
                    r.setAttribute('style', 'display: block');
                }
                let d = document.getElementById('download');
                if (d) {
                    d.setAttribute('style', 'display: block');
                }
                this.setState({ fun: this.model.getPredictor()?.getPredFun() });
                this.setState({ acc: this.model.getPredictor()?.getAcc() });
            } else {
                alert('Dataset is not relevant to the algorithm!');
            }
        }
    }

    render() {
        return (
            <View
                selectAlg={event => {
                    this.setAlgorithm(event.target.value);
                }}
                buttonSelectAlg={() => {
                    this.selectAlgorithm();
                }}
                buttonInputData={e => {
                    this.loadData(e.target ? (e.target.files ? e.target.files[0] : null) : null);
                }}
                buttonInputOpt={e => {
                    this.loadOpt(e.target ? (e.target.files ? e.target.files[0] : null) : null);
                }}
                buttonTrain={() => this.train()}
                predictor={this.state.fun}
                nameAcc={this.algorithm === 'RL' || 'RLOG' || 'REXP' ? 'R^2' : 'F-Measure'}
                accuracy={this.state.acc}
                buttonDownload={() => {
                    this.model.downloadPredictor();
                }}
                AlgView={this.state.algView}
                options={this.state.options}
            />
        );
    }
}
