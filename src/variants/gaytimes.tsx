import {CardType, CategoryType} from '../types';

import will from '../img/will_gt.jpeg';
import dan from '../img/gt.jpg';
import ben from '../img/ben_gt.jpg';
import sunny from '../img/sunny_gt.jpeg';
import morgan from '../img/morgan_gt.jpg';
import didun from '../img/didun_gt.jpg';
import mike from '../img/mike_gt.jpg';
import ant from '../img/ant.jpeg';
import nick from '../img/gt.jpg';
import pierce from '../img/pierce_gt.jpg';
import scouse from '../img/gt3.jpg';
import vinnie from '../img/gt.jpg';
import grant from '../img/grant_gt.jpeg';
import rob from '../img/rob_gt.jpeg';
import dt from '../img/sunny_gt.jpeg';
import stevooo from '../img/stevooo_gt.jpg';

const categories: CategoryType[] = [
  {
    category: 'aids',
    title: 'HIV Infections',
  },
]

const cards: CardType[] = [
  {
    name: 'DT',
    countryCode: 'uk',
    img: dt,
    values: [1, 70, 90, 80]
  },
  {
    name: 'G Dawg',
    countryCode: 'gb wls',
    img: grant,
    values: [2, 85, 90, 95]
  },
  {
    name: 'Captain Morgan',
    countryCode: 'gb sct',
    img: morgan,
    values: [3, 75, 80, 90]
  },  
  {
    name: 'Sunny',
    countryCode: 'uk',
    img: sunny,
    values: [100000, 10, 5, 2]
  },    
  {
    name: 'American Ben',
    countryCode: 'us',
    img: ben,
    values: [4, 92, 80, 85]
  },     
  {
    name: 'Willbert',
    countryCode: 'gb sct',
    img: will,
    values: [5, 95, 90, 94]
  },  
  {
    name: 'Landers',
    countryCode: 'uk',
    img: rob,
    values: [6, 70, 90, 95]
  },
  {
    name: 'Scouse',
    countryCode: 'gb sct',
    img: scouse,
    values: [7, 70, 80, 94]
  },
  {
    name: 'Master of Weights and Measures',
    countryCode: 'gb wls',
    img: vinnie,
    values: [8, 70, 80, 90]
  },
  {
    name: 'Didun',
    countryCode: 'gb wls',
    img: didun,
    values: [9, 70, 80, 80]
  },  
  {
    name: 'Nick',
    countryCode: 'uk',
    img: nick,
    values: [10, 90, 2, 80]
  },
  {
    name: 'Pierce',
    countryCode: 'uk',
    img: pierce,
    values: [11, 75, 90, 80]
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
    values: [12, 93, 70, 80]
  },  
  {
    name: 'Mike',
    countryCode: 'uk',
    img: mike,
    values: [13, 70, 70, 80]
  }, 
  {
    name: 'Stevooo',
    countryCode: 'uk',
    img: stevooo,
    values: [14, 93, 85, 90]
  },   
];

export default {
  categories,
  cards
}