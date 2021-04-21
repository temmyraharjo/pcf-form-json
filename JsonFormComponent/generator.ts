import { convertToJson } from './common';
import { generateBoolean } from './controls/boolean';
import { generateDefault } from './controls/default';
import { generateLookup } from './controls/lookup';
import { generateNumber } from './controls/number';
import { IInputs } from './generated/ManifestTypes';
import { UiDefinition, FormValue } from './types';

export class Generator {
  private initialFormValue: FormValue;

  constructor(
    private container: HTMLDivElement,
    private context: ComponentFramework.Context<IInputs>,
    private submittedFunction: (result: string) => void
  ) {
    this.initialFormValue = convertToJson<FormValue>(
      context.parameters.StringProperty.raw
    );
  }

  generate() {
    if (!this.context.parameters.ControlFormJson.raw) return;

    const definition = convertToJson<UiDefinition>(
      this.context.parameters.ControlFormJson.raw
    );
    document.getElementById('insurgo-custom-form')?.remove();

    const mainDiv = document.createElement('div');
    mainDiv.setAttribute('id', 'insurgo-custom-form');

    for (const control of definition.controls) {
      const value = this.initialFormValue[control.name];

      const div = this.generateFormControlDiv();
      const label = this.generateLabel(control.label);
      div.appendChild(label);

      let controlElement: HTMLElement;
      switch (control.type) {
        case 'boolean':
          controlElement = generateBoolean(control, value as boolean);
          break;
        case 'lookup':
        case 'multilookup':
          const currentDefinition = definition.lookupMetadata[control.name];
          controlElement = generateLookup(
            this.context.utils,
            control,
            currentDefinition,
            value as ComponentFramework.EntityReference[]
          );
          break;
        case 'number':
          controlElement = generateNumber(control, value as number);
          break;
        default:
          controlElement = generateDefault(control, value as string);
          break;
      }
      div.appendChild(controlElement);

      mainDiv.appendChild(div);
    }

    const buttonDiv = this.generateFormControlDiv();
    const buttonSubmit = document.createElement('button');
    buttonSubmit.setAttribute('class', 'form-control btn btn-primary');
    buttonSubmit.innerText = 'Save';
    buttonSubmit.onclick = () => this.saveForm(definition);
    buttonDiv.appendChild(buttonSubmit);

    mainDiv.appendChild(buttonDiv);

    this.container.appendChild(mainDiv);
  }

  saveForm(uiDefinition: UiDefinition) {
    const result = {} as FormValue;
    for (const control of uiDefinition.controls) {
      const element = document.getElementById(
        'insurgo-' + control.name.toLowerCase()
      ) as HTMLInputElement;
      if (!element) continue;

      result[control.name] =
        control.type == 'boolean'
          ? element.checked
          : control.type == 'number'
          ? element.valueAsNumber
          : control.type == 'lookup' || control.type == 'multilookup' 
          ? (element.value ? element.value : null)
          : element.value;
    }

    const text = JSON.stringify(result);
    this.submittedFunction(text);
  }

  private generateLabel(labelName: string): HTMLLabelElement {
    const label = document.createElement('label');
    label.innerText = labelName;
    label.textContent = labelName;
    return label;
  }

  private generateFormControlDiv(): HTMLDivElement {
    const div = document.createElement('div');
    div.setAttribute('class', 'form-group');

    return div;
  }
}
