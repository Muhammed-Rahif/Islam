import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonRefresher,
  IonRefresherContent,
  IonRippleEffect,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import DisplayError from 'components/DisplayError';
import { ListPrayerTimes, usePrayerTimes } from 'features/list-prayer-times';
import { chevronForwardOutline, locationOutline } from 'ionicons/icons';
import Countdown from 'react-countdown';

const PrayerTimes: React.FC = () => {
  const { data, isLoading, refetch, error } = usePrayerTimes();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Prayer Times</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY>
        <IonRefresher
          slot="fixed"
          onIonRefresh={async (e) => {
            await refetch();
            e.detail.complete();
          }}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonCard>
          <IonCardHeader className="pb-1">
            <IonCardTitle>Fajr</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonText color="dark">
              <small className="opacity-75 block">is the next prayer in</small>
              <Countdown date={Date.now() + 10000} className="text-lg" />
              <small className="opacity-75 inline-block mx-1">(5:31 AM)</small>
            </IonText>

            <div className="my-2 flex opacity-75 justify-between">
              <small className="flex items-center justify-start">
                <IonIcon
                  icon={locationOutline}
                  className="-translate-y-px pr-0.5"
                />{' '}
                Europe/London
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
                Muslim World League
              </small>
            </div>

            <hr className="opacity-20 mt-2" />

            <table className="w-full border-separate border-spacing-y-1 text-[13px] text-left table-auto mt-1.5">
              <thead className="gap-y-2">
                <tr>
                  <th>Hijri</th>
                  <th>Gregorian</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Al Sabt, 17 {'Rama\u1e0d\u0101n'.normalize()} 1444</td>
                  <td>Saturday, 08 April 2023</td>
                </tr>
              </tbody>
            </table>
          </IonCardContent>
        </IonCard>

        {isLoading && (
          <div className="w-full h-1/2 grid place-items-center">
            <IonSpinner />
          </div>
        )}

        {Boolean(error) && (
          <DisplayError
            error={error}
            toastOnly={Boolean(data?.data)}
            className="h-1/2"
          />
        )}

        {data?.data && <ListPrayerTimes timings={data.data.timings} />}
      </IonContent>
    </IonPage>
  );
};

export default PrayerTimes;
