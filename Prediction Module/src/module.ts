import { AppPlugin } from '@grafana/data';
import { AppView } from 'AppView';
import ViewModel from 'Training/ViewModel';

export class ConfigCtrl {} // Placeholer class just for enable app.. waiting for grafana updates

export const plugin = new AppPlugin()
    .addConfigPage({
        title: 'Wizard',
        icon: 'fa fa-magic',
        body: AppView,
        id: 'import',
    })
    .addConfigPage({
        title: 'Training',
        icon: 'fa fa-arrow-down',
        body: ViewModel,
        id: 'training',
    });
