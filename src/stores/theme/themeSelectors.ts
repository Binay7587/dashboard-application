import { RootState } from '../store';

export const selectIsDarkMode = (state: RootState) => state.theme.isDarkMode;