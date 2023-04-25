import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {changeIcon, getIcon} from 'react-native-change-icon';

import logo1 from './assets/images/1.png';
import logo2 from './assets/images/2.png';
import logo3 from './assets/images/3.png';
import logo4 from './assets/images/4.png';
import logo5 from './assets/images/5.png';
import logo6 from './assets/images/6.png';
import logo7 from './assets/images/7.png';
import logo8 from './assets/images/8.png';

const appIconList = [
  {
    id: 1,
    label: 'logo_1',
    img: logo1,
    bg: '#E7D2CC',
  },
  {
    id: 2,
    label: 'logo_2',
    img: logo2,
    bg: '#E4D4C8',
  },
  {
    id: 3,
    label: 'logo_3',
    img: logo3,
    bg: '#F6F0E7',
  },
  {
    id: 4,
    label: 'logo_4',
    img: logo4,
    bg: '#EEEDE7',
  },
  {
    id: 5,
    label: 'logo_5',
    img: logo5,
    bg: '#DCD2CC',
  },
  {
    id: 6,
    label: 'logo_6',
    img: logo6,
    bg: '#EDE7DC',
  },
  {
    id: 7,
    label: 'logo_7',
    img: logo7,
    bg: '#CCAFA5',
  },
  {
    id: 8,
    label: 'logo_8',
    img: logo8,
    bg: '#BDC3CB',
  },
];

const App = () => {
  const [activeLogo, setActiveLogo] = useState('logo_1');

  const onSelectLogo = async () => {
    try {
      const response = await changeIcon(activeLogo);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const getCurrentIcon = async () => {
      const currentIcon = await getIcon();
      setActiveLogo(currentIcon === 'default' ? 'logo_1' : currentIcon);
    };
    getCurrentIcon();
  }, []);

  const renderCell = (item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.cellContainer,
          {backgroundColor: item?.id % 2 ? '#F6F0E7' : '#EEEDE7'},
        ]}
        onPress={() => setActiveLogo(item?.label)}>
        <Image source={item?.img} style={styles.logoContainer} />
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{item?.label}</Text>
        </View>
        <View style={styles.radioButtonSection}>
          <View style={styles.radioButtonOuterContainer}>
            <View
              style={[
                styles.radioButtonInnerContainer,
                {
                  backgroundColor:
                    item?.label === activeLogo ? '#019688' : 'transparent',
                },
              ]}></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.rootContainer}>
        <FlatList
          data={appIconList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => renderCell(item, index)}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonContainer}
          onPress={() => onSelectLogo()}>
          <Text style={styles.buttonLabel}>Set as app icon</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    width: '100%',
  },
  rootContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fafafa',
    padding: 8,
  },
  cellContainer: {
    flexDirection: 'row',
    backgroundColor: '#EEEDE7',
    elevation: 5,
    marginVertical: 6,
    padding: 6,
    marginHorizontal: 6,
  },
  logoContainer: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioButtonSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  radioButtonOuterContainer: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#656565',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInnerContainer: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  buttonContainer: {
    height: 45,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ae3251',
    elevation: 5,
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
