import {
  IonItemDivider,
  IonItemGroup,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToggle,
} from '@ionic/react';
import { useAtom } from 'jotai/react';
import { useCallback, useMemo } from 'react';
import { availableSettings, settingsAtom, SettingsType } from 'stores/settings';
import { usePrayerTimeMethods } from '../api/usePrayerTimeMethods';

const PrayerNotificationSettings: React.FC = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  const { data } = usePrayerTimeMethods();

  const updatePrayerTimeSettings = useCallback(
    (newSettings: Partial<SettingsType['prayerTimes']>) => {
      setSettings((prev) => ({
        ...prev,
        prayerTimes: {
          ...prev.prayerTimes,
          ...newSettings,
        },
      }));
    },
    [setSettings]
  );

  const methods = useMemo(
    () => Object.values(data?.data ?? {}).filter(({ name }) => name),
    [data?.data]
  );

  return (
    <IonItemGroup className="pb-3">
      <h2 className="text-xl font-bold mb-2">Prayer Times</h2>
      <div className="flex justify-between items-center h-9">
        <IonText>
          <h2 className="text-base">Method</h2>
        </IonText>
        <IonSelect
          interface="alert"
          placeholder="Select timing method"
          aria-label="Select timing method"
          title="Select timing method"
          className="py-0 capitalize w-min max-w-[50vw]"
          value={settings?.prayerTimes?.methodId}
          defaultValue={4}
          onIonChange={(e) =>
            updatePrayerTimeSettings({
              methodId: e.detail.value,
            })
          }
          interfaceOptions={{
            subHeader: 'Select timing method',
            className:
              '[--width:92%] [&>.alert-wrapper_.alert-radio-label]:whitespace-normal [&>.alert-wrapper_.alert-radio-label]:text-clip',
          }}
          disabled={!data?.data}
        >
          {methods.map(({ name, id }, indx) => (
            <IonSelectOption value={id} key={id} className="capitalize">
              {name}
            </IonSelectOption>
          ))}
        </IonSelect>
      </div>
      <IonItemDivider className="min-h-[2px] my-2" />
    </IonItemGroup>
  );
};

export { PrayerNotificationSettings };
