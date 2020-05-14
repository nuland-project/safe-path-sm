import styled from '@emotion/native';
import React from 'react';
import { connect } from 'react-redux';

import { Typography } from '../../components/Typography';
import { StateEnum } from '../../constants/enums';
import languages from '../../locales/languages';
import { ExposureCalendarView } from './ExposureCalendarView';
import { SingleExposureDetail } from './SingleExposureDetail';

const mapStateToProps = state => ({
  status: state.application.status,
});

/**
 * Detailed info when there is some exposure found
 *
 * @param {{history: !import('../../constants/history').History}} param0
 */
const DetailedHistory = ({ history, status }) => {
  const exposedDays = history.filter(day => day.exposureMinutes > 0);
  console.log(status);
  return (
    <>
      <ExposureCalendarView weeks={3} history={history} />

      <Divider />

      {exposedDays.map(({ exposureMinutes, date }) => (
        <SingleExposureDetail
          key={date.format()}
          date={date}
          exposureMinutes={exposureMinutes}
        />
      ))}

      {status === StateEnum.NO_CONTACT && (
        <>
          <Typography use='headline3'>
            {languages.t('history.calendar_title_no_contacts')}
          </Typography>
          <Typography use='body3'>
            {languages.t('history.calendar_information_no_contacts')}
          </Typography>
          <Divider />
        </>
      )}

      {status === StateEnum.AT_RISK && (
        <>
          <Typography use='headline3'>
            {languages.t('history.what_does_this_mean')}
          </Typography>
          <Typography use='body3'>
            {languages.t('history.what_does_this_mean_para')}
          </Typography>
          <Divider />
          <Typography use='headline3'>
            {languages.t('history.what_if_no_symptoms')}
          </Typography>
          <Typography use='body3'>
            {languages.t('history.what_if_no_symptoms_para')}
          </Typography>
          <Divider />
        </>
      )}

      {status === StateEnum.COVID_POSITIVE && (
        <>
          <Typography use='headline3'>
            {languages.t('history.you_have_been_diagnosed')}
          </Typography>
          <Typography use='body3'>
            {languages.t('history.strictly_follow_the_instructions')}
          </Typography>
          <Divider />
        </>
      )}
    </>
  );
};

export default connect(mapStateToProps)(DetailedHistory);

const Divider = styled.View`
  height: 24px;
  width: 100%;
`;
