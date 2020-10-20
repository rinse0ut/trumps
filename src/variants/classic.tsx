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
    title: 'Bench (kg)',
  },
  {
    category: 'height',
    title: 'Height (cm)',
  },
  {
    category: 'weight',
    title: 'Weight (kg)',
  },
]

const cards: CardType[] = [
  {
    name: 'DT',
    countryCode: 'uk',
    img: dt,
    values: [40, 50, 188, 85]
  },
  {
    name: 'G Dawg',
    countryCode: 'gb wls',
    img: grant,
    values: [36, 100, 121, 100]
  },
  {
    name: 'Captain Morgan',
    countryCode: 'gb sct',
    img: morgan,
    values: [45, 80, 170, 74]
  },  
  {
    name: 'Sunny',
    countryCode: 'uk',
    img: sunny,
    values: [37, 120, 188, 90]
  },    
  {
    name: 'American Ben',
    countryCode: 'us',
    img: ben,
    values: [32, 120, 185, 95]
  },     
  {
    name: 'Willbert',
    countryCode: 'gb sct',
    img: will,
    values: [33, 135, 170, 75]
  },  
  {
    name: 'Landers',
    countryCode: 'uk',
    img: rob,
    values: [42, 60, 175, 70]
  },
  {
    name: 'Scouse',
    countryCode: 'gb sct',
    img: scouse,
    values: [35, 60, 188, 80]
  },
  {
    name: 'Master of Weights and Measures',
    countryCode: 'gb wls',
    img: vinnie,
    values: [37, 50, 186, 75]
  },
  {
    name: 'Didun',
    countryCode: 'gb wls',
    img: didun,
    values: [26, 80, 180, 80]
  },  
  {
    name: 'Nick',
    countryCode: 'uk',
    img: nick,
    values: [43, 120,186, 90]
  },
  {
    name: 'Pierce',
    countryCode: 'uk',
    img: pierce,
    values: [43, 80, 170, 75]
  },
  {
    name: 'Karate Kid',
    countryCode: 'gb sct',
    img: dan,
    values: [33, 99, 170, 99]
  },  
  {
    name: 'Ant',
    countryCode: 'uk',
    img: ant,
    values: [40, 120, 188, 90]
  },  
  {
    name: 'Mike',
    countryCode: 'uk',
    img: mike,
    values: [37, 113, 175, 76]
  }, 
  {
    name: 'Stevooo',
    countryCode: 'uk',
    img: stevooo,
    values: [41, 125, 188, 95]
  },   
];

export default {
  categories,
  cards
}