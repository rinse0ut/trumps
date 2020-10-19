import {CardType, CategoryType} from '../types';

import will from '../img/will.jpeg';
import dan from '../img/dan.jpeg';
import ben from '../img/ben.jpeg';
import sunny from '../img/sunny.jpeg';
import morgan from '../img/morgan.jpeg';
import didun from '../img/didun.jpeg';
import mike from '../img/mike.jpeg';
import ant from '../img/ant.jpeg';
import nick from '../img/nick.jpeg';
import pierce from '../img/pierce.jpeg';
import scouse from '../img/scouse.jpeg';
import vinnie from '../img/vinnie.jpeg';
import grant from '../img/grant.jpeg';
import rob from '../img/rob.jpeg';
import dt from '../img/dt.jpeg';
import stevooo from '../img/stevooo.jpeg';

const categories: CategoryType[] = [
  {
    category: 'charm',
    title: 'Charm',
  },
  {
    category: 'notches',
    title: 'Notches',
  },
  {
    category: 'flags',
    title: 'Flags',
  },
  {
    category: 'stds',
    title: 'STDS',
  },
]

const cards: CardType[] = [
  {
    name: 'DT',
    countryCode: 'uk',
    img: dt,
    values: [40, 70, 90, 80]
  },
  {
    name: 'G Dawg',
    countryCode: 'gb wls',
    img: grant,
    values: [36, 85, 90, 95]
  },
  {
    name: 'Captain Morgan',
    countryCode: 'gb sct',
    img: morgan,
    values: [45, 75, 80, 90]
  },  
  {
    name: 'Sunny',
    countryCode: 'uk',
    img: sunny,
    values: [37, 10, 5, 2]
  },    
  {
    name: 'American Ben',
    countryCode: 'us',
    img: ben,
    values: [32, 92, 80, 85]
  },     
  {
    name: 'Willbert',
    countryCode: 'gb sct',
    img: will,
    values: [33, 95, 90, 94]
  },  
  {
    name: 'Landers',
    countryCode: 'uk',
    img: rob,
    values: [42, 70, 90, 95]
  },
  {
    name: 'Scouse',
    countryCode: 'gb sct',
    img: scouse,
    values: [35, 70, 80, 94]
  },
  {
    name: 'Master of Weights and Measures',
    countryCode: 'gb wls',
    img: vinnie,
    values: [37, 70, 80, 90]
  },
  {
    name: 'Didun',
    countryCode: 'gb wls',
    img: didun,
    values: [26, 70, 80, 80]
  },  
  {
    name: 'Nick',
    countryCode: 'uk',
    img: nick,
    values: [43, 90, 2, 80]
  },
  {
    name: 'Pierce',
    countryCode: 'uk',
    img: pierce,
    values: [43, 75, 90, 80]
  },
  {
    name: 'Karate Kid',
    countryCode: 'gb sct',
    img: dan,
    values: [33, 94, 75, 80]
  },  
  {
    name: 'Ant',
    countryCode: 'uk',
    img: ant,
    values: [40, 93, 70, 80]
  },  
  {
    name: 'Mike',
    countryCode: 'uk',
    img: mike,
    values: [37, 70, 70, 80]
  }, 
  {
    name: 'Stevooo',
    countryCode: 'uk',
    img: stevooo,
    values: [41, 93, 85, 90]
  },   
];

export default {
  categories,
  cards
}