import { IonItemDivider, IonItemGroup, IonText, IonToggle } from '@ionic/react';
import { useAtom } from 'jotai/react';
import { FC, useCallback } from 'react';
import { settingsAtom, SettingsType } from 'stores/settings';

const GeneralSettings: FC = () => {
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
          <h2 className="text-base">Dark mode</h2>
        </IonText>
        <IonToggle
          aria-label="Dark mode"
          title="Select theme"
          checked={settings.general.theme === 'dark'}
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
