import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export default function News() {
  const { theme } = useTheme();

  const news = [
    {
      id: 1,
      title: 'Jopito Álvarez: Nuevo Refuerzo',
      image: require('../assets/images/Jopito Alvarez.png'),
      date: 'Hace 2 horas',
      category: 'Transferencias',
      content: 'El delantero Jopito Álvarez se convierte en nuevo jugador del Cúcuta Deportivo...',
    },
    {
      id: 2,
      title: 'Anaya: Entrevista Exclusiva',
      image: require('../assets/images/Anaya.png'),
      date: 'Hace 5 horas',
      category: 'Entrevistas',
      content: 'El capitán del equipo habla sobre los objetivos para la temporada...',
    },
    {
      id: 3,
      title: 'Nuevos Uniformes 2024',
      image: require('../assets/images/Uniformes cucuta 1.png'),
      date: 'Hace 1 día',
      category: 'Equipamiento',
      content: 'Presentamos los nuevos uniformes para la temporada 2024...',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {news.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.newsCard, { backgroundColor: theme.colors.card }]}
          activeOpacity={0.8}
        >
          <Image source={item.image} style={styles.newsImage} />
          <View style={styles.newsContent}>
            <View style={styles.newsHeader}>
              <Text style={[styles.category, { color: theme.colors.primary }]}>
                {item.category}
              </Text>
              <Text style={[styles.date, { color: theme.colors.text }]}>
                {item.date}
              </Text>
            </View>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {item.title}
            </Text>
            <Text style={[styles.content, { color: theme.colors.text }]}>
              {item.content}
            </Text>
            <View style={styles.footer}>
              <TouchableOpacity style={styles.readMore}>
                <Text style={[styles.readMoreText, { color: theme.colors.primary }]}>
                  Leer más
                </Text>
                <Ionicons name="arrow-forward" size={16} color={theme.colors.primary} />
              </TouchableOpacity>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="heart-outline" size={20} color={theme.colors.text} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="share-outline" size={20} color={theme.colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newsCard: {
    margin: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  newsImage: {
    width: '100%',
    height: 200,
  },
  newsContent: {
    padding: 15,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
    marginBottom: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  readMoreText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    padding: 5,
  },
}); 