import React from "react";
import { TitleBar } from '../components/Layout';
import {Container} from 'semantic-ui-react';

function AboutPage() {

  return (
    <Container>
      <TitleBar.Source>About 👾</TitleBar.Source>
      <h2>Top Trumps</h2>
      <p>This is a classic Top Trumps game of the of the Pioneers for the Pioneers.</p>
      <p>You can create your own pack of cards with custom stats and play your friends in realtime or by correspondence.</p>
      <p>If you have any suggestion for improvments or bug reports please WhatsApp or email <a href="mailto:djthomson@gmail.com">DT</a></p>
      <h2>Alpha Release v0.1.0 - 22/11/2020</h2>
      <h3>What's new</h3>
      <ul>
        <li>User Authentication</li>
        <li>Enable 2 player mode with realtime updates</li>
        <li>Create and manage card packs</li>
        <li>WhatsApp mobile theme</li>
      </ul>
      <h2>Alpha Release v0.1.1 - 23/11/2020</h2>
      <h3>What's new</h3>
      <ul>
        <li>Facebook login</li>
        <li>Show profile picture on friends list</li>
      </ul>
      <h3>Improvements</h3>
      <ul>
        <li>Made it easier to create pioneer packs.  Just add the stats and fill them out!</li>
        <li>Login screen UX</li>
      </ul>
      <h3>Fixes</h3>
      <ul>
        <li>Confirmation email redirect</li>
      </ul>       
    </Container>
  )
}

export default AboutPage;