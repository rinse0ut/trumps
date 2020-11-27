import React, { ReactChild } from 'react';
import { createTeleporter } from 'react-teleporter';
import styled from "styled-components";
import { useAuthContext } from '../components/AuthProvider';
import { Container, Icon } from 'semantic-ui-react';
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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

const HeaderLeft = styled.div`
  position: fixed;
  left: 0;
  margin-left: 5px;
`;

const HeaderRight = styled.div`
  position: fixed;
  right: 0;
  margin-right: 10px;
`;

const HeaderLink = styled(Link)`
  color: white;
  &:hover {color: white;}
`

const MainContainer = styled.div`
  background: WhiteSmoke;
  min-height: 100vh;
  max-height: 100%;
`;

const ContentContainer = styled.div`
  padding-top: 60px;
`;

export const Footer = styled.div`
  position: fixed;
  height: 50;
  bottom: 0;
  right: 0;
  padding: 10px;
`;

type PropsType = {
  children: ReactChild;
}

type LocationType = {
  pathname: string;
}

type LinkPropsType = {
  to: string; 
  children: ReactChild
}

export const TitleBar = createTeleporter();
export const HeaderRightButton = createTeleporter();

function Layout(props: PropsType) {
  const {children} = props;

  return (
    <MainContainer>
      <Header/>
      <ContentContainer>
        {children}
      </ContentContainer>
    </MainContainer>
  )
}

function Header() {
  const history = useHistory();
  const location = useLocation<LocationType>();
  console.log('LOCATION', location);
  const showBackButton = !['/home', '/signin', '/singout'].includes(location.pathname);
  return (
    <HeaderContainer>
      {showBackButton && <HeaderLeft onClick={() => history.goBack()}><Icon name='angle left' size='large' inverted/></HeaderLeft>}
      <H1><TitleBar.Target /></H1>
      <HeaderRight><HeaderRightButton.Target /></HeaderRight>
    </HeaderContainer>
  )
}

export function HeaderRightLink({to, children}: LinkPropsType) {
  return (
    <HeaderRightButton.Source>
      <HeaderLink to={to}>{children}</HeaderLink>
    </HeaderRightButton.Source>
  );
}

export default Layout;