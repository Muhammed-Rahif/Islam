import { IonItem, IonLabel, IonRippleEffect } from '@ionic/react';

type ChapterItemProps = {
  id: number;
  index: number;
  name: string;
  translatedName: string;
  versesCount: number;
};

const ChapterItem: React.FC<ChapterItemProps> = ({
  id,
  index,
  name,
  translatedName,
  versesCount,
}) => {
  return (
    <IonItem
      key={id}
      className="flex items-center w-full [--inner-padding-end:0px]"
      button
      routerLink={`/quran/${id}`}
    >
      <IonRippleEffect type="unbounded" />
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
};

export { ChapterItem };
