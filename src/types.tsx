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
  [id: string]: string;
}

export type StatParamType = {
  statKey: string;
  title: string;
  value: string;
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

export type TurnType = {
  [id: string]: any; 
  player: 1|2;
  result: 0|1|2;
  statKey: string;
  p1Cards: string[];
  p2Cards: string[];  
  drawCards: string[];  
}

export type TurnsType = {
  [id: string]: TurnType; 
}

export type GameType = {
  [id: string]: any;
  pack: CategoryType;
  p1Id: string;
  p2Id: string;
  p1InitialCards: string[];
  p2InitialCards: string[];
  turns: TurnsType;
  turnCount: number;
  p1TurnIndex: number;
  p2TurnIndex: number;
}