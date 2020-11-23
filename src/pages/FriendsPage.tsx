import React from "react";
import useCollection from '../hooks/useCollection';
import List, {ListHeader, ListItem} from '../components/List';

function FriendsPage() {

  const users = useCollection<any>('users');

  return (
    <List
      title="Friends 🌎"
      items={users}
      renderItem={(item) => (
        <ListItem>
          <ListHeader>
            {item.username}
          </ListHeader>
          {item.firstname} {item.lastname}<br/>
          {item.email} 
        </ListItem>
    )} />
  )
}

export default FriendsPage;