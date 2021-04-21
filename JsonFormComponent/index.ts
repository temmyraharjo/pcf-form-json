import 'jquery';
import 'popper.js';
import 'bootstrap';

import { IInputs, IOutputs } from './generated/ManifestTypes';
import { Generator } from './generator';

export class JsonFormComponent
  implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _container: HTMLDivElement;
  private _notifyOutputChanged: () => void;
  private _result: string;

  constructor() {}
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    this._container = container;
    this._notifyOutputChanged = notifyOutputChanged;
    new Generator(this._container, context, (result) => {
      this._result = result;
      this._notifyOutputChanged();
    }).generate();
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    new Generator(this._container, context, (result) => {
      this._result = result;
      this._notifyOutputChanged();
    }).generate();
  }

  public getOutputs(): IOutputs {
    return {
      StringProperty: this._result,
    };
  }
  public destroy(): void {}
}
