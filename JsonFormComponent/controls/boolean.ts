import { ControlDefinition } from '../types';
import { createInput } from './default';

export function generateBoolean(
  control: ControlDefinition,
  value: boolean | null
): HTMLElement {
  var div = document.createElement('div');
  div.setAttribute('class', 'custom-switch');

  const input = createInput(control, 'custom-control-input');
  input.setAttribute('type', 'checkbox');
  input.checked = !!value;
  div.appendChild(input);

  const label = document.createElement('label');
  label.setAttribute('class', 'custom-control-label');
  label.setAttribute('for', 'insurgo-' + control.name.toLowerCase());
  label.innerText = control.label;
  div.appendChild(label);

  return div;
}
