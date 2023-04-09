import { IonIcon, IonText, IonToast, useIonToast } from '@ionic/react';
import { alertCircle, alertCircleOutline } from 'ionicons/icons';
import { ReactNode, useMemo } from 'react';

type Props = {
  error: Error | any;
  className?: string;
  toastOnly?: boolean;
};

function DisplayError({ error, className, toastOnly = false }: Props) {
  const [presentToast] = useIonToast();

  const message = useMemo(() => {
    if (!(error as any)?.message) return error ?? 'Unknown Error';

    let errMsg = 'Unknown Error';

    switch (error.message) {
      case 'User denied Geolocation':
        errMsg = 'Please enable location access for the app.';
        break;

      case 'Network Error':
        errMsg = 'The app required network to load data on first time.';
        break;

      default:
        errMsg = error.message;
        break;
    }

    presentToast({
      message: errMsg,
      duration: 4500,
      position: 'bottom',
      icon: alertCircle,
    });
    return errMsg;
  }, [error]);

  return (
    <>
      {!toastOnly && (
        <div
          className={`w-full h-3/4 flex items-center justify-center flex-col ${className}`}
        >
          <IonIcon icon={alertCircleOutline} className="scale-[1.75]" />
          <IonText>
            <p className="my-2 max-w-[50vw] min-w-[4rem] text-center">
              {message}
            </p>
          </IonText>
        </div>
      )}
    </>
  );
}

export default DisplayError;
