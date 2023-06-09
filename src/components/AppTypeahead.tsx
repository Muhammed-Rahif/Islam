import React, { useCallback, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonSearchbar,
  IonToolbar,
} from '@ionic/react';
import type { CheckboxCustomEvent } from '@ionic/react';
import { Virtuoso } from 'react-virtuoso';

type Item = {
  text: string;
  value: string;
};

interface TypeaheadProps {
  items: Item[];
  selectedItems: string[];
  title?: string;
  onSelectionCancel?: () => void;
  onSelectionChange?: (items: string[]) => void;
  required?: boolean;
}

function AppTypeahead(props: TypeaheadProps) {
  const [filteredItems, setFilteredItems] = useState<Item[]>([...props.items]);
  const [workingSelectedValues, setWorkingSelectedValues] = useState<string[]>([
    ...props.selectedItems,
  ]);

  const isChecked = useCallback(
    (value: string) => {
      return workingSelectedValues.find((item) => item === value) !== undefined;
    },
    [workingSelectedValues]
  );

  const cancelChanges = useCallback(() => {
    const { onSelectionCancel } = props;
    if (onSelectionCancel !== undefined) {
      onSelectionCancel();
    }
  }, [props]);

  const confirmChanges = useCallback(() => {
    const { onSelectionChange } = props;
    if (onSelectionChange !== undefined) {
      onSelectionChange(workingSelectedValues);
    }
  }, [props, workingSelectedValues]);

  /**
   * Update the rendered view with
   * the provided search query. If no
   * query is provided, all data
   * will be rendered.
   */
  const filterList = useCallback(
    (searchQuery: string | null | undefined) => {
      /**
       * If no search query is defined,
       * return all options.
       */
      if (searchQuery === undefined || searchQuery === null) {
        setFilteredItems([...props.items]);
      } else {
        /**
         * Otherwise, normalize the search
         * query and check to see which items
         * contain the search query as a substring.
         */
        const normalizedQuery = searchQuery.toLowerCase();
        setFilteredItems(
          props.items.filter((item) => {
            return item.text.toLowerCase().includes(normalizedQuery);
          })
        );
      }
    },
    [props.items]
  );

  const searchbarInput = useCallback(
    (ev: any) => {
      filterList(ev.target.value);
    },
    [filterList]
  );

  const checkboxChange = (ev: CheckboxCustomEvent) => {
    const { checked, value } = ev.detail;

    if (checked) {
      setWorkingSelectedValues([...workingSelectedValues, value]);
    } else {
      setWorkingSelectedValues(
        workingSelectedValues.filter((item) => item !== value)
      );
    }
  };

  return (
    <>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={cancelChanges}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>{props.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              disabled={props.required && workingSelectedValues.length === 0}
              onClick={confirmChanges}
            >
              Done
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar onIonInput={searchbarInput}></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <IonList id="modal-list" className="h-full" inset={true}>
          <Virtuoso
            className="h-full"
            data={filteredItems}
            itemContent={(index, { text, value }) => (
              <IonItem key={value}>
                <IonLabel className="capitalize !text-sm !whitespace-normal">
                  {text}
                </IonLabel>
                <IonCheckbox
                  className="w-min"
                  aria-label={text}
                  value={value}
                  checked={isChecked(value)}
                  onIonChange={checkboxChange}
                ></IonCheckbox>
              </IonItem>
            )}
          />
        </IonList>
      </IonContent>
    </>
  );
}
export default AppTypeahead;
