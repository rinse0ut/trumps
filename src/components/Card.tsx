import React from 'react';
import { Table, Image, Flag, Icon } from 'semantic-ui-react';
import { CardType, CategoryType } from '../types';

type PlayerType = 1 | 2;

type CardPropType = CardType & {
  categories: CategoryType[];
  categoryIndex: number | null;
  player: PlayerType;
  result: number | null;
  onSelectCatgory: (categoryIndex: number) => void;
}

function CardComponent(props: CardPropType) {
  console.log('CARD PROPS', props);
  if (!props.name) {
    return null
  }
  const { name, countryCode, img, values, player, categories, categoryIndex, result, onSelectCatgory } = props;
  return (
    <Table celled selectable unstackable size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan='3'>{name.toUpperCase()}</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>
            <Flag name={countryCode} />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {/* <Table.Row>
          <Table.Cell>
            <Image src={img} size='small' />
          </Table.Cell>
        </Table.Row> */}
        {categories.map((category, i) => {
          const { title } = category;
          const stat = values[i];
          if (categoryIndex === i && result === 0) {
            return (
              <Table.Row warning key={title} onClick={() => onSelectCatgory(i)}>
              { i === 0 
                ? (
                <Table.Cell rowSpan='4'>
                  <Image src={img} size='tiny' fluid />
                </Table.Cell>
                )
                : null
              }                
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{stat}</Table.Cell>
                <Table.Cell><Icon name='checkmark' /></Table.Cell>
              </Table.Row>
            )
          } else if (categoryIndex === i && result === player) {
            return (
              <Row 
                key={title} 
                status='positive'
                rowIndex={i}
                img={img}
                title={title}
                value={stat}
                onSelectCatgory={() => onSelectCatgory(i)}
              />
              // <Table.Row positive key={title} onClick={() => onSelectCatgory(i)}>
              // { i === 0 
              //   ? (
              //   <Table.Cell rowSpan='4'>
              //     <Image src={img} size='tiny' fluid />
              //   </Table.Cell>
              //   )
              //   : null
              // }                
              //   <Table.Cell>{title}</Table.Cell>
              //   <Table.Cell>{stat}</Table.Cell>
              //   <Table.Cell><Icon name='checkmark' /></Table.Cell>
              // </Table.Row>
            )
          } else if (categoryIndex === i && result !== player) {
            return (
              <Table.Row negative key={title} onClick={() => onSelectCatgory(i)}>
              { i === 0 
                ? (
                <Table.Cell rowSpan='4'>
                  <Image src={img} size='tiny' fluid />
                </Table.Cell>
                )
                : null
              }                
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{stat}</Table.Cell>
                <Table.Cell><Icon name='close' /></Table.Cell>
              </Table.Row>
            )
          }
          return (
            <Row 
              key={title} 
              rowIndex={i}
              img={img}
              title={title}
              value={stat}
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
  img: any;
  status?: 'positive' | 'negative' | 'warning';
  onSelectCatgory: (categoryIndex: number) => void;
}

function Row(props: RowPropType) {
  const {title, value, rowIndex, img, status, onSelectCatgory} = props;
  return (
    <Table.Row key={title} onClick={onSelectCatgory}>
      {rowIndex === 0 ? (
        <Table.Cell rowSpan='4'>
          <Image src={img} size='tiny' fluid />
        </Table.Cell>        
      ) : null}
      <Cell status={status} value={title}/>
      <Cell status={status} value={value}/>
      <Table.Cell></Table.Cell>
    </Table.Row>    
  )
}

type CellPropType = {
  status?: StatusType;
  value: string|number;
}

function Cell(props: CellPropType) {
  const {status, value} = props;
  return (
    <Table.Cell
      positive={status === 'positive'} 
      negative={status === 'negative'} 
      warning={status === 'warning'} 
    >
      {value}
    </Table.Cell> 
  );
}

export default CardComponent;