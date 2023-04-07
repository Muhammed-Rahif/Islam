import { IonIcon, IonText, IonToast } from '@ionic/react';
import { alertCircle, alertCircleOutline } from 'ionicons/icons';
import React from 'react';

type Props = {
  error: Error | any;
};

function DisplayError({ error }: Props) {
  return (
    <>
      <IonToast
        isOpen={Boolean(error)}
        message={error ? (error as any).message : error}
        duration={4500}
        icon={alertCircle}
      />
      <div className="w-full h-full flex items-center justify-center flex-col">
        <IonIcon icon={alertCircleOutline} className="scale-[1.75]" />
        <IonText>
          <p className="my-2">{error ? (error as any).message : error}</p>
        </IonText>
      </div>
    </>
  );
}

export default DisplayError;
