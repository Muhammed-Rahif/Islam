import { IonItem, IonSpinner, IonText, IonToast } from '@ionic/react';
import { alertCircle } from 'ionicons/icons';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { numToArabic, removeHtmlTags } from 'utils/string';
import { useChapterVerses } from '../api/useChapterVerses';

const TranslationContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    isLoading,
    data: chapterVerses,
    error,
  } = useChapterVerses({
    chapterId: parseInt(id),
    per_page: 286,
  });

  return (
    <div className="my-6">
      {/* when error appears */}
      {error ? (
        <IonToast
          isOpen={Boolean(error)}
          message={error ? (error as any).message : error}
          duration={4500}
          icon={alertCircle}
        />
      ) : null}

      {/* when api is loading */}
      {isLoading && (
        <IonItem
          lines="none"
          className="flex items-center w-full [--inner-padding-end:0px]"
        >
          <IonSpinner className="mx-auto" />
        </IonItem>
      )}

      {chapterVerses?.verses.map((verse, indx) => (
        <Fragment key={indx}>
          <div key={indx} className="[direction:rtl]">
            <IonText lang="ar" className="ml-2">
              <span className="mb-2 text-justify">
                {verse.words
                  .filter((word) => word.char_type_name === 'word')
                  .map((word) => word.text_uthmani)
                  .join(' ')}
                {`  ﴿${numToArabic(++indx)}﴾  `}
              </span>
            </IonText>
          </div>
          <IonText className="text-left">
            {removeHtmlTags(verse?.translations[0].text)}
            <small className="opacity-20 block mb-4">
              - {verse.translations[0].resource_name}
            </small>
          </IonText>
        </Fragment>
      ))}
    </div>
  );
};

export { TranslationContent };
