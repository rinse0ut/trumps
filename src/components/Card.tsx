import React from 'react';
import { Table, Image, Flag, Icon, SemanticICONS } from 'semantic-ui-react';
import { CardType, CategoryType } from '../types';

type PlayerType = 1 | 2;

type CardPropType = CardType & {
  categories: CategoryType[];
  categoryIndex: number | null;
  player: PlayerType;
  result: number | null;
  onSelectCatgory: (categoryIndex: number) => void;
}

function Card(props: CardPropType) {
  console.log('CARD PROPS', props);
  if (!props.name) {
    return null
  }
  const { name, countryCode, img, values, player, categories, categoryIndex, result, onSelectCatgory } = props;
  return (
    <Table celled selectable unstackable size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan='2'>{name.toUpperCase()}</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>
            <Flag name={countryCode} />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {/* <Table.Row>
          <Table.Cell colSpan='3'>
            <Image src={img} fluid />
          </Table.Cell>
        </Table.Row> */}
        {categories.map((category, i) => {
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
        })}
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
  onSelectCatgory: (categoryIndex: number) => void;
}

function Row(props: RowPropType) {
  const {title, value, rowIndex, img, categoryIndex, result, player, onSelectCatgory} = props;
  let status: StatusType | undefined;
  let iconName: SemanticICONS|null = null;
  if (categoryIndex === rowIndex && result === 0) {
    status = 'warning';
    iconName = 'checkmark';
  } else if (categoryIndex === rowIndex && result === player) {
    status = 'positive';
    iconName = 'checkmark';
  } else if (categoryIndex === rowIndex && result !== player) {
    status = 'negative';
    iconName = 'close';
  }  
    return (
    <Table.Row key={title} onClick={onSelectCatgory}>
      {/* {rowIndex === 0 ? (
        <Table.Cell rowSpan='4'>
          <Image src={img} size='tiny' fluid />
        </Table.Cell>        
      ) : null} */}
      <Cell status={status}>
        {title}
      </Cell>
      <Cell status={status}>
        {value}
      </Cell>
      <Cell status={status}>
        { iconName && <Icon name={iconName} /> }
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