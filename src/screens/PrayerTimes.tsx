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
  IonRippleEffect,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { chevronForwardOutline, locationOutline } from 'ionicons/icons';
import Countdown from 'react-countdown';

const PrayerTimes: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Prayer Times</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false}>
        <IonCard className="mb-2.5">
          <IonCardHeader className="pb-1">
            <IonCardTitle>Fajr</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonText color="dark">
              <small className="opacity-75">is the next prayer in</small>
              <Countdown date={Date.now() + 10000} className="block text-lg" />
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

        <IonList className="my-1">
          <IonItem className="flex items-center [--inner-padding-end:0px]">
            <IonRippleEffect type="unbounded" />
            <IonLabel className="font-semibold">Fajr</IonLabel>
            <IonLabel className="font-semibold" slot="end">
              12:04 PM
            </IonLabel>
          </IonItem>

          <IonItem className="flex items-center [--inner-padding-end:0px]">
            <IonRippleEffect type="unbounded" />
            <IonLabel className="font-semibold">Sunrise</IonLabel>
            <IonLabel className="font-semibold" slot="end">
              12:04 PM
            </IonLabel>
          </IonItem>

          <IonItem className="flex items-center [--inner-padding-end:0px]">
            <IonRippleEffect type="unbounded" />
            <IonLabel className="font-semibold">Dhuhr</IonLabel>
            <IonLabel className="font-semibold" slot="end">
              12:04 PM
            </IonLabel>
          </IonItem>

          <IonItem className="flex items-center [--inner-padding-end:0px]">
            <IonRippleEffect type="unbounded" />
            <IonLabel className="font-semibold">Asr</IonLabel>
            <IonLabel className="font-semibold" slot="end">
              12:04 PM
            </IonLabel>
          </IonItem>

          <IonItem className="flex items-center [--inner-padding-end:0px]">
            <IonRippleEffect type="unbounded" />
            <IonLabel className="font-semibold">Maghrib</IonLabel>
            <IonLabel className="font-semibold" slot="end">
              12:04 PM
            </IonLabel>
          </IonItem>

          <IonItem className="flex items-center [--inner-padding-end:0px]">
            <IonRippleEffect type="unbounded" />
            <IonLabel className="font-semibold">Ishah</IonLabel>
            <IonLabel className="font-semibold" slot="end">
              12:04 PM
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default PrayerTimes;
