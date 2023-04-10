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
import { useMemo } from 'react';

const PrayerTimes: React.FC = () => {
  const { data, isLoading, refetch, error } = usePrayerTimes();

  const prayerTimesData = useMemo(() => data?.data, [data]);

  const nextPrayer = useMemo(
    () =>
      prayerTimesData?.timings ? getNextPrayer(prayerTimesData.timings) : null,
    [data?.data.timings]
  );

  return (
    <IonPage>
      <IonHeader translucent>
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
            gregorianDate={`${prayerTimesData?.date.gregorian.day} ${prayerTimesData?.date.gregorian.month.en} ${prayerTimesData?.date.gregorian.year}`}
            hijriDate={`${
              prayerTimesData?.date.hijri.day
            } ${prayerTimesData?.date.hijri.month.en.normalize()} ${
              prayerTimesData?.date.hijri.year
            }`}
            hijriWeekDay={prayerTimesData?.date.hijri.weekday.en ?? ''}
            gregorianWeekDay={prayerTimesData?.date.gregorian.weekday.en ?? ''}
            timezone={prayerTimesData?.meta.timezone ?? ''}
            methodName={prayerTimesData?.meta.method.name ?? ''}
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
            toastOnly={Boolean(data)}
            className={Boolean(data) ? 'h-1/2' : '!h-full'}
          />
        )}

        {prayerTimesData && (
          <ListPrayerTimes timings={prayerTimesData.timings} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default PrayerTimes;