// Collect here all usefull functions of general purpose
import { StateEnum } from '../constants/enums';

export const convertWebStatusIntoAppStatus = status => {
  switch (status) {
    case 'negative':
      return StateEnum.NO_CONTACT;

    case 'suspected':
      return StateEnum.AT_RISK;

    case 'positive':
      return StateEnum.COVID_POSITIVE;

    default:
      return StateEnum.UNKNOWN;
  }
};
