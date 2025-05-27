import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E30613', // Rojo Cúcuta
    secondary: '#000000', // Negro
    background: '#FFFFFF',
    card: '#F3F4F6',
    text: '#1F2937',
    border: '#E5E7EB',
    notification: '#E30613',
    accent: '#E30613',
    success: '#10B981',
    warning: '#F59E0B',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#E30613', // Rojo Cúcuta
    secondary: '#FFFFFF', // Blanco para contraste
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    border: '#374151',
    notification: '#E30613',
    accent: '#E30613',
    success: '#10B981',
    warning: '#F59E0B',
  },
}; 