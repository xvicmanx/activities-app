import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import { unjoinActivity, joinActivity } from '../redux/activitiesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { format, getDay } from 'date-fns';
import { Card, Icon } from 'react-native-elements';
import { DAYS } from '../constants';

const ActivityCard = ({ item }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const { navigate } = useNavigation();

  const signup = () => {
    dispatch(joinActivity(item.id, currentUser.token));
  };

  const cancel = () => {
    dispatch(unjoinActivity(item.id, currentUser.token));
  };

  const seeWhoGoes = () => {
    navigate('ParticipantsListScreen', { activityId: item.id });
  };

  const button = item.userWillAttend ? (
    <Button danger onPress={cancel} small>
      Cancelar
    </Button>
  ) : (
    <Button
      icon={
        <Icon type="simple-line-icon" name="pencil" size={15} color="white" />
      }
      onPress={signup}
      small
    >
      Anotarse
    </Button>
  );

  return (
    <Card containerStyle={styles.container}>
      <Card.Title style={{ textAlign: 'left', fontSize: 18 }}>
        {item.title}
      </Card.Title>
      <Card.Divider />

      <View style={styles.dateContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.dateText}>
              {DAYS[getDay(new Date(item.date))]}
            </Text>

            <Text style={styles.dateText}>
              {format(new Date(item.date), 'dd/MM/yyyy')}
            </Text>

            {item.userWillAttend && (
              <Icon
                type="ionicon"
                name="checkmark-circle"
                size={20}
                color="green"
              />
            )}
          </View>
        </View>

        <TouchableNativeFeedback onPress={seeWhoGoes}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{ color: COLORS.primary, fontSize: 17, marginRight: 10 }}
            >
              Van
            </Text>
            <Icon
              type="font-awesome-5"
              name="users"
              size={15}
              color={COLORS.primary}
            />
            <Text style={{ marginLeft: 5, color: COLORS.text }}>
              ({item.willAttendCount})
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>

      <Text style={{ marginBottom: 40, color: COLORS.text }}>
        {item.description}
      </Text>

      <View style={styles.footer}>{button}</View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginHorizontal: 0,
    marginTop: 0,
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  dateText: {
    marginRight: 5,
    color: '#43484d',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default ActivityCard;
