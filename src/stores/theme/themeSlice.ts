import { createSlice } from '@reduxjs/toolkit';
import { ThemeState } from '../../types/theme';
import { applyTheme, getInitialTheme } from '../../utils/theme';

const initialState: ThemeState = {
  isDarkMode: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      applyTheme(state.isDarkMode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;