import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonPopover,
  IonSpinner,
  IonText,
} from '@ionic/react';
import dayjs from 'dayjs';
import { Timings, getNextPrayer } from 'features/list-prayer-times';
import { chevronForwardOutline, locationOutline } from 'ionicons/icons';
import { useCallback, useState } from 'react';
import Countdown from 'react-countdown';
import Divider from './Divider';

type Props = {
  isLoading: boolean;
  timings: Timings;
  timezone: string;
  timingMethod: string;
  hijriDate: string;
  hijriWeekDay: string;
  gregorianDate: string;
  gregorianWeekDay: string;
};

export default function NextPrayerCard({
  isLoading,
  timings,
  timezone,
  timingMethod,
  hijriDate,
  hijriWeekDay,
  gregorianDate,
  gregorianWeekDay,
}: Props) {
  const [nextPrayer, setNextPrayer] = useState(getNextPrayer(timings));

  const onCountDownComplete = useCallback(
    () => setNextPrayer(getNextPrayer(timings)),
    [timings]
  );

  return (
    <IonCard className="mx-3 my-4">
      {isLoading ? (
        <IonCardContent className="flex h-56 items-center justify-center">
          <IonSpinner name="dots" />
        </IonCardContent>
      ) : (
        <>
          <IonCardHeader className="pb-1">
            <IonCardTitle>{nextPrayer.name}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonText color="dark">
              <small className="block opacity-75">is the next prayer in</small>
              <Countdown
                key={dayjs(nextPrayer.time).unix()}
                daysInHours
                date={nextPrayer.time}
                className="text-lg"
                onComplete={onCountDownComplete}
              />
              <small className="mx-1 inline-block opacity-75">
                ({nextPrayer.readableTime})
              </small>
            </IonText>

            <div className="my-2 grid grid-cols-2 opacity-75">
              <small className="flex items-center justify-start">
                <IonIcon
                  icon={locationOutline}
                  className="-translate-y-px pr-0.5"
                />
                {timezone}
              </small>

              <IonPopover trigger="timing-method" triggerAction="context-menu">
                <IonContent class="ion-padding">
                  Prayer times calculation method.
                </IonContent>
              </IonPopover>
              <small
                id="timing-method"
                className="flex items-center justify-start"
              >
                <IonIcon
                  icon={chevronForwardOutline}
                  className="-translate-y-px pr-0.5"
                />{' '}
                {timingMethod}
              </small>
            </div>

            <Divider className="mt-2 opacity-20" />

            <table className="mt-1.5 w-full table-auto border-separate text-left text-[13px]">
              <thead className="gap-y-0.5">
                <tr>
                  <th>Hijri</th>
                  <th>Gregorian</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Yawm {hijriWeekDay}, <br />
                    {hijriDate}
                  </td>
                  <td>
                    {gregorianWeekDay}, <br />
                    {gregorianDate.normalize()}
                  </td>
                </tr>
              </tbody>
            </table>
          </IonCardContent>
        </>
      )}
    </IonCard>
  );
}
