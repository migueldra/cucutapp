import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoadingScreen from '../components/LoadingScreen';
import { CartProvider } from '../contexts/CartContext';
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

function AnimatedTabIcon({ name, color, size }: { name: string; color: string; size: number }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity onPressIn={onPressIn} onPressOut={onPressOut} activeOpacity={1}>
        <Ionicons name={name} size={size} color={color} />
      </TouchableOpacity>
    </Animated.View>
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

  const router = useRouter();
  const tabOrder = ['profile', 'shop', 'index', 'news', 'matches'];

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentRoute = router.pathname?.replace('/', '') || '';
    const currentIndex = tabOrder.indexOf(currentRoute);
    
    if (direction === 'left' && currentIndex < tabOrder.length - 1) {
      router.push(`/${tabOrder[currentIndex + 1]}`);
    } else if (direction === 'right' && currentIndex > 0) {
      router.push(`/${tabOrder[currentIndex - 1]}`);
    }
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
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
              gestureEnabled: true,
            }}
            screenListeners={{
              swipeLeft: () => handleSwipe('left'),
              swipeRight: () => handleSwipe('right'),
            }}
          >
            <Tabs.Screen
              name="profile"
              options={{
                tabBarLabel: 'Usuario',
                tabBarIcon: ({ color, size }) => (
                  <AnimatedTabIcon name="person-outline" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="shop"
              options={{
                tabBarLabel: 'Tienda',
                tabBarIcon: ({ color, size }) => (
                  <AnimatedTabIcon name="cart-outline" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="index"
              options={{
                tabBarLabel: 'Inicio',
                tabBarIcon: ({ color, size }) => (
                  <AnimatedTabIcon name="home-outline" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="news"
              options={{
                tabBarLabel: 'Noticias',
                tabBarIcon: ({ color, size }) => (
                  <AnimatedTabIcon name="newspaper-outline" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="matches"
              options={{
                tabBarLabel: 'Partidos',
                tabBarIcon: ({ color, size }) => (
                  <AnimatedTabIcon name="calendar-outline" size={size} color={color} />
                ),
              }}
            />
          </Tabs>
        </GestureHandlerRootView>
      </CartProvider>
    </ThemeProvider>
  );
}
