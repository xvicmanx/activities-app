// @flow

import { toast } from 'react-toastify';
import { encode } from '../../../../core/helpers';
import type { Options } from '../../../../core/helpers';
import ActivitiesService from '../../services/ActivitiesService';

const Controller = {
  fetchItems: async (
    options: Options
  ): Promise<{ items: any, total: any, ... }> => {
    const response = await ActivitiesService.fetchActivities(encode(options));
    return {
      items: response.activities,
      total: response.total,
    };
  },
  create: async (activity: Object): Promise<any> => {
    try {
      const result = await ActivitiesService.createActivity(activity);
      toast.success('Actividad creada de manera exitosa!');
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  update: async (activity: Object): Promise<any> => {
    try {
      const result = await ActivitiesService.updateActivity(activity);
      toast.success('Actividad actualizada de manera exitosa!');
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  delete: async (activity: Object): Promise<any> => {
    try {
      const result = await ActivitiesService.deleteActivity(activity.id);
      toast.success('Actividad eliminada de manera exitosa!');
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};

export default Controller;
