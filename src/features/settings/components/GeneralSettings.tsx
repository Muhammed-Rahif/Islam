import {
  IonItemDivider,
  IonItemGroup,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToggle,
} from '@ionic/react';
import { useAtom } from 'jotai/react';
import { useCallback } from 'react';
import { settingsAtom, SettingsType } from 'stores/settings';

const GeneralSettings: React.FC = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  const updateGeneralSettings = useCallback(
    (newSettings: Partial<SettingsType['general']>) => {
      setSettings((prev) => ({
        ...prev,
        general: {
          ...prev.general,
          ...newSettings,
        },
      }));
    },
    [setSettings]
  );

  return (
    <IonItemGroup className="pb-3">
      <h2 className="text-xl font-bold mb-2">General</h2>
      <div className="flex justify-between items-center h-9">
        <IonText>
          <h2 className="text-base">Dark Mode</h2>
        </IonText>
        <IonToggle
          onIonChange={(e) =>
            updateGeneralSettings({
              theme: e.detail.checked ? 'dark' : 'light',
            })
          }
          className="py-0"
        ></IonToggle>
      </div>
      <IonItemDivider className="min-h-[2px] my-2" />
    </IonItemGroup>
  );
};

export { GeneralSettings };
