import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface SwipeHandlerProps {
  children: React.ReactNode;
}

const tabOrder = ['profile', 'shop', 'index', 'news', 'matches'];

export default function SwipeHandler({ children }: SwipeHandlerProps) {
  const router = useRouter();

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentRoute = router.getCurrentOptions()?.route?.name as string;
    const currentIndex = tabOrder.indexOf(currentRoute);
    
    if (direction === 'left' && currentIndex < tabOrder.length - 1) {
      router.replace('/' + tabOrder[currentIndex + 1]);
    } else if (direction === 'right' && currentIndex > 0) {
      router.replace('/' + tabOrder[currentIndex - 1]);
    }
  };

  const gesture = Gesture.Fling()
    .direction(Gesture.DIRECTION.RIGHT | Gesture.DIRECTION.LEFT)
    .onEnd((event) => {
      if (event.velocityX > 0) {
        handleSwipe('right');
      } else {
        handleSwipe('left');
      }
    });

  return (
    <GestureDetector gesture={gesture}>
      {children}
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
