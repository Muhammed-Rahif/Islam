import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import DisplayError from 'components/DisplayError';
import NextPrayerCard from 'components/NextPrayerCard';
import {
  ListPrayerTimes,
  updatePrayerNotifications,
  usePrayerTimes,
} from 'features/list-prayer-times';
import { useAtomValue } from 'jotai/react';
import { FC, useEffect, useMemo } from 'react';
import { settingsAtom } from 'stores/settings';

const PrayerTimes: FC = () => {
  const {
    prayerTimes: { methodId, notifications },
  } = useAtomValue(settingsAtom);
  const { data, isLoading, refetch, error } = usePrayerTimes({
    method: methodId,
    notifications,
  });

  const prayerTimesData = useMemo(() => data?.data, [data?.data]);

  useEffect(() => {
    if (!prayerTimesData) return;

    if (Object.keys(prayerTimesData.timings ?? []).length > 0)
      updatePrayerNotifications(prayerTimesData.timings, notifications);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications, prayerTimesData?.timings]);

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
            timings={prayerTimesData!.timings}
            gregorianDate={`${prayerTimesData?.date.gregorian.day} ${prayerTimesData?.date.gregorian.month.en} ${prayerTimesData?.date.gregorian.year}`}
            hijriDate={`${
              prayerTimesData?.date.hijri.day
            } ${prayerTimesData?.date.hijri.month.en.normalize()} ${
              prayerTimesData?.date.hijri.year
            }`}
            hijriWeekDay={prayerTimesData?.date.hijri.weekday.en ?? ''}
            gregorianWeekDay={prayerTimesData?.date.gregorian.weekday.en ?? ''}
            timezone={prayerTimesData?.meta.timezone ?? ''}
            timingMethod={prayerTimesData?.meta.method.name ?? ''}
          />
        )}

        {isLoading && (
          <div className="grid h-full w-full place-items-center">
            <IonSpinner />
          </div>
        )}

        {Boolean(error) && (
          <DisplayError
            error={error}
            toastOnly={Boolean(data)}
            className={data ? 'h-1/2' : '!h-full'}
            onRetry={async () => await refetch()}
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
