
import * as types from '../config/action_types';
import {createAction} from 'redux-actions';

export const isFirstLaunched = createAction(types.FIRST_LAUNCHED);
