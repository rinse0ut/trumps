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
    category: 'age',
    title: 'Age',
  },
  {
    category: 'strength',
    title: 'Strength',
  },
  {
    category: 'skill',
    title: 'Skill',
  },
  {
    category: 'intelligence',
    title: 'IQ',
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
    values: [36, 80, 90, 90]
  },
  {
    name: 'Captain Morgan',
    countryCode: 'gb sct',
    img: morgan,
    values: [45, 75, 90, 90]
  },  
  {
    name: 'Sunny',
    countryCode: 'uk',
    img: sunny,
    values: [37, 1, 0, 0]
  },    
  {
    name: 'American Ben',
    countryCode: 'us',
    img: ben,
    values: [32, 90, 90, 85]
  },     
  {
    name: 'Willbert',
    countryCode: 'gb sct',
    img: will,
    values: [33, 90, 90, 90]
  },  
  {
    name: 'Landers',
    countryCode: 'uk',
    img: rob,
    values: [42, 70, 90, 90]
  },
  {
    name: 'Scouse',
    countryCode: 'gb sct',
    img: scouse,
    values: [35, 70, 90, 90]
  },
  {
    name: 'Master of Weights and Measures',
    countryCode: 'gb wls',
    img: vinnie,
    values: [37, 70, 90, 90]
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
    values: [43, 90, 60, 90]
  },
  {
    name: 'Pierce',
    countryCode: 'uk',
    img: pierce,
    values: [43, 70, 90, 90]
  },
  {
    name: 'Karate Kid',
    countryCode: 'gb sct',
    img: dan,
    values: [33, 89, 73, 80]
  },  
  {
    name: 'Ant',
    countryCode: 'uk',
    img: ant,
    values: [40, 90, 90, 90]
  },  
  {
    name: 'Mike',
    countryCode: 'uk',
    img: mike,
    values: [37, 70, 90, 90]
  }, 
  {
    name: 'Stevooo',
    countryCode: 'uk',
    img: stevooo,
    values: [41, 90, 90, 90]
  },   
];

export default {
  categories,
  cards
}