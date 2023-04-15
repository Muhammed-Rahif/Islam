import {
  IonAvatar,
  IonButton,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonSpinner,
  IonText,
  useIonViewDidEnter,
} from '@ionic/react';
import React, { useMemo, useRef, useState } from 'react';
// import { FixedSizeList as List } from 'react-window';
import { useContributors } from '../api/useContributors';
import { cardOutline, personOutline } from 'ionicons/icons';
import DisplayError from 'components/DisplayError';
import { contributorsProfileLinks } from '../stores/contributors';

interface ListContributorsProps {}

const ListContributors: React.FC<ListContributorsProps> = ({}) => {
  const { data, isLoading, error, refetch } = useContributors();

  return (
    <>
      <IonText>
        <h2 className="text-xl mb-2 font-bold">Our Contributors</h2>
      </IonText>

      {isLoading && (
        <div className="h-24 flex items-center justify-center">
          <IonSpinner />
        </div>
      )}

      {!isLoading && error ? (
        <DisplayError
          className="[direction:ltr] leading-5 h-1/5"
          error={error}
          onRetry={refetch}
        />
      ) : null}

      {data
        ?.filter(({ login, type }) => type == 'User' && !login.endsWith('bot'))
        ?.map(({ login, contributions, avatar_url }) => (
          <IonItem
            className="[--padding-start:0px] [--inner-padding-end:0px]"
            key={login}
          >
            <IonAvatar slot="start">
              <img alt={login} src={avatar_url} />
            </IonAvatar>

            <IonLabel>
              <h3>{login}</h3>
              <p>{contributions} contributions</p>
            </IonLabel>

            <IonButton
              target="_blank"
              href={
                contributorsProfileLinks[login]?.link ??
                `https://github.com/${login}`
              }
              slot="end"
            >
              <IonIcon
                icon={contributorsProfileLinks[login]?.icon ?? personOutline}
                slot="end"
              />
              {contributorsProfileLinks[login]?.text ?? 'Follow'}
            </IonButton>
          </IonItem>
        ))}
    </>
  );
};

export { ListContributors };
