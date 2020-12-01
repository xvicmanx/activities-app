import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { format, getDay } from 'date-fns';
import { Button } from '../../../common/components';
import { DAYS, COLORS } from '../../../constants';
import { unjoinActivity, joinActivity } from '../actions';

const ActivityCard = ({ activity }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.auth.currentUser);
  const { navigate } = useNavigation();

  const signup = () => {
    dispatch(joinActivity(activity.id, currentUser.data.token));
  };

  const cancel = () => {
    dispatch(unjoinActivity(activity.id, currentUser.data.token));
  };

  const seeWhoGoes = () => {
    navigate('ParticipantsScreen', { activityId: activity.id });
  };

  const button = activity.userWillAttend ? (
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
      <Card.Title style={styles.title}>{activity.title}</Card.Title>
      <Card.Divider />

      <View style={styles.dateContainer}>
        <View style={styles.spaceBetween}>
          <View style={styles.spaceBetween}>
            <Text style={styles.dateText}>
              {DAYS[getDay(new Date(activity.date))]}
            </Text>

            <Text style={styles.dateText}>
              {format(new Date(activity.date), 'dd/MM/yyyy')}
            </Text>

            {activity.userWillAttend && (
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
          <View style={styles.whoGoesContainer}>
            <Text style={styles.whoGoesText}>Van</Text>
            <Icon
              type="font-awesome-5"
              name="users"
              size={15}
              color={COLORS.primary}
            />
            <Text style={styles.whoGoesCounter}>
              ({activity.willAttendCount})
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>

      <Text style={styles.descriptionContainer}>{activity.description}</Text>

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
  title: {
    textAlign: 'left',
    fontSize: 18,
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    marginRight: 5,
    color: '#43484d',
    fontWeight: 'bold',
  },
  whoGoesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whoGoesText: {
    color: COLORS.primary,
    fontSize: 17,
    marginRight: 10,
  },
  whoGoesCounter: {
    marginLeft: 5,
    color: COLORS.text,
  },
  descriptionContainer: {
    marginBottom: 40,
    color: COLORS.text,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default ActivityCard;
