import { IonItem, IonLabel, IonList, IonRippleEffect } from '@ionic/react';
import { Timings } from '../types/PrayerTimesResponse';
import dayjs from 'dayjs';
import { FC } from 'react';

type Props = {
  timings: Timings;
};

const ListPrayerTimes: FC<Props> = ({ timings }) => {
  return (
    <IonList className="my-1 min-h-[12rem]">
      {Object.keys(timings).map((prayerName, indx) => {
        const prayerTime = dayjs(timings[prayerName as keyof Timings], 'HH:mm');

        return (
          <IonItem
            key={indx}
            className="flex items-center [--inner-padding-end:0px]"
          >
            <IonRippleEffect type="unbounded" />
            <IonLabel className="font-semibold">{prayerName}</IonLabel>
            <IonLabel
              className="!flex flex-col items-end font-semibold"
              slot="end"
            >
              {prayerTime.format('h:mm A')}
            </IonLabel>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export { ListPrayerTimes };
