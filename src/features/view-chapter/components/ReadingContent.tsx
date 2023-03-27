import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonSpinner,
  IonToast,
  useIonToast,
} from '@ionic/react';
import { alertCircle } from 'ionicons/icons';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { numToArabic } from 'utils/string';
import { useVersesUthmani } from '../api/useVersesUthmani';
import { useAtom, useAtomValue } from 'jotai/react';
import { quranLastReadAtom } from 'stores/quranLastRead';
import { settingsAtom, SettingsType } from 'stores/settings';

type Props = {
  pages: {
    start: number;
    end: number;
  };
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

const ReadingContent: React.FC<Props> = ({ bismiPre, footer, pages }) => {
  const { id } = useParams<{ id: string }>();
  const {
    isLoading,
    data: versesUthmaniData,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useVersesUthmani({
    chapterId: parseInt(id),
    pages,
  });
  const [lastRead, setLastRead] = useAtom(quranLastReadAtom);
  const { quran: quranSettings } = useAtomValue(settingsAtom);

  const [presentToast] = useIonToast();

  return (
    <div className="[direction:rtl] leading-9 pb-10 text-justify mt-2 mb-3 h-full overflow-y-scroll overflow-x-visible ion-content-scroll-host">
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

      {!isLoading && bismiPre && <Bismi quranSettings={quranSettings} />}

      {versesUthmaniData?.pages.map((versesUthmani, index) => (
        <span key={index}>
          {versesUthmani.verses.map((verse, indx) => {
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
                <Bismi
                  quranSettings={quranSettings}
                  ayahNo={++indx}
                  key={indx}
                />
              );

            return (
              <Fragment key={indx}>
                <span
                  style={{
                    fontSize: quranSettings.fontSize,
                    lineHeight: quranSettings.fontSize,
                    fontFamily: quranSettings.fontFamily,
                  }}
                  onDoubleClick={onVerseDblClick}
                >
                  {verse?.text_uthmani}{' '}
                  {`  ﴿${numToArabic(verse.verse_key.replace(/\d+:/, ''))}﴾  `}
                </span>
              </Fragment>
            );
          })}
          <hr className="opacity-20 my-3.5" />
        </span>
      ))}
      {hasNextPage && !isFetchingNextPage && !isLoading && (
        <p className="opacity-20 text-center text-xs [font-family:var(--ion-font-family)]">
          Scroll down to load more
        </p>
      )}

      <IonInfiniteScroll
        className="[direction:ltr]"
        style={{
          height: hasNextPage ? window.innerHeight * 0.4 : 0,
        }}
        disabled={!hasNextPage}
        onIonInfinite={async (ev) => {
          await fetchNextPage()
            .then(() => ev.target.complete())
            .catch((err) => {
              console.error(err);

              presentToast({
                message: err.message,
                duration: 4500,
                position: 'bottom',
                icon: alertCircle,
              });
            });
        }}
      >
        <IonInfiniteScrollContent loadingText="Please, be patient..."></IonInfiniteScrollContent>
      </IonInfiniteScroll>

      {!hasNextPage && !isFetchingNextPage && !isLoading && footer}
    </div>
  );
};

export { ReadingContent };
