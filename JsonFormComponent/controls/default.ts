import { ControlDefinition } from '../types';

export function createInput(
  control: ControlDefinition,
  className: string = 'form-control'
) {
  const input = document.createElement('input');
  input.setAttribute('class', className);
  const name = 'insurgo-' + control.name.toLowerCase();
  input.setAttribute('id', name);

  return input;
}

export function generateDefault(
  control: ControlDefinition,
  value: string | null
): HTMLElement {
  const input = createInput(control);
  input.setAttribute('type', 'text');
  input.setAttribute('value', value ? value : '');

  return input;
}
