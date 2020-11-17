import React from 'react';
import { Table, Image, Flag, Icon, SemanticICONS } from 'semantic-ui-react';
import { CardType, StatsType, StatParamType } from '../types';

type PlayerType = 1 | 2;

type CardPropType = {
  card: CardType;
  stats: StatsType;
  selectedStatKey: string | null;
  // player: PlayerType;
  // result: number | null;
  onSelectStat: (params: StatParamType) => void;
}

function Card(props: CardPropType) {
  console.log('CARD PROPS', props);
  const {card, stats} = props;
  // if (!props.name) {
    // return null
  // }
  // const { name, countryCode, img, values, player, categories, categoryIndex, result, onSelectCatgory } = props;
  // return <div>CARD</div>;
  return (
    <Table celled selectable unstackable size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan='2'>{card.title.toUpperCase()}</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>
            { card.countryCode && <Flag name={card.countryCode} /> }
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell colSpan='3'>
            <Image src={card.img} fluid />
          </Table.Cell>
        </Table.Row>
        {
          Object.entries(stats).map(([statKey, stat]) => {
            console.log(stat, statKey)
            const {title} = stat;
            const value = card[statKey];
            // return <div>{stat.title}: {card[statKey]}</div>
            return (
              <Row 
                key={statKey} 
                // rowIndex={statKey}
                // categoryIndex={categoryIndex} // @todo change to selectedCategoryIndex
                img={card.img}
                title={title}
                value={value}
                // result={result}
                // player={player}
                onSelectStat={() => props.onSelectStat({statKey, title, value})}
              />
            )  
          })
        }
        {/* {stats.map((stats, key) => {
          const { title } = category;
          const stat = values[i];
          return (
              <Row 
                key={title} 
                rowIndex={i}
                categoryIndex={categoryIndex} // @todo change to selectedCategoryIndex
                img={img}
                title={title}
                value={stat}
                result={result}
                player={player}
                onSelectCatgory={() => onSelectCatgory(i)}
              />
          )  
        })} */}
      </Table.Body>
    </Table>
  );
}

type StatusType = 'positive' | 'negative' | 'warning'; 

type RowPropType = {
  rowIndex: number;
  title: string;
  value: string|number;  
  categoryIndex: number | null;
  player: PlayerType;
  result: number | null;
  img: any;
  onSelectStat: (statKey: number) => void;
}

function Row(props: any) {
  // const {title, value, rowIndex, img, categoryIndex, result, player, onSelectCatgory} = props;
  let status: StatusType | undefined;
  let iconName: SemanticICONS|null = null;
  // if (categoryIndex === rowIndex && result === 0) {
  //   status = 'warning';
  //   iconName = 'checkmark';
  // } else if (categoryIndex === rowIndex && result === player) {
  //   status = 'positive';
  //   iconName = 'checkmark';
  // } else if (categoryIndex === rowIndex && result !== player) {
  //   status = 'negative';
  //   iconName = 'close';
  // }  
    return (
    <Table.Row key={props.key} onClick={props.onSelectStat}>
      {/* {rowIndex === 0 ? (
        <Table.Cell rowSpan='4'>
          <Image src={img} size='tiny' fluid />
        </Table.Cell>        
      ) : null} */}
      <Cell status={status}>
        {props.title}
      </Cell>
      <Cell status={status}>
        {props.value}
      </Cell>
      <Cell status={status}>
        {/* { iconName && <Icon name={iconName} /> } */}
      </Cell>
    </Table.Row>    
  )
}

type CellPropType = {
  status?: StatusType;
  children: any;
}

function Cell(props: CellPropType) {
  const {status, children} = props;
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