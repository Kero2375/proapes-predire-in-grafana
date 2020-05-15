import { PanelPlugin } from '@grafana/data';
import { PanelController } from './PanelController';
import { EditorView } from './EditorView';

export const plugin = new PanelPlugin(PanelController).setEditor(EditorView);
