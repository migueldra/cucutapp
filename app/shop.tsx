import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import CartModal from '../components/CartModal';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../hooks/useTheme';

const { width } = Dimensions.get('window');

export default function Shop() {
  const { theme } = useTheme();
  const router = useRouter();
  const { addToCart, getItemsCount } = useCart();
  const [isCartVisible, setIsCartVisible] = useState(false);

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onFinalize((event) => {
      if (Math.abs(event.translationX) < 50) return;
      
      if (event.translationX > 0) {
        router.replace('/profile');
      } else {
        router.replace('/');
      }
    });

  const products = [
    {
      id: 1,
      name: 'CAMISETA LOCAL',
      price: '180.000',
      image: require('../assets/images/cucuta-principal-600x645 1.png'),
    },
    {
      id: 2,
      name: 'CAMISETA VISITANTE',
      price: '180.000',
      image: require('../assets/images/WhatsApp-Image-2024-01-30-at-17.02.43 1.png'),
    },
    {
      id: 3,
      name: 'CAMISETA ALTERNA',
      price: '180.000',
      image: require('../assets/images/alterna.png'),
    },
    {
      id: 4,
      name: 'GORRA',
      price: '50.000',
      image: require('../assets/images/3-CUARTOS-NEGRA 1 (1).png'),
    },
    {
      id: 5,
      name: 'CAMISETA PRESENTACIÓN',
      price: '130.000',
      image: require('../assets/images/WhatsApp-Image-2024-01-30-at-16.59.51 1.png'),
    },
    {
      id: 6,
      name: 'CHOMPA PRESENTACIÓN',
      price: '240.000',
      image: require('../assets/images/WhatsApp-Image-2024-01-30-at-16.59.54 1.png'),
    },
  ];

  interface Product {
    id: number;
    name: string;
    price: string;
    image: any;
  }

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      key={item.id}
      style={[styles.productCard, { backgroundColor: theme.colors.card }]}
      onPress={() => addToCart({ ...item, quantity: 1 })}
    >
      <View style={styles.productImageContainer}>
        <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const Content = () => (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}
      ListHeaderComponent={
        <Animated.View entering={FadeIn.duration(1000)}>
          <ImageBackground 
            source={require('../assets/images/back-scaled 2 (1).png')}
            style={styles.header}
            imageStyle={{ opacity: 0.7 }}
          >
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>TIENDA</Text>
              <TouchableOpacity 
                style={styles.cartButton}
                onPress={() => setIsCartVisible(true)}
              >
                <View style={styles.cartIconContainer}>
                  <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
                  {getItemsCount() > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{getItemsCount()}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Animated.View>
      }
      ListFooterComponent={
        <Animated.View 
          entering={FadeInDown.duration(1000).delay(400)}
          style={styles.productsContainer}
        >
        </Animated.View>
      }
    />
  );

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <Content />
        <CartModal 
          isVisible={isCartVisible}
          onClose={() => setIsCartVisible(false)}
        />
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 150,
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  cartButton: {
    padding: 10,
  },
  productsContainer: {
    padding: 20,
  },
  cartIconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: '#FF0000',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 8,
    overflow: 'hidden',
    flex: 1,
    maxWidth: '45%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  productImageContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#FFFFFF',
  },
  productInfo: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Oswald-Bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: 'Oswald-Bold',
  },
  row: {
    justifyContent: 'space-between',
  },
});
