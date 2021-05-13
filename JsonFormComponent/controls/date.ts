import { ControlDefinition } from '../types';
import { createInput } from './default';

export function generateDate(
    control: ControlDefinition,
    value: string | null
): HTMLElement {
    const input = createInput(control);
    input.setAttribute('type', 'date');
    
    if (value) {
        input.setAttribute('value', value ? value.toString() : '');
    }

    return input;
}

export function getDateValue(date: Date | null) {
    if (!date) return null;
    return [date.getFullYear(),
    ('0' + (date.getMonth() + 1)).slice(-2),
    ('0' + date.getDate()).slice(-2)].join('-');
  }
