import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, TouchableOpacity } from 'react-native';
import { ThemeProvider, useTheme } from '../hooks/useTheme';

function ThemeToggle() {
  const { isDarkMode, toggleTheme, theme } = useTheme();
  return (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
      <Ionicons
        name={isDarkMode ? 'sunny' : 'moon'}
        size={24}
        color={theme.colors.secondary}
      />
    </TouchableOpacity>
  );
}

export default function Layout() {
  const { theme } = useTheme();

  return (
    <ThemeProvider>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.secondary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => <ThemeToggle />,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.border,
            height: Platform.OS === 'ios' ? 85 : 60,
            paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Cúcuta Deportivo',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            tabBarLabel: 'Inicio',
          }}
        />
        <Tabs.Screen
          name="matches"
          options={{
            title: 'Partidos',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="football" size={size} color={color} />
            ),
            tabBarLabel: 'Partidos',
          }}
        />
        <Tabs.Screen
          name="shop"
          options={{
            title: 'Tienda',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart" size={size} color={color} />
            ),
            tabBarLabel: 'Tienda',
          }}
        />
        <Tabs.Screen
          name="news"
          options={{
            title: 'Noticias',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="newspaper" size={size} color={color} />
            ),
            tabBarLabel: 'Noticias',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
            tabBarLabel: 'Perfil',
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
