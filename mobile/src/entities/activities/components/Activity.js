import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { format, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import Button from '../../../common/components/Button';
import COLORS from '../../../constants/colors';
import DATE from '../../../constants/date';
import { unjoinActivity, joinActivity } from '../actions';

const Activity = ({ activityId }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const activity = useSelector(({ activities }) => {
    return activities.entities[activityId];
  });

  const day = DATE.days[getDay(new Date(activity.date))];
  const date = format(new Date(activity.date), `dd/MMM/yy`, { locale: es });

  const signup = () => {
    dispatch(joinActivity(activityId));
  };

  const cancel = () => {
    dispatch(unjoinActivity(activityId));
  };

  const seeWhoGoes = () => {
    navigate('ParticipantsScreen', { activityId });
  };

  const button = activity.userWillAttend ? (
    <Button loading={activity.isLoading} danger onPress={cancel} small>
      Cancelar
    </Button>
  ) : (
    <Button
      icon={<Icon type="simple-line-icon" name="pencil" size={15} color="white" />}
      onPress={signup}
      small
      loading={activity.isLoading}
    >
      Anotarse
    </Button>
  );

  return (
    <Card containerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Card.Title style={styles.title}>{activity.title}</Card.Title>
        {activity.userWillAttend && (
          <Icon type="ionicon" name="checkmark-circle" size={20} color="green" />
        )}
      </View>

      <View style={styles.dateContainer}>
        <View style={styles.spaceBetween}>
          <View style={styles.spaceBetween}>
            <Text style={styles.dateText}>{day}</Text>
            <Text style={styles.dateText}>{date}</Text>
          </View>
        </View>

        <TouchableNativeFeedback onPress={seeWhoGoes}>
          <View style={styles.whoGoesContainer}>
            <Text style={styles.whoGoesText}>Ver</Text>
            <Icon type="font-awesome-5" name="users" size={15} color={COLORS.primary} />
            <Text style={styles.whoGoesCounter}>({activity.willAttendCount})</Text>
          </View>
        </TouchableNativeFeedback>
      </View>

      <Card.Divider />

      <Text style={styles.descriptionContainer}>{activity.description}</Text>

      <View style={styles.footer}>{button}</View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    marginTop: 0,
    paddingHorizontal: 25
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
    marginBottom: 0,
    marginRight: 5,
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
    fontSize: 11,
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

export default Activity;
