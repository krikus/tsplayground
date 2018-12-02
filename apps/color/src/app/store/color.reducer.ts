import ColorInterface from './color.interface';
import { ActionTypes, ColorAction } from './color.actions';

const INITIAL_STATE = Array<ColorInterface>();

export function colorReducer(state = INITIAL_STATE, action: ColorAction) {
  switch(action.type) {
    case(ActionTypes.Add): {
        return [action.data, ...state];
    }

    case(ActionTypes.Remove): {
        return state.filter(x => x !== action.data)
    }

    case(ActionTypes.Replace): {
        return action.data;
    }
  }

  return state;
}