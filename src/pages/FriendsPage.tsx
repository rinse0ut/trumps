import React from "react";
import { Image } from 'semantic-ui-react'
import useCollection from '../hooks/useCollection';
import FriendList from '../components/List';
import { List } from 'semantic-ui-react';;

function FriendsPage() {

  const users = useCollection<any>('users');

  return (
    <FriendList
      title="Friends 🌎"
      items={users}
      renderItem={(item: any) => (
        <List.Item>        
          <Image avatar src={item.photoURL} />
          <List.Content>
            <List.Header>
              {item.username}
            </List.Header>
            {/* {item.status ? item.status : 'Pioneer'}  */}
            {/* {item.firstname} {item.lastname}<br/> */}
            {/* {item.email}  */}
          </List.Content>
        </List.Item>        
    )} />
  )
}

export default FriendsPage;