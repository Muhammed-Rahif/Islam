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
import NextPrayerCard from 'components/NextPrayerCard';
import {
  ListPrayerTimes,
  getNextPrayer,
  usePrayerTimes,
} from 'features/list-prayer-times';
import { chevronForwardOutline, locationOutline } from 'ionicons/icons';
import { useMemo } from 'react';
import Countdown from 'react-countdown';

const PrayerTimes: React.FC = () => {
  const { data, isLoading, refetch, error } = usePrayerTimes();

  const nextPrayer = useMemo(
    () => (data?.data.timings ? getNextPrayer(data.data.timings) : null),
    [data?.data.timings]
  );

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

        {data?.data && (
          <NextPrayerCard
            isLoading={isLoading}
            nextPrayer={nextPrayer}
            gregorianDate={`${data?.data.date.gregorian.day} ${data?.data.date.gregorian.month.en} ${data?.data.date.gregorian.year}`}
            hijriDate={`${
              data?.data.date.hijri.day
            } ${data?.data.date.hijri.month.en.normalize()} ${
              data?.data.date.hijri.year
            }`}
            hijriWeekDay={data?.data.date.hijri.weekday.en ?? ''}
            gregorianWeekDay={data?.data.date.gregorian.weekday.en ?? ''}
            timezone={data?.data.meta.timezone ?? ''}
            methodName={data?.data.meta.method.name ?? ''}
          />
        )}

        {isLoading && (
          <div className="w-full h-full grid place-items-center">
            <IonSpinner />
          </div>
        )}

        {Boolean(error) && (
          <DisplayError
            error={error}
            toastOnly={Boolean(data?.data)}
            className={Boolean(data?.data) ? 'h-1/2' : '!h-full'}
          />
        )}

        {data?.data && <ListPrayerTimes timings={data.data.timings} />}
      </IonContent>
    </IonPage>
  );
};

export default PrayerTimes;
