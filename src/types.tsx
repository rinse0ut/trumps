import { FlagNameValues } from 'semantic-ui-react';

export type StatType = {
  title: string;
}

export type CategoryType = {
  id: string;
  title: string;
  stats: StatType[];
}

export type CardType = {
  name: string;
  countryCode: FlagNameValues;
  img: any;
  values: (string | number)[];
}