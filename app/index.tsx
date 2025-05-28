import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const { theme } = useTheme();
  const router = useRouter();
  
  // Animación para el fondo
  const bgAnim = useRef(new Animated.Value(0)).current;
  const prevBg = useRef(theme.colors.background).current;

  useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: theme.dark ? 1 : 0,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [theme.dark]);

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#181818'],
  });

  // Animaciones de entrada
  const logoFade = useRef(new Animated.Value(0)).current;
  const newsFade = useRef(new Animated.Value(0)).current;
  const newsCard1Fade = useRef(new Animated.Value(0)).current;
  const newsCard2Fade = useRef(new Animated.Value(0)).current;
  const shopFade = useRef(new Animated.Value(0)).current;

  // Animaciones de toque
  const newsScale = useRef(new Animated.Value(1)).current;
  const newsCard1Scale = useRef(new Animated.Value(1)).current;
  const newsCard2Scale = useRef(new Animated.Value(1)).current;
  const shopScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(newsFade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(newsCard1Fade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(newsCard2Fade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(shopFade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animatePress = (scaleAnim: Animated.Value) => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4
      })
    ]).start();
  };

  return (
    <Animated.ScrollView style={[styles.container, { backgroundColor }]}>
      {/* Hero Section with Split Background */}
      <View style={styles.heroSection}>
        <View style={styles.splitBackground}>
          <View style={[styles.leftHalf, { backgroundColor: '#000000' }]} />
          <View style={[styles.rightHalf, { backgroundColor: '#FF0000' }]} />
        </View>
        <Animated.View style={[styles.logoContainer, { opacity: logoFade }]}>
          <Image
            source={require('../assets/images/cucuta_col 1.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      {/* News Section */}
      <Animated.View style={[styles.newsSection, { opacity: newsFade }]}>
        <Animated.View style={[styles.newsHeader, { transform: [{ scale: newsScale }] }]}>
          <TouchableOpacity 
            onPress={() => animatePress(newsScale)}
            activeOpacity={0.9}
          >
            <Text style={styles.sectionTitle}>Últimas Noticias</Text>
          </TouchableOpacity>
        </Animated.View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.newsScrollContent}
        >
          <Animated.View style={[styles.newsCardContainer, { opacity: newsCard1Fade, transform: [{ scale: newsCard1Scale }] }]}>
            <TouchableOpacity 
              style={styles.newsCard}
              onPress={() => animatePress(newsCard1Scale)}
              activeOpacity={0.9}
            >
              <Image
                source={require('../assets/images/Jopito Alvarez.png')}
                style={styles.newsImage}
              />
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>
                  Jopito Álvarez: Nuevo Refuerzo
                </Text>
                <Text style={styles.newsDate}>
                  Hace 2 horas
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.newsCardContainer, { opacity: newsCard2Fade, transform: [{ scale: newsCard2Scale }] }]}>
            <TouchableOpacity 
              style={styles.newsCard}
              onPress={() => animatePress(newsCard2Scale)}
              activeOpacity={0.9}
            >
              <Image
                source={require('../assets/images/Anaya.png')}
                style={styles.newsImage}
              />
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>
                  Anaya: Entrevista Exclusiva
                </Text>
                <Text style={styles.newsDate}>
                  Hace 5 horas
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </Animated.View>

      {/* Shop Section */}
      <Animated.View style={[styles.shopSection, { opacity: shopFade }]}>
        <Animated.View style={{ transform: [{ scale: shopScale }] }}>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => {
              animatePress(shopScale);
              router.push('/shop');
            }}
            activeOpacity={0.9}
          >
            <View style={styles.shopContent}>
              <Image
                source={require('../assets/images/Uniformes cucuta 1.png')}
                style={styles.shopImage}
                resizeMode="contain"
              />
              <View style={styles.shopTextContainer}>
                <Text style={styles.shopTitle}>Compra Nuestras Camisetas</Text>
                <Text style={styles.shopSubtitle}>¡Únete a la pasión!</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    height: 400,
    position: 'relative',
  },
  splitBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  leftHalf: {
    flex: 1,
  },
  rightHalf: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
  },
  newsSection: {
    padding: 20,
  },
  newsHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  newsScrollContent: {
    paddingRight: 20,
  },
  newsCardContainer: {
    marginRight: 15,
  },
  newsCard: {
    width: 300,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  newsImage: {
    width: '100%',
    height: 180,
  },
  newsContent: {
    padding: 15,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  newsDate: {
    fontSize: 14,
    color: '#666666',
  },
  shopSection: {
    padding: 20,
    marginTop: 10,
  },
  shopButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    overflow: 'hidden',
  },
  shopContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  shopImage: {
    width: width * 0.3,
    height: width * 0.3,
  },
  shopTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  shopTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  shopSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
});
