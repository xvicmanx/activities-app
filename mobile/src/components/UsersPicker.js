import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const UsersPicker = ({ data, value, onChage, disabled }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={value}
        style={styles.picker}
        onValueChange={(value, index) => {
          onChage(value);
        }}
        enabled={!disabled}
      >
        {data.map((user) => {
          return <Picker.Item key={user.id} label={user.name} value={user} />;
        })}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  picker: {
    height: 50,
  },
});

export default UsersPicker;
