import React from "react";
import { Container, Icon } from 'semantic-ui-react';
import styled from "styled-components";

const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -70px;
`;

function Loading() {
  return (
    <LoadingContainer>
      <Icon loading name='spinner' size='big' />
    </LoadingContainer>
  )
}

export default Loading;