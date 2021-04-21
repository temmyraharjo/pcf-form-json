import { ControlDefinition } from '../types';
import { createInput } from './default';

export function generateNumber(
  control: ControlDefinition,
  value: number | null
): HTMLElement {
  const input = createInput(control);
  input.setAttribute('type', 'number');
  input.setAttribute('value', value ? value.toString() : '');

  return input;
}
