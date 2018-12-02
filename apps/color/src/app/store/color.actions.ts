import { Action } from '@ngrx/store';
import ColorInterface from './color.interface';
 
export enum ActionTypes {
  Add = '[Color] Add',
  Remove = '[Color] Remove',
  Replace = '[Color] Replace list',
}

export interface ColorAction extends Action {
  data?: any;
}

export class AddColor implements ColorAction {
  constructor(color: ColorInterface) {
      this.data = color;
  }
  readonly type = ActionTypes.Add;
  data: ColorInterface;
}

export class RemoveColor implements ColorAction {
    constructor(color: ColorInterface) {
        this.data = color;
    }
  readonly type = ActionTypes.Remove;
  data: ColorInterface;
}

export class ReplaceColors implements ColorAction {
    constructor(colors: Array<ColorInterface>) {
        this.data = colors;
    }

    readonly type = ActionTypes.Replace;
    data: Array<ColorInterface>;
}
