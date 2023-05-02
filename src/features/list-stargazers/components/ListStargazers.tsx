import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonSpinner,
  IonText,
} from '@ionic/react';
import React, { FC } from 'react';
// import { FixedSizeList as List } from 'react-window';
import { useStargazers } from '../api/useStargazers';
import DisplayError from 'components/DisplayError';

interface ListStargazersProps {}

const ListStargazers: FC<ListStargazersProps> = () => {
  const { data, isLoading, error, refetch } = useStargazers();

  return (
    <>
      <IonText>
        <h2 className="mb-2 text-xl font-bold">Our Stargazers</h2>
        <p className="mb-2">
          Developers Who Support Us: We would like to express our gratitude to
          the developers who have shown their support for the Islam Application
          by starring the project on GitHub:
        </p>
      </IonText>

      {isLoading && (
        <div className="flex h-24 items-center justify-center">
          <IonSpinner />
        </div>
      )}

      {!isLoading && error ? (
        <DisplayError
          className="h-1/5 leading-5 [direction:ltr]"
          error={error}
          onRetry={refetch}
        />
      ) : null}

      {data
        // filtering users only from contributors to avoid bots
        ?.filter(({ login, type }) => type === 'User' && !login.endsWith('bot'))
        ?.map(({ login, html_url, avatar_url }) => (
          <IonItem
            className="[--inner-padding-end:0px] [--padding-start:0px]"
            key={login}
            href={html_url}
            target="_blank"
          >
            <IonAvatar slot="start">
              <img alt={login} src={avatar_url} />
            </IonAvatar>

            <IonLabel>
              <h3>{login}</h3>
            </IonLabel>
          </IonItem>
        ))}

      <p className="my-3">
        If you are a developer and appreciate the app and our work, please
        consider starring the project on GitHub to show your support.{' '}
        <b>
          By starring the project, your name will be added to our &quot;Our
          Stargazers&quot; section, and you&apos;`ll help to spread the word
          about the app to the developer community.
        </b>
      </p>
    </>
  );
};

export { ListStargazers };
