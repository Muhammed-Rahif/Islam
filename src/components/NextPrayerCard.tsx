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
import { chevronForwardOutline, locationOutline } from 'ionicons/icons';
import Countdown from 'react-countdown';

type Props = {
  isLoading: boolean;
  nextPrayer: { name: string; time: Date; readableTime: string } | null;
  timezone: string;
  methodName: string;
  hijriDate: string;
  hijriWeekDay: string;
  gregorianDate: string;
  gregorianWeekDay: string;
};

export default function NextPrayerCard({
  isLoading,
  nextPrayer,
  timezone,
  methodName,
  hijriDate,
  hijriWeekDay,
  gregorianDate,
  gregorianWeekDay,
}: Props) {
  return (
    <IonCard className="mx-3 my-4">
      {isLoading ? (
        <IonCardContent className="flex items-center justify-center h-56">
          <IonSpinner name="dots" />
        </IonCardContent>
      ) : (
        <>
          <IonCardHeader className="pb-1">
            <IonCardTitle>{nextPrayer?.name}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonText color="dark">
              <small className="opacity-75 block">is the next prayer in</small>
              <Countdown
                daysInHours
                date={nextPrayer?.time}
                className="text-lg"
              />
              <small className="opacity-75 inline-block mx-1">
                ({nextPrayer?.readableTime})
              </small>
            </IonText>

            <div className="my-2 grid opacity-75 grid-cols-2">
              <small className="flex items-center justify-start">
                <IonIcon
                  icon={locationOutline}
                  className="-translate-y-px pr-0.5"
                />{' '}
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
                {methodName}
              </small>
            </div>

            <hr className="opacity-20 mt-2" />

            <table className="w-full border-separate text-[13px] text-left table-auto mt-1.5">
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
