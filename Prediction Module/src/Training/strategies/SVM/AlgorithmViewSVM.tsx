/**
 * Project: Predire in Grafana
 * File: AlgorithmViewSVM.tsx
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-05-06
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing AlgorithmViewSVM class for presentation logic only of the algortihm SVM.
 */

import React from 'react';
import OptionSVM from '../../../common/OptionsSVM';

interface Actions {
    options: OptionSVM;
}

export default class AlgrithmViewSVM extends React.Component<Actions> {
    /** Options:
    {
        C = 1.0; For C, Higher = you trust your data more. Lower = more regularization. Should be in range of around 1e-2 ... 1e5 at most.
        tol = 1e-4; // do not touch this unless you're pro
        alphatol = 1e-7; // used for pruning non-support vectors. do not touch unless you're pro
        maxiter // if you have a larger problem, you may need to increase this
        kernel // kernel type
        numpasses = 10; // increase this for higher precision of the result. (but slower)
    }
     */
    state = {
        opt: 0,
    };

    render() {
        const { options } = this.props;
        return (
            <div className="container">
                <h1 id="options">Options</h1>
                <div id="SVMopt" className="mb-2">
                    <label className="gf-form-label width-10 mb-2">Kernel type: linear</label>
                    <label className="gf-form-label width-10 mb-2">Alpha Tollerance: 1e-7</label>
                    <label className="gf-form-label width-10 mb-2">Tollerance: 1e-4</label>

                    <div className="gf-form">
                        <label className="gf-form-label width-10">C:</label>
                        <input
                            className="input-small gf-form-input width-15"
                            type="number"
                            id="C"
                            value={options.getC()}
                            onChange={event => {
                                options.setC(Number(event.target.value));
                                this.setState({ opt: options.getC() });
                            }}
                        />
                    </div>

                    <div className="gf-form">
                        <label className="gf-form-label width-10">Max iterations:</label>
                        <input
                            className="input-small gf-form-input width-15"
                            type="number"
                            id="maxiter"
                            value={options.getMaxIter()}
                            onChange={event => {
                                options.setMaxIter(Number(event.target.value));
                                this.setState({ opt: options.getMaxIter() });
                            }}
                        />
                    </div>

                    <div className="gf-form">
                        <label className="gf-form-label width-10">Number passes:</label>
                        <input
                            className="input-small gf-form-input width-15"
                            type="number"
                            id="numpas"
                            value={options.getNumPass()}
                            onChange={event => {
                                options.setNumPass(Number(event.target.value));
                                this.setState({ opt: options.getNumPass() });
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
