import {
  IonButton,
  IonItemDivider,
  IonItemGroup,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/react';
import AppTypeahead from 'components/AppTypeahead';
import { useRef } from 'react';
import { useTranslations } from '../api/useTranslations';

const QuranSettings: React.FC = () => {
  const { data } = useTranslations();

  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonItemGroup className="pb-3">
      <h2 className="text-xl font-bold mb-2">Quran</h2>
      <div className="flex justify-between items-center h-9">
        <IonText>
          <h2 className="text-base">Font family</h2>
        </IonText>
        <IonSelect
          interface="popover"
          placeholder="Me Quran"
          className="py-0"
          value="Me Quran"
        >
          <IonSelectOption value="Me Quran">Me Quran</IonSelectOption>
          <IonSelectOption value="Latheef">Latheef</IonSelectOption>
          <IonSelectOption value="Amiri">Amiri</IonSelectOption>
        </IonSelect>
      </div>
      <div className="flex justify-between items-center h-9">
        <IonText>
          <h2 className="text-base">Font size</h2>
        </IonText>
        <IonSelect
          interface="popover"
          placeholder="12px"
          className="py-0"
          value="12px"
        >
          <IonSelectOption value="12px">12px</IonSelectOption>
        </IonSelect>
      </div>
      <div className="flex justify-between items-center h-9">
        <IonText>
          <h2 className="text-base">Translations</h2>
        </IonText>
        <IonButton size="small" id="select-translations">
          Select Translations
        </IonButton>

        <IonModal trigger="select-translations" ref={modal}>
          <AppTypeahead
            title="Select Translations"
            items={
              (data?.translations.map((translation) => ({
                text: `${translation.language_name}, ${translation.name}`,
                value: translation.id.toString(),
              })) ?? []) as any
            }
            selectedItems={['131']}
            onSelectionCancel={() => modal.current?.dismiss()}
            // onSelectionChange={fruitSelectionChanged}
          />
        </IonModal>
      </div>
      <IonItemDivider className="min-h-[2px] my-2" />
    </IonItemGroup>
  );
};

export { QuranSettings };
