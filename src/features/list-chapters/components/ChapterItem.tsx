import { IonItem, IonLabel, IonRippleEffect } from '@ionic/react';
import React from 'react';

type ChapterItemProps = {
  id: number;
  name: string;
  translatedName: string;
  versesCount: number;
  style?: React.CSSProperties;
};

const ChapterItem: React.FC<ChapterItemProps> = React.memo(
  ({ id, name, translatedName, versesCount, style }) => {
    return (
      <IonItem
        key={id}
        className="flex items-center w-full [--padding-start:0px] [--inner-padding-end:0px] -z-0"
        button
        routerLink={`/quran/${id}?type=reading`}
        style={style}
      >
        <h1 className="my-2 ml-1 mr-4">
          <b>{id}</b>
        </h1>
        <IonLabel>
          <h2>{name}</h2>
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
