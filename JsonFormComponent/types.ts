export type ControlType =
  | 'string'
  | 'number'
  | 'lookup'
  | 'boolean'
  | 'date'
  | 'optionset';

export interface ControlDefinition {
  name: string;
  label: string;
  type: ControlType;
}

export interface OptionSetDefinition {
  label: string,
  value: number
}

export interface UiDefinition {
  controls: ControlDefinition[];
  lookupMetadata: { [key: string]: ComponentFramework.UtilityApi.LookupOptions };
  optionSetMetadata: { [key: string]: OptionSetDefinition[] }
}

export interface FilterDefinition {
  entityLogicalName: string;
  filterXml: string;
}

export interface FormValue {
  [key: string]:
  | null
  | string
  | number
  | ComponentFramework.EntityReference[]
  | boolean;
}
