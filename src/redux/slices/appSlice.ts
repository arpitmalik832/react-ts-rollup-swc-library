import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  SliceSelectors,
} from '@reduxjs/toolkit';

import { THEME } from '../../enums/app';
import { AppRedux, KeyValuePair } from '../../types/types.d';

const appSlice = createSlice<
  AppRedux,
  SliceCaseReducers<AppRedux>,
  string,
  SliceSelectors<AppRedux>,
  string
>({
  name: 'app',
  initialState: {
    theme: THEME.LIGHT,
  },
  reducers: {
    updateStore: (state, action: PayloadAction<KeyValuePair>) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }),
    setDarkTheme: state => ({
      ...state,
      theme: THEME.DARK,
    }),
    setLightTheme: state => ({
      ...state,
      theme: THEME.LIGHT,
    }),
  },
});

export { appSlice };
export const { updateStore, setDarkTheme, setLightTheme } = appSlice.actions;