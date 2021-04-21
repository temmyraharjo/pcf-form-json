import { ControlDefinition } from '../types';
import { generateDefault } from './default';

function onLookupSearch(
  utils: ComponentFramework.Utility,
  definition: ComponentFramework.UtilityApi.LookupOptions,
  successFn: (result: ComponentFramework.EntityReference[]) => void
) {
  utils
    .lookupObjects({
      allowMultiSelect: definition.allowMultiSelect,
      defaultEntityType: definition.defaultEntityType,
      defaultViewId: definition.defaultViewId,
      entityTypes: definition.entityTypes,
      viewIds: definition.viewIds,
    })
    .then(
      (value: ComponentFramework.EntityReference[]) => {
        successFn(value);
      },
      (error) => console.error(error)
    );
}

export function generateLookup(
  utils: ComponentFramework.Utility,
  control: ControlDefinition,
  definition: ComponentFramework.UtilityApi.LookupOptions,
  value: ComponentFramework.EntityReference[]
): HTMLElement {
  const div = document.createElement('div');
  div.setAttribute('class', 'input-group');

  const textBox = document.createElement('input');
  textBox.setAttribute('class', 'form-control');
  textBox.setAttribute('id', 'display-' + control.name);
  textBox.setAttribute('readonly', 'true');
  textBox.value =
    value && value.length > 0 ? value.map((e) => e.name).join(';') : '';
  div.appendChild(textBox);

  const divChild = document.createElement('div');
  divChild.setAttribute('class', 'input-group-prepend');

  const buttonSearch = document.createElement('button');
  buttonSearch.setAttribute('class', 'btn btn-primary');
  buttonSearch.onclick = () => {
    const successFn = (result: ComponentFramework.EntityReference[]): void => {
      const names = result.map((e) => e.name).join(';');
      textBox.innerText = names;

      hidden.setAttribute('value', JSON.stringify(result));
    };
    onLookupSearch.apply(buttonSearch, [utils, definition, successFn]);
  };
  divChild.appendChild(buttonSearch);

  div.appendChild(divChild);

  const hidden = generateDefault(control, value ? JSON.stringify(value) : '');
  hidden.setAttribute('type', 'hidden');
  div.appendChild(hidden);

  return div;
}
