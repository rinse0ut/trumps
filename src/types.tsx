import { FlagNameValues } from 'semantic-ui-react';

export type CategoryType = {
  category: string;
  title: string;
  ranking?: string[];
}

export type CardType = {
  name: string;
  countryCode: FlagNameValues;
  img: any;
  values: (string | number)[];
}