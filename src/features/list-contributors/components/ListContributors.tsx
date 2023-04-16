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
        <p className="mb-2">
          We would like to extend our heartfelt thanks to the following
          individuals for their valuable contributions to the Islam Application:
        </p>
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
        // filtering users only from contributors to avoid bots
        ?.filter(({ login, type }) => type == 'User' && !login.endsWith('bot'))
        ?.map(({ login, contributions, html_url, avatar_url }) => (
          <IonItem
            className="[--padding-start:0px] [--inner-padding-end:0px]"
            key={login}
            href={html_url}
            target="_blank"
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

      <p className="my-3">
        Each of our contributors has played an important role in making the
        Islam Application what it is today. We are deeply grateful for their
        time, effort, and expertise, and we hope that their contributions will
        be a source of ongoing reward and benefit for them.
      </p>
    </>
  );
};

export { ListContributors };
