/**
 * Project: Predire in Grafana
 * File: AppView.tsx
 * Author: Federico Carboni
 * Created: 2020-03-12
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing App view.
 */

import React, { PureComponent } from 'react';
import { Button } from '@grafana/ui';
import { AppPluginMeta, PluginConfigPageProps } from '@grafana/data';

export class AppView extends PureComponent<PluginConfigPageProps<AppPluginMeta>> {
    private async makeDashboard() {
        const data = {
            dashboard: require('dashboards/sample.json'),
            overwrite: true,
        };

        $.post({
            url: '/api/dashboards/db',
            contentType: 'application/json',
            dataType: 'application/json',
            data: JSON.stringify(data),
            complete: res => {
                alert('Dashboard: ' + data.dashboard.title + '\nStatus: ' + res.statusText);
                location.replace('/d/' + data.dashboard.uid);
            },
        });
    }

    render() {
        return (
            <div>
                <Button onClick={() => this.makeDashboard()}>Sample Dashboard</Button>
            </div>
        );
    }
}
