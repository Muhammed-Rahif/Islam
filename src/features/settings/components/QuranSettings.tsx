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
import { useAtom } from 'jotai/react';
import { useCallback, useMemo, useRef } from 'react';
import { availableSettings, settingsAtom, SettingsType } from 'stores/settings';
import { truncate } from 'utils/string';
import { useTranslations } from '../api/useTranslations';
import { Translations } from '../types/Translations';

const QuranSettings: React.FC = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  const { data: translationsData, isLoading: isTranslationsLoading } =
    useTranslations();

  const translationItems = useMemo(
    () =>
      // returning data as [{ text: string; value: string; },...]
      translationsData?.translations.map((translation) => ({
        text: `${translation.language_name}, ${translation.name}`,
        value: translation.id.toString(),
      })) ?? [],
    [translationsData]
  );

  const updateQuranSettings = useCallback(
    (newSettings: Partial<SettingsType['quran']>) => {
      setSettings((prev) => ({
        ...prev!,
        quran: {
          ...prev!.quran,
          ...newSettings,
        },
      }));
    },
    [setSettings]
  );

  // the extra fullpage modal that is used to select translations
  const translationsModal = useRef<HTMLIonModalElement>(null);
  const onTranslationsChange = useCallback(
    (items: string[]) => {
      translationsModal.current?.dismiss();

      const translations: Translations = items.map((item) => {
        const translation = translationsData?.translations.find(
          (translation) => translation.id.toString() === item
        );

        return translation!;
      });

      updateQuranSettings({
        translations: translations,
      });
    },
    [translationsData?.translations, updateQuranSettings]
  );

  // btn text is like: english, arabic, chi...
  const translationsBtnText = useMemo(() => {
    // selected languages only, divided by comma. eg: english, arabic, chinease
    const translationsLanguages = [
      ...new Set(
        settings?.quran.translations.map(
          (translation) => translation.language_name
        )
      ),
    ];
    return truncate(translationsLanguages.join(', '), 24);
  }, [settings?.quran.translations]);

  const selectedTranslationValues = useMemo(
    () =>
      settings?.quran.translations.map((translation) =>
        translation.id.toString()
      ) ?? [],
    [settings?.quran.translations]
  );

  return (
    <IonItemGroup className="pb-3">
      {/* Title */}
      <h2 className="text-xl font-bold mb-2">Quran</h2>

      {/* Select font size */}
      <div className="flex justify-between items-center h-9">
        <IonText>
          <h2 className="text-base">Font size</h2>
        </IonText>
        <IonSelect
          interface="popover"
          placeholder="Select font size"
          aria-label="Select font size"
          title="Select font size"
          className="py-0 w-min"
          value={settings?.quran.fontSize}
          onIonChange={(e) => {
            updateQuranSettings({
              fontSize: e.detail.value as any,
            });
          }}
        >
          {availableSettings.quran.fontSize.map((size) => (
            <IonSelectOption value={size} key={size}>
              {size}
            </IonSelectOption>
          ))}
        </IonSelect>
      </div>

      {/* Select font family */}
      <div className="flex justify-between items-center h-9">
        <IonText>
          <h2 className="text-base">Font family</h2>
        </IonText>
        <IonSelect
          interface="alert"
          placeholder="Select font family"
          aria-label="Select font family"
          title="Select font family"
          className="py-0 capitalize w-min"
          value={settings?.quran.fontFamily}
          onIonChange={(e) => {
            updateQuranSettings({
              fontFamily: e.detail.value,
            });
          }}
          interfaceOptions={{
            subHeader: 'Select font family',
          }}
        >
          {availableSettings.quran.fontFamily.map((family) => (
            <IonSelectOption value={family} key={family} className="capitalize">
              {family}
            </IonSelectOption>
          ))}
        </IonSelect>
      </div>

      {/* Select Translations */}
      <div className="flex justify-between items-center h-9">
        <IonText>
          <h2 className="text-base">Translations</h2>
        </IonText>
        <IonButton
          size="small"
          id="select-translations"
          disabled={isTranslationsLoading}
          className="capitalize"
          title="Select translations"
        >
          {translationsBtnText}
        </IonButton>

        <IonModal trigger="select-translations" ref={translationsModal}>
          <AppTypeahead
            title="Select Translations"
            items={translationItems}
            selectedItems={selectedTranslationValues}
            required
            onSelectionCancel={() => translationsModal.current?.dismiss()}
            onSelectionChange={onTranslationsChange}
          />
        </IonModal>
      </div>
      <IonItemDivider className="min-h-[2px] my-2" />
    </IonItemGroup>
  );
};

export { QuranSettings };
