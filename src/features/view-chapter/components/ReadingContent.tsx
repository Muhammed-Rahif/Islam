import { IonItem, IonSpinner, IonText, IonToast } from '@ionic/react';
import { alertCircle } from 'ionicons/icons';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { numToArabic } from 'utils/string';
import { useVersesUthmani } from '../api/useVersesUthmani';
import MotionCaret from 'components/MotionCaret';
import { useAtom, useAtomValue } from 'jotai/react';
import { quranLastReadAtom } from 'stores/quranLastRead';
import { settingsAtom, SettingsType } from 'stores/settings';

type Props = {
  bismiPre?: boolean;
  footer?: React.ReactNode;
};

function Bismi({
  quranSettings,
  ayahNo,
}: {
  quranSettings: SettingsType['quran'];
  ayahNo?: number;
}) {
  return (
    <div
      style={{
        fontSize: quranSettings.fontSize,
        height: parseInt(quranSettings.fontSize.replace('%', '')) * 0.36,
        fontFamily: quranSettings.fontFamily,
      }}
      lang="ar"
      className="block text-center mt-1"
    >
      بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ{' '}
      {ayahNo && `  ﴿${numToArabic(ayahNo)}﴾  `}
    </div>
  );
}

const ReadingContent: React.FC<Props> = ({ bismiPre, footer }) => {
  const { id } = useParams<{ id: string }>();
  const {
    isLoading,
    data: versesUthmaniData,
    error,
  } = useVersesUthmani({
    chapterId: parseInt(id),
  });
  const [lastRead, setLastRead] = useAtom(quranLastReadAtom);
  const { quran: quranSettings } = useAtomValue(settingsAtom);

  return (
    <div className="[direction:rtl] leading-9 pb-10 text-justify mt-0.5 mb-3 h-full overflow-y-scroll overflow-x-visible ion-content-scroll-host">
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

      <span lang="ar" className="mb-2 text-justify">
        {bismiPre && <Bismi quranSettings={quranSettings} />}

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

          if (verse.text_uthmani === 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ')
            return <Bismi quranSettings={quranSettings} ayahNo={++indx} />;

          return (
            <Fragment key={indx}>
              <MotionCaret title="You last read this verse" show={isLastRead} />
              <span
                style={{
                  fontSize: quranSettings.fontSize,
                  lineHeight: quranSettings.fontSize,
                  fontFamily: quranSettings.fontFamily,
                }}
                onDoubleClick={onVerseDblClick}
              >
                {verse?.text_uthmani} {`  ﴿${numToArabic(++indx)}﴾  `}
              </span>
            </Fragment>
          );
        })}
        <hr className="opacity-20 mt-3.5" />
      </span>

      <div className="-mt-5">{!isLoading && footer}</div>
    </div>
  );
};

export { ReadingContent };
