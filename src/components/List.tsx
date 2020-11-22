import React from 'react'
import { List, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import Loading from '../components/Loading';
import {TitleBar} from '../components/Layout';

type PropsType = {
  title: string;
  items?: any[];  // @TODO type
  renderItem?: (item: any) => JSX.Element;
}

function ListComponent({title, items, renderItem}: PropsType) {

  if (!items) {
    return (
      <Loading/> 
    )
  }

  return (
    <>
      <TitleBar.Source>{title}</TitleBar.Source>
      <Segment>
        <List divided relaxed="very" size="large">
          {items.length > 0 
            ? items.map(renderItem ? renderItem : DefaultListItem)
            : <ListItem>No games</ListItem>
          }
        </List>
      </Segment>
    </>
  )
}

type ListItemPropsType = {
  title?: string;
  description?: string;
  url?: string;
}

function DefaultListItem({title, description, url}: ListItemPropsType) {
  return (
    <List.Item>
      <List.Content>
        <List.Header>
          {url ? <Link to={url}>{title}</Link> : title}
        </List.Header>
         {description}
      </List.Content>
    </List.Item>
  )
}

export function ListItem({children}: any) {
  return (
    <List.Item>
      <List.Content>
        <List.Header>
          {children} 
        </List.Header>
      </List.Content>
    </List.Item>
  )
}

export default ListComponent