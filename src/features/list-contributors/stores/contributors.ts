import { cardOutline } from 'ionicons/icons';

/*
 * This file is used to add contributor button link
 * in the contributors section (located in about screen). The key is the github
 * username of the contributor and the value is an object
 * with the following properties:
 * - text: The text to be displayed on the button
 * - link: The link to be opened when the button is clicked
 * - icon: The icon to be displayed on the button
 */

export const contributorsProfileLinks: {
  [key: string]: {
    text: string;
    link: string;
    icon: string;
  };
} = {
  'Muhammed-Rahif': {
    icon: cardOutline,
    text: 'Sponsor',
    link: 'https://github.com/sponsors/Muhammed-Rahif',
  },
};
