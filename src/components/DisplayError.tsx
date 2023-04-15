import {
  IonButton,
  IonIcon,
  IonText,
  IonToast,
  useIonToast,
} from '@ionic/react';
import { alertCircle, alertCircleOutline } from 'ionicons/icons';
import { ReactNode, useMemo } from 'react';

type Props = {
  error: Error | any;
  className?: string;
  toastOnly?: boolean;
  onRetry?: () => void;
};

function DisplayError({ error, className, toastOnly = false, onRetry }: Props) {
  const [presentToast] = useIonToast();

  const message = useMemo(() => {
    if (!(error as any)?.message) return error ?? 'Unknown Error';

    let errMsg = 'Unknown Error';

    switch (error.message) {
      case 'User denied Geolocation':
        errMsg = 'Please enable location access for the app';
        break;

      case 'Network Error':
        errMsg =
          'The app required network to load data on first time for each requests';
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
      buttons: [
        {
          handler: onRetry,
          text: 'Retry',
          role: 'cancel',
        },
      ],
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
            <p className="my-3 max-w-[66vw] min-w-[4rem] text-center">
              {message}.
            </p>
          </IonText>
          {onRetry && (
            <IonButton size="small" onClick={onRetry}>
              Retry
            </IonButton>
          )}
        </div>
      )}
    </>
  );
}

export default DisplayError;
