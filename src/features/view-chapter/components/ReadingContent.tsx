import { IonItem, IonSpinner, IonText, IonToast } from '@ionic/react';
import { alertCircle } from 'ionicons/icons';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { numToArabic } from 'utils/string';
import { useVersesUthmani } from '../api/useVersesUthmani';
import MotionCaret from 'components/MotionCaret';
import { useAtom } from 'jotai/react';
import { quranLastReadAtom } from 'stores/quranLastRead';
import { Virtuoso } from 'react-virtuoso';

const ReadingContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    isLoading,
    data: versesUthmaniData,
    error,
  } = useVersesUthmani({
    chapterId: parseInt(id),
  });
  const [lastRead, setLastRead] = useAtom(quranLastReadAtom);

  return (
    <div className="[direction:rtl] leading-9 text-justify mt-3 pb-12 h-full">
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

      <IonText lang="ar" className="ml-2 h-full">
        <div className="mb-2 text-justify h-full">
          <Virtuoso
            data={versesUthmaniData?.verses}
            className="h-full w-full"
            components={{
              Item: ({ children, item, context }) => (
                <div className="mb-2 text-justify">{children}</div>
              ),
            }}
            itemContent={(indx, verse) => {
              return (
                <Fragment key={indx}>
                  <MotionCaret
                    title="You last read this verse"
                    show={
                      lastRead?.reading?.chapterId.toString() === id &&
                      lastRead?.reading?.verseId === verse?.id
                    }
                  />
                  <span
                    onDoubleClick={(e) => {
                      setLastRead({
                        translation: lastRead?.translation,
                        reading: {
                          chapterId: parseInt(id),
                          verseId: verse?.id,
                        },
                      });
                    }}
                  >
                    {verse?.text_uthmani} {`  ﴿${numToArabic(++indx)}﴾  `}
                  </span>
                </Fragment>
              );
            }}
          />
        </div>
      </IonText>
    </div>
  );
};

export { ReadingContent };
