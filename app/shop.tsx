import { Ionicons } from '@expo/vector-icons';
import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    {
      id: 4,
      name: 'Gorra Oficial',
      price: '$29.99',
      image: require('../assets/images/alterna.png'),
    },
    {
      id: 5,
      name: 'Bufanda Oficial',
      price: '$19.99',
      image: require('../assets/images/alterna.png'),
    },
    {
      id: 6,
      name: 'Taza Oficial',
      price: '$14.99',
      image: require('../assets/images/alterna.png'),
    },
  ];

  const handleAddToCart = (product) => {
    Alert.alert('Agregado al carrito', `${product.name} ha sido agregado al carrito.`);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      key={item.id}
      style={[styles.productCard, { backgroundColor: theme.colors.card }]}
      activeOpacity={0.8}
      onPress={() => Alert.alert(item.name, `Precio: ${item.price}`)}
    >
      <Animated.View entering={FadeInDown.delay(item.id * 100)}>
        <Image source={item.image} style={styles.productImage} resizeMode="contain" />
        <View style={styles.productInfo}>
          <Text style={[styles.productName, { color: theme.colors.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.productPrice, { color: theme.colors.primary }]}>
            {item.price}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => handleAddToCart(item)}
          activeOpacity={0.7}
        >
          <Ionicons name="add-circle-outline" size={28} color={theme.colors.primary} />
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={item => item.id.toString()}
      numColumns={2} // Dos columnas
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
          <TouchableOpacity style={styles.cartButton} onPress={() => Alert.alert('Carrito', 'Carrito de compras vacío')}>
            <Ionicons name="cart-outline" size={28} color={theme.colors.primary} />
          </TouchableOpacity>
        </Animated.View>
      }
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 1,
  },
  cartButton: {
    padding: 10,
  },
  productsContainer: {
    padding: 10,
  },
  productCard: {
    borderRadius: 20,
    margin: 10,
    overflow: 'hidden',
    flex: 1,
    maxWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 180,
  },
  productInfo: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 2,
  },
  row: {
    justifyContent: 'space-between',
  },
});

