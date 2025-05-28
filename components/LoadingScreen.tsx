import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.splitBackground}>
        <View style={styles.leftHalf} />
        <View style={styles.rightHalf} />
      </View>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/cucuta_col 1.png')}
          style={styles.topLogo}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.yearText}>1924</Text>
          <Text style={styles.titleText}>CÚCUTA DEPORTIVO</Text>
          <Text style={styles.subtitleText}>YO VIVO EL CENTENARIO</Text>
        </View>
        <Image
          source={require('../assets/images/boman logo dorado 1.png')}
          style={styles.bottomLogo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splitBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  leftHalf: {
    flex: 1,
    backgroundColor: '#FF0000', // red on left
  },
  rightHalf: {
    flex: 1,
    backgroundColor: '#000000', // black on right
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  topLogo: {
    width: width * 0.5,
    height: height * 0.2,
  },
  bottomLogo: {
    width: width * 0.5,
    height: height * 0.1,
  },
  textContainer: {
    alignItems: 'center',
  },
  yearText: {
    color: '#D4AF37', // gold color
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitleText: {
    color: '#D4AF37', // gold color
    fontSize: 16,
    fontWeight: '600',
  },
});
