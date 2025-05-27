import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';

export default function Profile() {
  const { theme } = useTheme();
  const router = useRouter();

  const handleMenuPress = () => {
    router.push('/under-construction');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.View 
        entering={FadeIn.duration(1000)}
        style={styles.header}
      >
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../assets/images/cucuta_col 1.png')}
            style={styles.profileImage}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.name, { color: theme.colors.text }]}>
          Cúcuta Deportivo
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>
          @cucutadeportivo
        </Text>
      </Animated.View>

      <Animated.View 
        entering={FadeInDown.duration(1000).delay(200)}
        style={styles.statsContainer}
      >
        
      </Animated.View>

      <Animated.View 
        entering={FadeInDown.duration(1000).delay(400)}
        style={styles.menuContainer}
      >
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: theme.colors.card }]}
          onPress={handleMenuPress}
        >
          <Ionicons name="person-outline" size={24} color={theme.colors.primary} />
          <Text style={[styles.menuText, { color: theme.colors.text }]}>Mi Perfil</Text>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.text} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: theme.colors.card }]}
          onPress={handleMenuPress}
        >
          <Ionicons name="ticket-outline" size={24} color={theme.colors.primary} />
          <Text style={[styles.menuText, { color: theme.colors.text }]}>Mis Entradas</Text>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.text} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: theme.colors.card }]}
          onPress={handleMenuPress}
        >
          <Ionicons name="heart-outline" size={24} color={theme.colors.primary} />
          <Text style={[styles.menuText, { color: theme.colors.text }]}>Favoritos</Text>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.text} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: theme.colors.card }]}
          onPress={handleMenuPress}
        >
          <Ionicons name="settings-outline" size={24} color={theme.colors.primary} />
          <Text style={[styles.menuText, { color: theme.colors.text }]}>Configuración</Text>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#FF0000',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
}); 