import React from 'react'
import { List, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import Loading from '../components/Loading';
import { TitleBar } from '../components/Layout';
import {UserType} from '../components/AuthProvider';
import Can from '../auth/Can';

type PropsType = {
  title: string;
  items?: any[];  // @TODO type
  user?: UserType;
  renderItem?: (item: any) => JSX.Element;
}

function ListComponent({ user, title, items, renderItem }: PropsType) {

  if (!items) {
    return (
      <Loading />
    )
  }

  function maybe(item:any) {
    if (user && item.action) {
      return (
        <Can
          role={user?.role}
          perform={item.action}
          yes={() => renderItem ? renderItem(item) : <DefaultListItem {...item}/>}
        />
      );
    }
    return renderItem ? renderItem(item) : <DefaultListItem {...item}/> 
  }

  return (
    <>
      <TitleBar.Source>{title}</TitleBar.Source>
      <Segment>
        <List divided relaxed="very" size="large">
          {items.length > 0
            ? items.map(maybe)
            : <ListItem>No items</ListItem>
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

function DefaultListItem({ title, description, url }: ListItemPropsType) {
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

export function ListItem({ children }: any) {
  return (
    <List.Item>
      <List.Content>
        {children}
      </List.Content>
    </List.Item>
  )
}

export function ListHeader({ children }: any) {
  return (
    <List.Header>
      {children}
    </List.Header>
  )
}

export default ListComponent