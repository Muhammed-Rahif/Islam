import {
  IonItemDivider,
  IonItemGroup,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/react';
import { useAtom } from 'jotai/react';
import { useCallback, useEffect } from 'react';
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

  useEffect(() => {
    settings.general.theme === 'dark'
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark');
  }, [settings.general.theme]);

  return (
    <IonItemGroup className="pb-3">
      <h2 className="text-xl font-bold mb-2">General</h2>
      <div className="flex justify-between items-center h-9">
        <IonText>
          <h2 className="text-base">Theme</h2>
        </IonText>
        <IonSelect
          interface="popover"
          placeholder="Select theme"
          className="py-0"
          value={settings.general.theme}
          onIonChange={(e) =>
            updateGeneralSettings({
              theme: e.detail.value,
            })
          }
        >
          <IonSelectOption value="dark">Dark</IonSelectOption>
          <IonSelectOption value="light">Light</IonSelectOption>
        </IonSelect>
      </div>
      <IonItemDivider className="min-h-[2px] my-2" />
    </IonItemGroup>
  );
};

export { GeneralSettings };
