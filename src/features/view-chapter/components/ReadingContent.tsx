import { IonItem, IonSpinner, IonText, IonToast } from '@ionic/react';
import { alertCircle } from 'ionicons/icons';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { numToArabic } from 'utils/string';
import { useVersesUthmani } from '../api/useVersesUthmani';

const ReadingContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    isLoading,
    data: versesUthmaniData,
    error,
  } = useVersesUthmani({
    chapterId: parseInt(id),
  });

  return (
    <div className="[direction:rtl] leading-9 text-justify my-3">
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

      <IonText lang="ar" className="ml-2">
        <span className="mb-2 text-justify">
          {versesUthmaniData?.verses.map((verse, indx) => (
            <Fragment key={indx}>
              {verse?.text_uthmani} {`  ﴿${numToArabic(++indx)}﴾  `}
            </Fragment>
          ))}
        </span>
      </IonText>
    </div>
  );
};

export { ReadingContent };
