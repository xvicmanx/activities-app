import React, { useState } from 'react';
import { TextInput, Dimensions } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Icon, Overlay, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../common/components/Button';
import COLORS from '../../../constants/colors';
import { updateDescription } from '../actions';
const { width } = Dimensions.get('window');

const EditDescription = ({ description, close }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(({ descriptionForm }) => descriptionForm.isLoading);
  const [value, setValue] = useState(description);

  const submit = () => {
    dispatch(updateDescription(value));
  };

  const cancel = () => close();

  const pencilIcon = (
    <Icon type="simple-line-icon" name="pencil" size={20} color={COLORS.primary} />
  );

  return (
    <Overlay isVisible={true} onBackdropPress={close}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title} h4>
            Editar Description
          </Text>
          {pencilIcon}
        </View>

        <TextInput
          value={value}
          style={styles.input}
          multiline
          onChangeText={setValue}
          textAlignVertical="top"
        />

        <View style={styles.footer}>
          <Button danger small onPress={cancel}>
            Cancelar
          </Button>
          <Button loading={isLoading} small style={{ marginLeft: 10 }} onPress={submit}>
            Cambiar
          </Button>
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - width / 10,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'center',
  },

  title: {
    marginRight: 10,
  },
  input: {
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 17,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default EditDescription;
