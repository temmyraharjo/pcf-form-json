import { ControlDefinition, OptionSetDefinition } from "../types";
import { generateDefault } from "./default";

const CHECKBOX_INITIAL_NAME = 'insurgo-checkboxes-';
export function generateCheckbox(
    control: ControlDefinition,
    metadata: OptionSetDefinition[],
    values: number[] | string[] | null
): HTMLElement {
    const arrayValues = values as any[];
    const div = document.createElement('div');

    for (const option of metadata) {
        const divOption = document.createElement('div');
        divOption.setAttribute('class', 'form-check form-check-inline');

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('class', 'form-check-input');
        checkbox.setAttribute('name', CHECKBOX_INITIAL_NAME + control.name.toLowerCase());
        checkbox.setAttribute('value', option.value.toString());
        if (arrayValues && arrayValues.indexOf(option.value) > -1) {
            checkbox.setAttribute('checked', '');
        }
        divOption.appendChild(checkbox);

        const label = document.createElement('label');
        label.setAttribute('class', 'form-check-label');
        label.innerText = option.label;
        divOption.appendChild(label);

        div.appendChild(divOption);
    }

    const hidden = generateDefault(control, values ? JSON.stringify(values) : '');
    hidden.setAttribute('type', 'hidden');
    div.appendChild(hidden);

    return div;
}

export function setCheckBoxValue(control: ControlDefinition) : void {
    const elements = document.getElementsByName(CHECKBOX_INITIAL_NAME + 
        control.name.toLowerCase());

    const result = [];
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLInputElement;
        if (element.checked) {
            result.push(element.value as string | number);
        }
    }

    const hidden = document.getElementById('insurgo-' + 
        control.name.toLowerCase()) as HTMLInputElement;
    hidden.setAttribute('value', JSON.stringify(result));
}