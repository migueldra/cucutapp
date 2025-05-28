import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import LoadingScreen from '../components/LoadingScreen';
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 6 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#000000',
            borderTopColor: '#000000',
            height: Platform.OS === 'ios' ? 85 : 60,
            paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          },
          tabBarActiveTintColor: '#FF0000',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: 'Usuario',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="shop"
          options={{
            tabBarLabel: 'Tienda',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="news"
          options={{
            tabBarLabel: 'Noticias',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="newspaper-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="matches"
          options={{
            tabBarLabel: 'Partidos',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
