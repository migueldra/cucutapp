import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export default function Matches() {
  const { theme } = useTheme();

  const weekDays = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
  const currentMonth = 'FEBRERO';

  // Generate calendar days for February
  const days = Array.from({ length: 29 }, (_, i) => ({
    day: i + 1,
    hasMatch: i + 1 === 14, // Match on Feb 14
  }));

  // Add empty cells for proper calendar alignment
  const firstDayOffset = 3; // Wednesday is day 1
  const emptyDays = Array(firstDayOffset).fill(null);
  const allDays = [...emptyDays, ...days];

  const selectedMatch = {
    homeTeam: 'Fortaleza',
    awayTeam: 'Cúcuta D.',
    score: '1-1',
    stadium: 'LA INDEPENDENCIA',
    date: '14 DE FEBRERO DE 2024',
    time: '6:00 PM',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <ImageBackground 
        source={require('../assets/images/back-scaled 2 (1).png')}
        style={styles.header}
        imageStyle={{ opacity: 0.7 }}
      >
        <Text style={styles.headerTitle}>PARTIDOS</Text>
      </ImageBackground>

      {/* Calendar Card */}
      <View style={styles.calendarCard}>
        {/* Month Navigation */}
        <View style={styles.monthNav}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.monthText}>{currentMonth}</Text>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* Week Days */}
        <View style={styles.weekDays}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.weekDay}>
              <Text style={styles.weekDayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {allDays.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCell,
                !day && styles.emptyCell,
                day?.hasMatch && styles.matchDay,
                day?.day === 14 && styles.selectedDay,
              ]}
              disabled={!day}
            >
              {day && (
                <Text style={[
                  styles.dayText,
                  (day.hasMatch || day.day === 14) && styles.matchDayText,
                ]}>
                  {day.day}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Match Details Card */}
      <View style={styles.matchCard}>
        <View style={styles.matchTeams}>
          <View style={styles.teamContainer}>
            <Image source={require('../assets/images/Patriotas.png')} style={styles.teamLogo} />
            <Text style={styles.teamName}>{selectedMatch.homeTeam}</Text>
          </View>
          <Text style={styles.scoreText}>{selectedMatch.score}</Text>
          <View style={styles.teamContainer}>
            <Image source={require('../assets/images/cucuta_col 1.png')} style={styles.teamLogo} />
            <Text style={styles.teamName}>{selectedMatch.awayTeam}</Text>
          </View>
        </View>
        <View style={styles.matchInfo}>
          <Text style={styles.stadiumText}>ESTADIO {selectedMatch.stadium}</Text>
          <Text style={styles.dateText}>{selectedMatch.date}</Text>
          <Text style={styles.timeText}>{selectedMatch.time}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
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
  calendarCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 24,
    borderRadius: 15,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  navButton: {
    padding: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 20,
    color: '#333333',
    fontWeight: '600',
  },
  monthText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    letterSpacing: 0.5,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    paddingBottom: 15,
  },
  weekDay: {
    width: '14%',
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    paddingTop: 15,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  emptyCell: {
    backgroundColor: 'transparent',
  },
  dayText: {
    fontSize: 14,
    color: '#333333',
  },
  matchDay: {
    backgroundColor: '#FF0000',
    borderRadius: 10,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDay: {
    backgroundColor: '#FF0000',
    borderRadius: 10,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchDayText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  matchCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 15,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  matchTeams: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
  },
  teamLogo: {
    width: 40,
    height: 40,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF0000',
    marginHorizontal: 24,
  },
  matchInfo: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    paddingTop: 20,
  },
  stadiumText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
});
