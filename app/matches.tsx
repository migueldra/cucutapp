import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export default function Matches() {
  const { theme } = useTheme();

  const upcomingMatches = [
    {
      id: 1,
      opponent: 'Atlético Nacional',
      date: '15 Mar 2024',
      time: '20:00',
      venue: 'Estadio General Santander',
      isHome: true,
    },
    {
      id: 2,
      opponent: 'Millonarios',
      date: '22 Mar 2024',
      time: '19:30',
      venue: 'Estadio El Campín',
      isHome: false,
    },
  ];

  const pastMatches = [
    {
      id: 3,
      opponent: 'Santa Fe',
      date: '8 Mar 2024',
      score: '2-1',
      result: 'W',
      isHome: true,
    },
    {
      id: 4,
      opponent: 'Junior',
      date: '1 Mar 2024',
      score: '0-0',
      result: 'D',
      isHome: false,
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Upcoming Matches */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Próximos Partidos
        </Text>
        {upcomingMatches.map((match) => (
          <TouchableOpacity
            key={match.id}
            style={[styles.matchCard, { backgroundColor: theme.colors.card }]}
            activeOpacity={0.8}
          >
            <View style={styles.matchHeader}>
              <Text style={[styles.matchDate, { color: theme.colors.text }]}>
                {match.date} - {match.time}
              </Text>
              <Text style={[styles.matchVenue, { color: theme.colors.text }]}>
                {match.venue}
              </Text>
            </View>
            <View style={styles.matchTeams}>
              <View style={styles.team}>
                <Text style={[styles.teamName, { color: theme.colors.text }]}>
                  {match.isHome ? 'Cúcuta Deportivo' : match.opponent}
                </Text>
                {match.isHome && (
                  <Ionicons name="home" size={20} color={theme.colors.primary} />
                )}
              </View>
              <Text style={[styles.vs, { color: theme.colors.text }]}>VS</Text>
              <View style={styles.team}>
                <Text style={[styles.teamName, { color: theme.colors.text }]}>
                  {match.isHome ? match.opponent : 'Cúcuta Deportivo'}
                </Text>
                {!match.isHome && (
                  <Ionicons name="airplane" size={20} color={theme.colors.primary} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Past Matches */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Partidos Anteriores
        </Text>
        {pastMatches.map((match) => (
          <TouchableOpacity
            key={match.id}
            style={[styles.matchCard, { backgroundColor: theme.colors.card }]}
            activeOpacity={0.8}
          >
            <View style={styles.matchHeader}>
              <Text style={[styles.matchDate, { color: theme.colors.text }]}>
                {match.date}
              </Text>
              <View style={[
                styles.resultBadge,
                { backgroundColor: match.result === 'W' ? theme.colors.success : 
                  match.result === 'D' ? theme.colors.warning : theme.colors.notification }
              ]}>
                <Text style={styles.resultText}>{match.result}</Text>
              </View>
            </View>
            <View style={styles.matchTeams}>
              <View style={styles.team}>
                <Text style={[styles.teamName, { color: theme.colors.text }]}>
                  {match.isHome ? 'Cúcuta Deportivo' : match.opponent}
                </Text>
                {match.isHome && (
                  <Ionicons name="home" size={20} color={theme.colors.primary} />
                )}
              </View>
              <Text style={[styles.score, { color: theme.colors.text }]}>
                {match.score}
              </Text>
              <View style={styles.team}>
                <Text style={[styles.teamName, { color: theme.colors.text }]}>
                  {match.isHome ? match.opponent : 'Cúcuta Deportivo'}
                </Text>
                {!match.isHome && (
                  <Ionicons name="airplane" size={20} color={theme.colors.primary} />
                )}
              </View>
            </View>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  matchCard: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  matchDate: {
    fontSize: 14,
    opacity: 0.8,
  },
  matchVenue: {
    fontSize: 14,
    opacity: 0.8,
  },
  matchTeams: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  team: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vs: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  resultBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  resultText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
