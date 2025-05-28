import { Ionicons } from '@expo/vector-icons';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';

const { width } = Dimensions.get('window');

export default function Shop() {
  const { theme } = useTheme();

  const products = [
    {
      id: 1,
      name: 'Camiseta Local 2024',
      price: '$89.99',
      image: require('../assets/images/cucuta-principal-600x645 1.png'),
    },
    {
      id: 2,
      name: 'Camiseta Visitante 2024',
      price: '$89.99',
      image: require('../assets/images/WhatsApp-Image-2024-01-30-at-17.02.43 1.png'),
    },
    {
      id: 3,
      name: 'Camiseta Tercera 2024',
      price: '$89.99',
      image: require('../assets/images/alterna.png'),
    },
  ];

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      key={item.id}
      style={[styles.productCard, { backgroundColor: theme.colors.card }]}
    >
      <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: theme.colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.productPrice, { color: theme.colors.primary }]}>
          {item.price}
        </Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton}>
        <Ionicons name="add-circle-outline" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}
      ListHeaderComponent={
        <Animated.View 
          entering={FadeIn.duration(1000)}
          style={styles.header}
        >
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Tienda Oficial
          </Text>
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart-outline" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  cartButton: {
    padding: 10,
  },
  productsContainer: {
    padding: 20,
  },
  productCard: {
    borderRadius: 15,
    margin: 10,
    overflow: 'hidden',
    flex: 1,
    maxWidth: '45%',
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  productInfo: {
    padding: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '500',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    padding: 5,
  },
  row: {
    justifyContent: 'space-between',
  },
});
