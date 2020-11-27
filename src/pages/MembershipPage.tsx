import React from "react";
import { TitleBar } from '../components/Layout';
import {Container} from 'semantic-ui-react';

function MembershipPage() {
  return (
    <Container>
      <TitleBar.Source>Membership</TitleBar.Source>
      <h3>🍖 🍳  Basic</h3>
      <ul>
        <li>Play top trump packs with your friends</li>
      </ul>
      <h3>⭐  Gold</h3>
      <ul>
        <li>Play top trump packs with your friends</li>
        <li>Invite your friends to play custom packs</li>
      </ul>      
      <h3>👑  Platinium</h3>
      <ul>
        <li>Play top trump packs with your friends</li>
        <li>Invite your friends to play custom packs</li>
        <li>Edit custom packs</li>
      </ul>      
      <h3>💎  Diamond</h3>
      <ul>
        <li>Play top trump packs with your friends</li>
        <li>Invite your friends to play custom packs</li>
        <li>Edit custom packs</li>
        <li>Create custom packs</li>
      </ul>      
    </Container>
  )
}

export default MembershipPage;