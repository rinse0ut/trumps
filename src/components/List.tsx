import React from 'react'
import { List, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";

type ListItem = {
  title: string;
  description?: string;
  url?: string;
}

type PropsType = {
  items: ListItem[];
}

function ListItem({title, description, url}: ListItem) {
  return (
    <List.Item>
      <List.Content>
        <List.Header>
          {url ? <Link to={url}>{title}</Link> : title }
        </List.Header>
         {description}
      </List.Content>
    </List.Item>
  )
}

function ListComponent({items}: PropsType) {
  return (
    <Segment>
      <List divided relaxed="very" size="large">
        {items.map(ListItem)}
      </List>
    </Segment>
  )
}

export default ListComponent