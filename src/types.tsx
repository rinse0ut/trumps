import { FlagNameValues } from 'semantic-ui-react';

export type UserType = {
  id: string;
  username: string;
  email: string;
};

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

export type GameFormType = {
  categoryId: string;
  player2Id: string;
}  

export type GameType = {
  pack: CategoryType;
  p1Id: string;
  p2Id: string;
  p1InitialCards: string[];
  p2InitialCards: string[];
  p1Cards: string[];
  p2Cards: string[];
  turnCount: number;
  p1TurnIndex: number;
  p2TurnIndex: number;
}