/**
 * Project: Predire in Grafana
 * File: EditorView.tsx
 * Author: Carboni Federico
 * Created: 2020-03-12
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing Editor View for the implementation of the MVVM pattern.
 */

import React, { PureComponent } from 'react';
import { PanelOptionsGrid, PanelOptionsGroup } from '@grafana/ui';
import { Props } from './Props';
import { PanelEditorProps } from '@grafana/data';
import { configs } from './strategies/strategies';
import Predictor from 'common/Predictor';

export class EditorView extends PureComponent<PanelEditorProps<Props>> {
    private importPredictor(target: HTMLInputElement) {
        const reader = new FileReader();
        if (target.files == null) {
            throw new Error('File not selected');
        }
        reader.readAsText(target.files[0]);
        reader.onload = event => {
            try {
                this.props.options.predictor = Predictor.fromJSON(event.target?.result?.toString());
            } catch (e) {
                alert(e);
            }
            this.render();
        };
    }

    private parsePredictor() {
        try {
            this.props.options.predictor?.getAlgorithm();
        } catch (e) {
            const json: any = this.props.options.predictor;
            this.props.options.predictor = Predictor.fromJSON(json);
        }
    }

    render() {
        this.parsePredictor();
        const predictor = this.props.options.predictor;

        const algorithm = predictor?.getAlgorithm();
        let Config;
        if (algorithm && configs[algorithm]) {
            Config = configs[algorithm];
        } else {
            Config = typeof React.PureComponent;
        }

        return (
            <div>
                <PanelOptionsGrid>
                    <PanelOptionsGroup title="Import predictor">
                        <input
                            className="input gf-input gf-file"
                            type="file"
                            name="Import"
                            id="import"
                            onChange={event => this.importPredictor(event.target)}
                        />
                    </PanelOptionsGroup>
                    <Config data={this.props.data} options={this.props.options} />
                </PanelOptionsGrid>
            </div>
        );
    }
}
