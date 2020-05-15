/**
 * Project: Predire in Grafana
 * File: ConfigRegression.tsx
 * Author: Federico Carboni
 * Created: 2020-05-01
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing of Regression Configs.
 */

import React from 'react';
import { PanelOptionsGroup } from '@grafana/ui';
import { Config } from '../Config';
import OptionRL from '../../../../common/OptionsRegression';
import Predictor from '../../../../common/Predictor';

export class ConfigRegression extends Config {
    private predictor?: Predictor<OptionRL>;

    private getSeriesNames() {
        return this.props.data.series.map(serie => {
            return serie.name || 'unknown';
        });
    }

    renderQueryOptions() {
        const seriesName = this.getSeriesNames();

        const options: JSX.Element[] = [];
        for (const i of seriesName.keys()) {
            options.push(
                <option value={i} selected={this.predictor?.getOpt().getToPredict() === i}>
                    {seriesName[i]}
                </option>
            );
        }
        return options;
    }

    setToPredict(value: string) {
        let opt: OptionRL = this.props.options.predictor?.getOpt();
        opt.setToPredict(Number.parseInt(value, 10));
        this.render();
    }

    render() {
        this.predictor = this.props.options.predictor;
        if (!this.predictor?.getOpt().getToPredict()) {
            this.predictor?.getOpt().setToPredict(0);
        }
        return (
            <PanelOptionsGroup title={'Regression - ' + this.predictor?.getAlgorithm()}>
                <p>{this.predictor?.getPredFun() ? 'Function: ' + this.predictor?.getPredFun() : ''}</p>
                <label className="gf-form-label width-10" style={{ display: 'inline-block' }}>
                    {' '}
                    y (value to predict){' '}
                </label>
                <div className="gf-form-select-wrapper width-10" style={{ display: 'inline-block' }}>
                    <select
                        className="input-small gf-form-input"
                        onChange={event => this.setToPredict(event.target.value)}
                    >
                        {this.renderQueryOptions()}
                    </select>
                </div>
            </PanelOptionsGroup>
        );
    }
}
