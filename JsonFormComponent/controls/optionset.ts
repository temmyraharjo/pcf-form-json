import { ControlDefinition, OptionSetDefinition } from "../types";

export function generateOptionSet(
    control: ControlDefinition,
    value: number | null,
    metadata: OptionSetDefinition[]
): HTMLElement {
    const select = document.createElement('select');
    const name = 'insurgo-' + control.name.toLowerCase();
    select.setAttribute('id', name);
    select.setAttribute('class', 'form-control');

    const emptyOption = document.createElement('option');
    emptyOption.innerText = 'Choose..';
    select.appendChild(emptyOption);

    for (const opt of metadata) {
        const option = document.createElement('option');
        option.value = opt.value.toString();
        option.innerText = opt.label;
        if (value == opt.value) {
            option.selected = true;
        }

        select.appendChild(option);
    }

    return select;
}