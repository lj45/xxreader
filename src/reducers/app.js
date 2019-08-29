
import * as types from '../config/action_types'

const initialState = {
  isAppFirstLaunched:false,
};

export default function reducer(state=initialState,action) {
  const {type} = action;
  switch (type){
    case types.FIRST_LAUNCHED:
      state.isAppFirstLaunched = true;
      return state;
  }
  return {...state};
}
