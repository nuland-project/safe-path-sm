import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '../constants/colors';
import { StateEnum } from '../constants/enums';
import fontFamily from '../constants/fonts';
import { COVID_STATUS } from '../constants/storage';
import { SetStoreData } from '../helpers/General';

const statusSet = [
  { value: StateEnum.NO_CONTACT, label: 'No contacts' },
  { value: StateEnum.AT_RISK, label: 'At risk' },
  { value: StateEnum.COVID_POSITIVE, label: 'COVID-19 positive' },
];

export default class CovidStatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowChoosen: '',
    };
  }

  onPress = index => {
    this.setState({ rowChoosen: index });
    SetStoreData(COVID_STATUS, statusSet[index].value);
  };

  render() {
    const { rowChoosen } = this.state;
    return (
      <View style={styles.container}>
        {statusSet.map((value, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => this.onPress(index)}
              style={[
                styles.row,
                rowChoosen === index ? { backgroundColor: Colors.VIOLET } : {},
              ]}>
              <Text
                style={[
                  styles.text,
                  rowChoosen === index ? { color: 'white' } : {},
                ]}>
                {value.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  row: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.VIOLET,
    borderRadius: 5,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fontFamily.primarySemiBold,
    fontSize: 15,
    lineHeight: 19,
    letterSpacing: 0,
    color: Colors.VIOLET,
  },
});
