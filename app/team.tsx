import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export default function Team() {
  const { theme } = useTheme();

  const players = [
    {
      id: 1,
      name: 'Jopito Álvarez',
      position: 'Delantero',
      number: 9,
      image: require('../assets/images/Jopito Alvarez.png'),
    },
    {
      id: 2,
      name: 'Anaya',
      position: 'Capitán',
      number: 10,
      image: require('../assets/images/Anaya.png'),
    },
  ];

  const stats = [
    { label: 'Partidos Jugados', value: '15' },
    { label: 'Victorias', value: '8' },
    { label: 'Empates', value: '4' },
    { label: 'Derrotas', value: '3' },
    { label: 'Goles a Favor', value: '25' },
    { label: 'Goles en Contra', value: '15' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Team Banner */}
      <View style={styles.banner}>
        <Image
          source={require('../assets/images/Uniformes cucuta 1.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={[styles.bannerOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <Image
            source={require('../assets/images/100 años logo 1.png')}
            style={styles.anniversaryBadge}
            resizeMode="contain"
          />
          <Text style={[styles.teamName, { color: theme.colors.primary}]}>
            Cúcuta Deportivo
          </Text>
          <Text style={[styles.teamMotto, { color: theme.colors.secondary }]}>
            Pasión por el fútbol
          </Text>
        </View>
      </View>

      {/* Team Stats */}
      <View style={styles.statsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Estadísticas
        </Text>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View
              key={index}
              style={[styles.statCard, { backgroundColor: theme.colors.card }]}
            >
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.text }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Players Section */}
      <View style={styles.playersSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Jugadores
        </Text>
        {players.map((player) => (
          <TouchableOpacity
            key={player.id}
            style={[styles.playerCard, { backgroundColor: theme.colors.card }]}
            activeOpacity={0.8}
          >
            <Image source={player.image} style={styles.playerImage} />
            <View style={styles.playerInfo}>
              <View style={styles.playerHeader}>
                <Text style={[styles.playerName, { color: theme.colors.text }]}>
                  {player.name}
                </Text>
                <View style={[styles.numberBadge, { backgroundColor: theme.colors.primary }]}>
                  <Text style={[styles.numberText, { color: theme.colors.secondary }]}>
                    {player.number}
                  </Text>
                </View>
              </View>
              <Text style={[styles.playerPosition, { color: theme.colors.text }]}>
                {player.position}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    height: 250,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  anniversaryBadge: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  teamName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  teamMotto: {
    fontSize: 18,
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  statCard: {
    width: '47%',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  playersSection: {
    padding: 20,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  playerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  numberBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  numberText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerPosition: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 5,
  },
}); 