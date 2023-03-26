import {
  IonContent,
  IonHeader,
  IonItemDivider,
  IonItemGroup,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { THEME_KEY } from 'config/store';
import { QuranSettings } from 'features/settings';
import { useLocalStorage } from 'hooks/useLocalStore';
import { useEffect } from 'react';

const Settings: React.FC = () => {
  const [theme, setTheme] = useLocalStorage(THEME_KEY, 'light');

  useEffect(() => {
    theme === 'dark'
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark');
  }, [theme]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false} className="ion-padding">
        <IonList>
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
                value={theme}
                onIonChange={(e) => setTheme(e.detail.value)}
              >
                <IonSelectOption value="dark">Dark</IonSelectOption>
                <IonSelectOption value="light">Light</IonSelectOption>
              </IonSelect>
            </div>
            <IonItemDivider className="min-h-[2px] my-2" />
          </IonItemGroup>

          <QuranSettings />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
