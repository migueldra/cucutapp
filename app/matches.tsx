import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

// Datos simulados de partidos
const partidos = [
  {
    id: 1,
    date: '2025-02-14',
    rival: 'Patriotas',
    rivalLogo: require('../assets/images/PatriotasLogo.png'),
    home: false,
    estadio: 'LA INDEPENDENCIA',
    hora: '6:00 PM',
    jugado: true,
    resultado: '1-1',
    goles: [
      { equipo: 'Patriotas', jugador: 'L. Monsalue', minuto: 9 },
      { equipo: 'Cúcuta Deportivo', jugador: 'M. Ramos', minuto: 86 },
    ],
  },
  {
    id: 2,
    date: '2025-02-23',
    rival: 'Atlético Nacional',
    rivalLogo: require('../assets/images/Internacional_F.C._de_Palmira.png'),
    home: true,
    estadio: 'GENERAL SANTANDER',
    hora: '4:00 PM',
    jugado: false,
    resultado: null,
    goles: [],
  },
];

// Utilidad para obtener días del mes y partidos por día
function getMonthDays(year: number, month: number) {
  const days = [];
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  let dayOfWeek = (firstDay + 6) % 7; // Ajuste para que lunes sea 0
  let day = 1;
  // Rellenar días previos
  for (let i = 0; i < dayOfWeek; i++) days.push(null);
  // Días del mes
  while (day <= lastDate) {
    days.push(day);
    day++;
  }
  // Rellenar días siguientes
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

export default function Matches() {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Configuración de mes actual
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const days = getMonthDays(year, month);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1));
  };

  // Partidos por fecha
  const partidosPorFecha = Object.fromEntries(
    partidos.map(p => [p.date, p])
  );

  // Día seleccionado
  const partidoSeleccionado = selectedDate ? partidosPorFecha[selectedDate] : null;

  // Formato de fecha
  function formatFecha(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  // Render calendario
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.calendarContainer, { backgroundColor: theme.colors.card }]}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={handlePrevMonth}>
            <Ionicons name="chevron-back" size={28} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.calendarTitle, { color: theme.colors.text }]}>
            {currentMonth.toLocaleString('es-ES', { month: 'long' }).toUpperCase()}
          </Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <Ionicons name="chevron-forward" size={28} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.daysRow}>
          {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'].map(d => (
            <Text key={d} style={[styles.dayName, { backgroundColor: theme.colors.primary }]}>{d}</Text>
          ))}
        </View>
        <View style={styles.daysGrid}>
          {days.map((day, idx) => {
            const fecha = day
              ? `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
              : null;
            const partido = fecha ? partidosPorFecha[fecha] : null;
            const isSelected = selectedDate === fecha;
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.dayCell,
                  { 
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border
                  },
                  day && partido ? styles.dayWithMatch : undefined,
                  isSelected && [styles.daySelected, { borderColor: theme.colors.primary }],
                ]}
                activeOpacity={partido ? 0.7 : 1}
                onPress={() => partido && setSelectedDate(fecha)}
                disabled={!partido}
              >
                {day ? (
                  partido ? (
                    <View style={styles.matchDayContent}>
                      <Image source={partido.rivalLogo} style={styles.rivalLogo} />
                      <Text style={[styles.dayNumberWithMatch, { color: theme.colors.text }]}>{day}</Text>
                    </View>
                  ) : (
                    <Text style={[styles.dayNumber, { color: theme.colors.text }]}>{day}</Text>
                  )
                ) : (
                  <Text style={[styles.dayNumberDisabled, { color: theme.colors.text }]}></Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Zona de información */}
      {partidoSeleccionado && (
        <View style={[styles.infoZone, { backgroundColor: theme.colors.card }]}>
          {partidoSeleccionado.jugado ? (
            // Partido jugado
            <View style={styles.infoRow}>
              {/* Izquierda */}
              <View style={[styles.infoLeft, { borderRightColor: theme.colors.border }]}>
                <Text style={[styles.infoEstadio, { color: theme.colors.text }]}>{partidoSeleccionado.estadio}</Text>
                <Text style={[styles.infoFecha, { color: theme.colors.text }]}>
                  {formatFecha(partidoSeleccionado.date)}
                </Text>
                <Text style={[styles.infoHora, { color: theme.colors.text }]}>{partidoSeleccionado.hora}</Text>
              </View>
              {/* Derecha */}
              <View style={styles.infoRight}>
                <View style={styles.resultRow}>
                  <Image
                    source={require('../assets/images/PatriotasLogo.png')}
                    style={styles.infoLogo}
                  />
                  <Text style={[styles.infoResultado, { color: theme.colors.primary }]}>{partidoSeleccionado.resultado}</Text>
                  <Image
                    source={require('../assets/images/cucuta_col 1.png')}
                    style={styles.infoLogo}
                  />
                </View>
                <View style={styles.goleadoresRow}>
                  {partidoSeleccionado.goles.map((gol, index) => (
                    <View key={index} style={styles.goleadorCol}>
                      <Text style={[styles.goleadorText, { color: theme.colors.text }]}>
                        {gol.minuto}' {gol.jugador}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ) : (
            // Partido por jugarse
            <View style={styles.infoRow}>
              {/* Izquierda */}
              <View style={[styles.infoLeft, { borderRightColor: theme.colors.border }]}>
                <View style={styles.resultRow}>
                  <Image
                    source={require('../assets/images/cucuta_col 1.png')}
                    style={styles.infoLogo}
                  />
                  <Text style={[styles.infoVs, { color: theme.colors.primary }]}>VS</Text>
                  <Image
                    source={partidoSeleccionado.rivalLogo}
                    style={styles.infoLogo}
                  />
                </View>
                <Text style={[styles.infoFecha, { color: theme.colors.text }]}>
                  {formatFecha(partidoSeleccionado.date)}
                </Text>
                <Text style={[styles.infoHora, { color: theme.colors.text }]}>{partidoSeleccionado.hora}</Text>
              </View>
              {/* Derecha */}
              <View style={styles.infoRight}>
                <Ionicons name="business" size={40} color={theme.colors.primary} style={{ marginBottom: 8 }} />
                <Text style={[styles.infoEstadio, { color: theme.colors.text }]}>{partidoSeleccionado.estadio}</Text>
                <TouchableOpacity
                  style={[styles.buyButton, { backgroundColor: theme.colors.primary }]}
                  onPress={() => {/* Redirigir a compra de boletas */}}
                >
                  <Text style={styles.buyButtonText}>Comprar Entrada</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  calendarContainer: {
    margin: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    minHeight: 400, // Altura mínima fija
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#222',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dayName: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#111',
    borderRadius: 8,
    marginHorizontal: 1,
    paddingVertical: 8,
    fontSize: 14,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    minHeight: 300, // Altura mínima fija para la cuadrícula
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  dayWithMatch: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E30613',
    elevation: 3,
  },
  daySelected: {
    borderColor: '#E30613',
    borderWidth: 2,
    backgroundColor: '#fff5f5',
  },
  dayNumber: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
  },
  dayNumberWithMatch: {
    fontSize: 13,
    color: '#222',
    fontWeight: 'bold',
    marginTop: 2,
  },
  dayNumberDisabled: {
    color: '#ccc',
  },
  matchDayContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rivalLogo: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginBottom: 2,
  },
  infoZone: {
    margin: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  infoLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eee',
    paddingRight: 12,
  },
  infoRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
  },
  infoEstadio: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  infoFecha: {
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
    textAlign: 'center',
  },
  infoHora: {
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  infoLogo: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    marginHorizontal: 4,
  },
  infoResultado: {
    fontSize: 28,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: '#E30613',
  },
  infoVs: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: '#E30613',
  },
  goleadoresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    width: '100%',
  },
  goleadorCol: {
    flex: 1,
    alignItems: 'center',
  },
  goleadorText: {
    fontSize: 13,
    color: '#222',
    marginTop: 2,
  },
  buyButton: {
    marginTop: 16,
    backgroundColor: '#E30613',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 2,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});