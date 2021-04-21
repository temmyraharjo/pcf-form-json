export type ControlType =
  | 'string'
  | 'number'
  | 'lookup'
  | 'multilookup'
  | 'boolean';

export interface ControlDefinition {
  name: string;
  label: string;
  type: ControlType;
}

export interface UiDefinition {
  controls: ControlDefinition[];
  lookupMetadata: { [key: string]: ComponentFramework.UtilityApi.LookupOptions };
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
