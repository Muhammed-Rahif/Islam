import { IonItem, IonLabel, IonList, IonRippleEffect } from '@ionic/react';
import { Timings } from '../types/PrayerTimesResponse';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

type Props = {
  timings: Timings;
};

const ListPrayerTimes: React.FC<Props> = ({ timings }) => {
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
              className="font-semibold !flex flex-col items-end"
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
