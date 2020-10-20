import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import 'semantic-ui-css/semantic.min.css';
import Card from './Card';

export default { component: Card, title: 'Foobar / Card ' } as Meta;

export const WithArgs = (args: any) => <Card {...args} />;
WithArgs.args = { label: 'With args' };
export const Basic = () => (
  <Card
    name="Jane Smith"
    countryCode="uk"
    img=""
    values={[1]}
    categoryIndex={1}
    categories={[{category: 'foo', title: 'Foo'}]}
    player={1}
    result={null}
    onSelectCatgory={()=>{}} 
  />
);  