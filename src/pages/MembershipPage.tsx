import React from "react";
import { TitleBar } from '../components/Layout';
import {Container} from 'semantic-ui-react';

function MembershipPage() {
  return (
    <Container>
      <TitleBar.Source>Membership</TitleBar.Source>
      <br/>
      <h3>🍖 🍳  Ham &amp; Egger</h3>
      <ul>
        <li>Play top trumps with your friends</li>
      </ul>
      <h3>⭐  Gold</h3>
      <ul>
        <li>Play top trumps with your friends</li>
        <li>Invite your friends to play custom packs</li>
      </ul>      
      <h3>👑  Platinium</h3>
      <ul>
        <li>Play top trumps with your friends</li>
        <li>Invite your friends to play custom packs</li>
        <li>Edit custom packs</li>
      </ul>      
      <h3>💎  Diamond</h3>
      <ul>
        <li>Play top trumps with your friends</li>
        <li>Invite your friends to play custom packs</li>
        <li>Edit custom packs</li>
        <li>Create new custom packs</li>
      </ul>      
    </Container>
  )
}

export default MembershipPage;