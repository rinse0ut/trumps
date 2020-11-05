import { FlagNameValues } from 'semantic-ui-react';

export type StatType = {title: string};

export type StatsType = {
  [id: string]: StatType;
}

export type CategoryType = {
  id: string;
  title: string;
  stats: StatsType;
}

export type CardType = {
  name: string;
  countryCode: FlagNameValues;
  img: any;
  values: (string | number)[];
}