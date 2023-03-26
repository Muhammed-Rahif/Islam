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
import GeneralSettings from '../features/settings/components/GeneralSettings';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false} className="ion-padding">
        <IonList>
          <GeneralSettings />
          <QuranSettings />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
