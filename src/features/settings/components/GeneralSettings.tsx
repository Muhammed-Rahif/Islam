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
      <h2 className="mb-2 text-xl font-bold">General</h2>
      <div className="flex h-9 items-center justify-between">
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
      <IonItemDivider className="my-2 min-h-[2px]" />
    </IonItemGroup>
  );
};

export { GeneralSettings };
