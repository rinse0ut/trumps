import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import 'semantic-ui-css/semantic.min.css';
import Card from './Card';
import dt from '../img/dt.jpeg';

const CATEGORIES = [
  {category: 'foo', title: 'Foo'}, 
  {category: 'bar', title: 'Bar'}, 
]

export default { component: Card, title: 'Foobar / Card ' } as Meta;

export const WithArgs = (args: any) => <Card {...args} />;
WithArgs.args = { label: 'With args' };
export const Basic = () => (
  <Card
    name="Donald Trump"
    countryCode="uk"
    img={dt}
    values={[1,2]}
    categoryIndex={null}
    categories={CATEGORIES}
    player={1}
    result={null}
    onSelectCatgory={()=>{}} 
  />
);  

export const Win = () => (
  <Card
    name="Donald Trump"
    countryCode="uk"
    img={dt}
    values={[1,2]}
    categoryIndex={1}
    categories={CATEGORIES}
    player={1}
    result={1}
    onSelectCatgory={()=>{}} 
  />
);  

export const Draw = () => (
  <Card
    name="Donald Trump"
    countryCode="uk"
    img={dt}
    values={[1,2]}
    categoryIndex={1}
    categories={CATEGORIES}
    player={1}
    result={0}
    onSelectCatgory={()=>{}} 
  />
);  

export const Loss = () => (
  <Card
    name="Donald Trump"
    countryCode="uk"
    img={dt}
    values={[1,2]}
    categoryIndex={1}
    categories={CATEGORIES}
    player={1}
    result={2}
    onSelectCatgory={()=>{}} 
  />
);  