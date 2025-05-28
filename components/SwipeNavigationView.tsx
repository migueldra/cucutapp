import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface SwipeNavigationViewProps {
  children: React.ReactNode;
  currentRoute: string;
  routes: string[];
}

export default function SwipeNavigationView({ children, currentRoute, routes }: SwipeNavigationViewProps) {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, currentRoute]);

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onFinalize((event) => {
      if (Math.abs(event.translationX) < 50) return;
      
      const currentIndex = routes.indexOf(currentRoute);
      
      if (event.translationX > 0 && currentIndex > 0) {
        // Swipe right - go to previous
        const prevRoute = routes[currentIndex - 1];
        router.replace(prevRoute as any);
      } else if (event.translationX < 0 && currentIndex < routes.length - 1) {
        // Swipe left - go to next
        const nextRoute = routes[currentIndex + 1];
        router.replace(nextRoute as any);
      }
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
