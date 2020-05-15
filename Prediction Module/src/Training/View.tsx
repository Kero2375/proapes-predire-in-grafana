/**
 * Project: Predire in Grafana
 * File: View.tsx
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-05-06
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing View class for incpsulation of presentation logic.
 */

import React, { ChangeEvent } from 'react';
import './App.css';

interface Actions {
    selectAlg: (event: any) => void;
    buttonSelectAlg: () => void;
    buttonInputData: (event: ChangeEvent<HTMLInputElement>) => void;
    buttonInputOpt: (event: ChangeEvent<HTMLInputElement>) => void;
    buttonTrain: () => void;
    predictor: string;
    nameAcc: string;
    accuracy: number;
    buttonDownload: () => void;
    AlgView?: typeof React.Component;
    options: any;
}

export default class View extends React.Component<Actions> {
    renderAlgorithmView() {
        if (this.props.AlgView) {
            return <this.props.AlgView options={this.props.options} />;
        } else {
            return <div></div>;
        }
    }

    render() {
        const {
            buttonSelectAlg,
            selectAlg,
            buttonInputData,
            buttonInputOpt,
            buttonTrain,
            predictor,
            nameAcc,
            accuracy,
            buttonDownload,
        } = this.props;
        return (
            <div className="main">
                <div className="container">
                    <h1>Training Module</h1>
                    <div className="gf-form">
                        <label htmlFor="alg" className="gf-form-label width-15">
                            Choose the algorithm:
                        </label>
                        <div className="gf-form-select-wrapper max-width-20">
                            <select
                                className="input-small gf-form-input"
                                disabled={false}
                                id="alg"
                                onChange={selectAlg}
                            >
                                <option value="RL">Regressione Lineare (RL)</option>
                                <option value="SVM">Support Vector Machine (SVM)</option>
                                <option value="RLOG">Regressione Logaritmica (RLOG)</option>
                                <option value="REXP">Regressione Esponenziale (REXP)</option>
                            </select>
                        </div>
                    </div>
                    <div className="gf-form">
                        <button className="css-370vzt-button" onClick={buttonSelectAlg}>
                            Confirm
                        </button>
                    </div>
                </div>
                <div>
                    <div className="graph">{this.renderAlgorithmView()}</div>
                </div>

                <div id="import" style={{ display: 'none' }}>
                    <div className="container">
                        <div>
                            <label className="button">
                                Import data (.csv)
                                <input
                                    className="form-input"
                                    type="file"
                                    name="data"
                                    id="data"
                                    onChange={buttonInputData}
                                    accept=".csv,.txt"
                                />
                            </label>
                            <label className="button">
                                Import previous options (.json)
                                <input
                                    className="form-input"
                                    type="file"
                                    name="opt"
                                    id="opt"
                                    onChange={buttonInputOpt}
                                    accept=".json"
                                />
                            </label>

                            <input
                                className="button"
                                id="train"
                                type="button"
                                value="Train 🚂"
                                onClick={() => {
                                    buttonTrain();
                                }}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                    <div className="container">
                        <h1>Results</h1>
                        <div>
                            <p className="function gf-form-label mr-0" style={{ display: 'none' }}>
                                Function: {predictor}
                            </p>
                            <p className="function gf-form-label mr-0" style={{ display: 'none' }}>
                                {nameAcc}: {accuracy}
                            </p>

                            <div>
                                <input
                                    className="button"
                                    type="button"
                                    value="Download Predictor"
                                    id="download"
                                    onClick={buttonDownload}
                                    style={{ display: 'none' }}
                                />

                                <input
                                    className="button"
                                    id="reset"
                                    type="button"
                                    value="Reset"
                                    onClick={() => {
                                        window.location.reload(false);
                                    }}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
