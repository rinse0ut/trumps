import React, { ReactChild } from 'react';
import { createTeleporter } from 'react-teleporter';
import styled from "styled-components";
import { useAuthContext } from '../components/AuthProvider';
import { Container, Icon } from 'semantic-ui-react';
import { useHistory, useLocation } from "react-router-dom";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: 50px;
  background: #1b9a59;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const H1 = styled.h1`
  color: white;
  margin: 0;
`;

const LeftAction = styled.div`
  position: fixed;
  left: 0;
  margin-left: 5px;
`;

const ContentContainer = styled.div`
  padding-top: 70px;
`;

export const Footer = styled.div`
  position: fixed;
  height: 50;
  background: #1b9a59;
  bottom: 0;
  left: 0;
  right: 0;
`;

type PropsType = {
  children: ReactChild;
}

type LocationType = {
  pathname: string;
}

export const TitleBar = createTeleporter()

function Header() {
  const history = useHistory();
  const location = useLocation<LocationType>();
  console.log('LOCATION', location);
  const showBackButton = !['/home', '/signin', '/singout'].includes(location.pathname);
  return (
    <HeaderContainer>
      {showBackButton && <LeftAction onClick={() => history.goBack()}><Icon name='angle left' size='large' inverted/></LeftAction>}
      <H1><TitleBar.Target /></H1>
    </HeaderContainer>
  )
}

function Layout(props: PropsType) {
  const {children} = props;
  const {currentUser} = useAuthContext();

  return (
    <div style={{height: '100vh', backgroundColor: 'WhiteSmoke'}}>
      <Container>
        <Header/>
        <ContentContainer>
          {children}
        </ContentContainer>
      </Container>
    </div>
  )
}

export default Layout;