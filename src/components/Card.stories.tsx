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
    name="Jane Smith"
    countryCode="uk"
    img={dt}
    values={[1,2]}
    categoryIndex={1}
    categories={CATEGORIES}
    player={1}
    result={null}
    onSelectCatgory={()=>{}} 
  />
);  