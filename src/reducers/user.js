"use strict";

import * as types from '../config/action_types';

const initState = {
  token:''
};

export default function reducer(state=initState,action) {
  const {payload,type} = action;
  switch (type){
    case types.UPDATE_TOKEN:
      return {
        ...state,
        token:action.token,
      };
    default:
      return state;
  }
}
