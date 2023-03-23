import { IonItem, IonSpinner, IonText, IonToast } from '@ionic/react';
import { alertCircle } from 'ionicons/icons';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { numToArabic } from 'utils/string';
import { useVersesUthmani } from '../api/useVersesUthmani';
import MotionCaret from 'components/MotionCaret';
import { useAtom } from 'jotai/react';
import { quranLastReadAtom } from 'stores/quranLastRead';

type Props = {
  bismiPre?: boolean;
};

const ReadingContent: React.FC<Props> = ({ bismiPre }) => {
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
    <div className="[direction:rtl] leading-9 text-justify my-3 h-full overflow-y-scroll overflow-x-hidden ion-content-scroll-host">
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

      {bismiPre && (
        <IonText lang="ar" className="block text-center h-10">
          <span>بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</span>
        </IonText>
      )}

      <IonText lang="ar" className="ml-2">
        <span className="mb-2 text-justify">
          {versesUthmaniData?.verses.map((verse, indx) => {
            const isLastRead =
              lastRead?.reading?.chapterId.toString() === id &&
              lastRead?.reading?.verseId === verse?.id;

            const onVerseDblClick = () => {
              setLastRead({
                translation: lastRead?.translation,
                reading: {
                  chapterId: parseInt(id),
                  verseId: verse?.id,
                },
              });
            };

            if (
              verse.text_uthmani === 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ'
            )
              return (
                <IonText
                  lang="ar"
                  className="block text-center h-10"
                  key={indx}
                >
                  <span>
                    {verse?.text_uthmani} {`  ﴿${numToArabic(++indx)}﴾  `}
                  </span>
                </IonText>
              );

            return (
              <Fragment key={indx}>
                <MotionCaret
                  title="You last read this verse"
                  show={isLastRead}
                />
                <span onDoubleClick={onVerseDblClick}>
                  {verse?.text_uthmani} {`  ﴿${numToArabic(++indx)}﴾  `}
                </span>
              </Fragment>
            );
          })}
        </span>
      </IonText>
    </div>
  );
};

export { ReadingContent };
