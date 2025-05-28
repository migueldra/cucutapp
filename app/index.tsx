import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header with Logos */}
      <LinearGradient
        colors={['#FF0000', '#CC0000']}
        style={styles.header}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/boman logo dorado 1.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/images/cucuta_col 1.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/images/100 años logo 1.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>

      {/* Últimos Resultados Section */}
      <View style={styles.resultsSection}>
        <Text style={styles.sectionTitle}>Últimos Resultados</Text>
        <View style={styles.resultsContainer}>
          <TouchableOpacity style={styles.arrowButton}>
            <Text style={styles.arrowText}>{'<'}</Text>
          </TouchableOpacity>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.resultsScroll}
          >
            <View style={styles.matchCard}>
              <View style={styles.matchContent}>
                <Image
                  source={require('../assets/images/cucuta_col 1.png')}
                  style={styles.teamLogo}
                  resizeMode="contain"
                />
                <Text style={styles.scoreText}>2-1</Text>
                <Image
                  source={require('../assets/images/Union Magdalena 1.png')}
                  style={styles.teamLogo}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={styles.matchCard}>
              <View style={styles.matchContent}>
                <Image
                  source={require('../assets/images/pngfind.com-escudo-millonarios-png-3394561 1.png')}
                  style={styles.teamLogo}
                  resizeMode="contain"
                />
                <Text style={styles.scoreText}>3-3</Text>
                <Image
                  source={require('../assets/images/cucuta_col 1.png')}
                  style={styles.teamLogo}
                  resizeMode="contain"
                />
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.arrowButton}>
            <Text style={styles.arrowText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Galería de la Semana Section */}
      <View style={styles.gallerySection}>
        <Text style={styles.sectionTitle}>Galería de la Semana</Text>
        <View style={styles.galleryGrid}>
          <View style={styles.galleryCard}>
            <Image
              source={require('../assets/images/Anaya.png')}
              style={styles.galleryImage}
              resizeMode="cover"
            />
            <Text style={styles.playerName}>JULIAN ANAYA</Text>
          </View>
          <View style={styles.galleryCard}>
            <Image
              source={require('../assets/images/Jopito Alvarez.png')}
              style={styles.galleryImage}
              resizeMode="cover"
            />
            <Text style={styles.playerName}>JOPITO ALVAREZ</Text>
          </View>
        </View>
      </View>

      {/* Shop Banner */}
      <TouchableOpacity 
        style={styles.shopBanner}
        onPress={() => router.push('/shop')}
      >
        <Image
          source={require('../assets/images/back-scaled 2.png')}
          style={styles.shopBackground}
          resizeMode="cover"
        />
        <View style={styles.shopContent}>
          <Image
            source={require('../assets/images/Uniformes cucuta 1.png')}
            style={styles.shopImage}
            resizeMode="contain"
          />
          <View style={styles.shopButton}>
            <Text style={styles.shopButtonText}>COMPRA LA NUEVA{'\n'}INDUMENTARIA</Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLogo: {
    width: width * 0.2,
    height: width * 0.2,
  },
  resultsSection: {
    padding: 10,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000000',
  },
  resultsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 24,
    color: '#000000',
  },
  resultsScroll: {
    paddingHorizontal: 10,
  },
  matchCard: {
    backgroundColor: '#FF0000',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    width: width * 0.6,
  },
  matchContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamLogo: {
    width: 50,
    height: 50,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  gallerySection: {
    padding: 10,
    width: '100%',
  },
  galleryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  galleryCard: {
    width: width * 0.47,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  galleryImage: {
    width: '100%',
    height: width * 0.6,
    borderRadius: 10,
  },
  playerName: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  shopBanner: {
    margin: 10,
    borderRadius: 10,
    width: width - 20,
    overflow: 'hidden',
    height: 150,
    position: 'relative',
  },
  shopBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  shopContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    height: '100%',
  },
  shopImage: {
    width: width * 0.3,
    height: width * 0.3,
  },
  shopButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  shopButtonText: {
    color: '#FF0000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
