import { ControlDefinition } from "../types";
import { getDateValue } from "./date";
import { createInput } from "./default";

const DATE_INITIAL_NAME = 'insurgo-datetime-';
export function generateDateTime(control: ControlDefinition,
    value: string | null) {
    const div = document.createElement('div');
    div.setAttribute('class', 'input-group');

    const valueParts = value ? value.split(' ') : [];

    const dateId = DATE_INITIAL_NAME + 'date-' + control.name.toLowerCase();
    const date = document.createElement('input');
    date.setAttribute('id', dateId);
    date.setAttribute('type', 'date');
    date.setAttribute('class', 'form-control');
    if (valueParts.length > 0 && valueParts[0]) {
        date.value = valueParts[0];
    }
    div.appendChild(date);

    const timeId = DATE_INITIAL_NAME + 'time-' + control.name.toLowerCase();
    const time = document.createElement('input');
    time.setAttribute('id', timeId);
    time.setAttribute('type', 'time');
    time.setAttribute('class', 'form-control');
    if (valueParts.length > 1 && valueParts[1]) {
        time.value = valueParts[1];
    }
    time.onchange = (e) => {
        const temp = e.target as HTMLInputElement;
        if (!temp.value) return;

        const dateElement = document.getElementById(dateId) as HTMLInputElement;
        if (dateElement.value) return;

        const dateText = getDateValue(new Date());
        dateElement.value = dateText as string;
    };
    div.appendChild(time);

    const input = createInput(control);
    input.setAttribute('type', 'hidden');
    if (value) {
        input.value = value;
    }
    div.appendChild(input);

    return div;
}

export function setDateTimeValue(control: ControlDefinition): void {
    const dateId = DATE_INITIAL_NAME + 'date-' + control.name.toLowerCase();
    const date = document.getElementById(dateId) as HTMLInputElement;
    const timeId = DATE_INITIAL_NAME + 'time-' + control.name.toLowerCase();
    const time = document.getElementById(timeId) as HTMLInputElement;

    const result = [
        getDateValue(date.valueAsDate),
        time.value
    ].filter(e => e).join(' ');

    const hidden = document.getElementById('insurgo-' +
        control.name.toLowerCase()) as HTMLInputElement;
    hidden.setAttribute('value', result);
}