import React from 'react';
import { Table, Image, Flag} from 'semantic-ui-react';
import { CardType, StatsType, StatParamType } from '../types';
import ant from '../img/ant.jpeg';
import ben from '../img/ben.jpeg';
import dan from '../img/dan.jpeg';
import dt from '../img/dt.jpeg';
import didun from '../img/didun.jpeg';
import grant from '../img/grant.jpeg';
import mike from '../img/mike.jpeg';
import morgan from '../img/morgan.jpeg';
import nick from '../img/nick.jpeg';
import pearce from '../img/pearce.jpeg';
import rob from '../img/rob.jpeg';
import scouse from '../img/scouse.jpeg';
import stevooo from '../img/stevooo.jpeg';
import sunny from '../img/sunny.jpeg';
import will from '../img/will.jpeg';
import vinnie from '../img/vinnie.jpeg';

export type ImagesType = {
  [id: string]: any;
}

const images: ImagesType = {
  ant, ben, dan, didun, dt, grant, mike, morgan, nick, pearce, rob, scouse, stevooo, sunny, will, vinnie
}

type PlayerType = null | 1 | 2;

type CardPropType = {
  card: CardType;
  stats: StatsType;
  selectedStatKey: string | null | undefined;
  disabled: boolean;
  player: PlayerType;
  result: undefined | null | 0 | 1 | 2;
  onSelectStat: (statKey: string) => void;
}

function Card(props: CardPropType) {
  const { card, stats, selectedStatKey, player, result, disabled } = props;
  return (
    <Table celled unstackable
      size="small"
      selectable={!disabled}
      style={{ width: '80%', marginLeft: 5 }
      }>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>{card.title.toUpperCase()}</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>
            {card.countryCode && <Flag name={card.countryCode} />}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell colSpan='2'>
            <Image src={card.imgUrl} fluid />
          </Table.Cell>
        </Table.Row>
        {
          Object.entries(stats)
          .sort((a, b) => b[0].localeCompare(a[0]))
          .reverse()
          .map(([statKey, stat]) => { // @TODO sort by key
            const { title } = stat;
            const value = card[statKey];
            return (
              <Row
                key={statKey}
                statKey={statKey}
                selectedKey={selectedStatKey}
                title={title}
                value={value}
                result={result}
                player={player}
                onSelectStat={() => props.onSelectStat(statKey)}
              />
            )
          })
        }
      </Table.Body>
    </Table>
  );
}

type StatusType = 'positive' | 'negative' | 'warning';

type RowPropType = {
  title: string;
  value: string | number;
  statKey: string;
  selectedKey: string | null | undefined;
  player: PlayerType;
  result: undefined | null | 0 | 1 | 2;
  onSelectStat: (statKey: string) => void;
}

function Row(props: RowPropType) {
  const {title, value, statKey, selectedKey, onSelectStat, result, player} = props;
  let status: StatusType | undefined;
  if (statKey === selectedKey && result === 0) {
    status = 'warning';
  } else if (statKey === selectedKey && result === player) {
    status = 'positive';
  } else if (statKey === selectedKey && result !== player) {
    status = 'negative';
  }
  return (
    <Table.Row key={statKey} onClick={onSelectStat}>
      <Cell status={status}>
        {title}
      </Cell>
      <Cell status={status}>
        {value}
      </Cell>
    </Table.Row>
  )
}

type CellPropType = {
  status?: StatusType;
  children: any;
}

function Cell(props: CellPropType) {
  const { status, children } = props;
  return (
    <Table.Cell
      positive={status === 'positive'}
      negative={status === 'negative'}
      warning={status === 'warning'}
    >
      {children}
    </Table.Cell>
  );
}

export default Card;