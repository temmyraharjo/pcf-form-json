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
