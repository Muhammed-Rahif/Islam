/* eslint-disable react/display-name */
import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { playOutline } from 'ionicons/icons';
import { useAtomValue } from 'jotai/react';
import React, { FC } from 'react';
import { quranLastReadAtom } from 'stores/quranLastRead';

type ChapterItemProps = {
  id: number;
  name: string;
  translatedName: string;
  versesCount: number;
  style?: React.CSSProperties;
};

const ChapterItem: FC<ChapterItemProps> = React.memo(
  ({ id, name, translatedName, versesCount, style }: ChapterItemProps) => {
    const lastReadQuran = useAtomValue(quranLastReadAtom);

    return (
      <IonItem
        key={id}
        className="-z-0 flex w-full items-center [--inner-padding-end:0px] [--padding-start:0px]"
        button
        routerLink={`/quran/${id}?mode=reading`}
        style={style}
      >
        <h1 className="my-2 ml-1 mr-4">
          <b>{id}</b>
        </h1>
        <IonLabel>
          <h2>
            {name}{' '}
            {lastReadQuran?.reading?.chapterId === id && (
              <IonIcon
                className="rotate-180"
                slot="icon-only"
                color="primary"
                icon={playOutline}
              />
            )}
          </h2>
          <p>{translatedName}</p>
        </IonLabel>
        <IonLabel slot="end" className="m-0">
          <p>{versesCount} Ayahs</p>
        </IonLabel>
      </IonItem>
    );
  }
);

export { ChapterItem };
