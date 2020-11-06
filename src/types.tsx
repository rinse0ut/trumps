import { FlagNameValues } from 'semantic-ui-react';

export type StatType = {title: string};

export type StatsType = {
  [id: string]: StatType;
}

export type StatValueType = {
  [id: string]: number | string;
}

export type CardType = {
  title: string;
  countryCode: FlagNameValues | '';
  // img: any;
  // statValues: number;
} & StatValueType;

export type CardsType = {
  [id: string]: CardType;
}

export type CategoryType = {
  id: string;
  title: string;
  stats: StatsType;
  cards: CardsType;
}