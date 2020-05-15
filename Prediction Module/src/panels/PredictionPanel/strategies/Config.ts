/**
 * Project: Predire in Grafana
 * File: Config.ts
 * Author: Federico Carboni
 * Created: 2020-05-10
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Abstract configs.
 */

import { PureComponent } from 'react';
import { PanelEditorProps } from '@grafana/data';
import { Props } from '../Props';

export class Config extends PureComponent<PanelEditorProps<Props>> {}
