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
    category: 'usual',
    title: 'The Usual',
    ranking: ['☀️ 🍺 🍦','🥛','🍺 🍏','🍺','🍋 🍋','🍹','🥃','🍸 🍸 🍸 🍸 🍸','🍾']
  },
  {
    category: 'habitat',
    title: 'Natural Habitat',
    ranking: ['Cafe Nero', 'Predrinks', 'Pub', 'La Rocca', 'Lolas', 'Be At One']
  },
  {
    category: 'drunk',
    title: 'Drunk Factor',
  },
  {
    category: 'offense',
    title: 'People Offended',
  },
]

const cards: CardType[] = [
  {
    name: 'DT',
    countryCode: 'uk',
    img: dt,
    values: ['🍋 🍋', 'Cafe Nero', 3, 1]
  },
  {
    name: 'G Dawg',
    countryCode: 'gb wls',
    img: grant,
    values: ['🥃', 'Be At One', 4, 3]
  },
  {
    name: 'Captain Morgan',
    countryCode: 'gb sct',
    img: morgan,
    values: ['🍺', 'Cafe Nero', 0, 1]
  },  
  {
    name: 'Sunny',
    countryCode: 'uk',
    img: sunny,
    values: ['☀️ 🍺 🍦', 'Predrinks', 4, 5]
  },    
  {
    name: 'American Ben',
    countryCode: 'us',
    img: ben,
    values: ['🍺', 'La Rocca', 5, 4]
  },     
  {
    name: 'Willbert',
    countryCode: 'gb sct',
    img: will,
    values: ['🍸 🍸 🍸 🍸 🍸', 'Be At One', 5, 11]
  },  
  {
    name: 'Landers',
    countryCode: 'uk',
    img: rob,
    values: ['🍹', 'Lolas', 3, 1]
  },
  {
    name: 'Scouse',
    countryCode: 'gb sct',
    img: scouse,
    values: ['🍺', 'Pub', 3, 1]
  },
  {
    name: 'Master of Weights and Measures',
    countryCode: 'gb wls',
    img: vinnie,
    values: ['🍺', 'Pub', 3, 5]
  },
  {
    name: 'Didun',
    countryCode: 'gb wls',
    img: didun,
    values: ['🍺', 'Lolas', 3, 3]
  },  
  {
    name: 'Nick',
    countryCode: 'uk',
    img: nick,
    values: ['🍾', 'La Rocca', 3, 4]
  },
  {
    name: 'Pierce',
    countryCode: 'uk',
    img: pierce,
    values: ['🍺 🍏', 'La Rocca', 2, 1]
  },
  {
    name: 'Karate Kid',
    countryCode: 'gb sct',
    img: dan,
    values: ['🥛', 'Cafe Nero', 0, 10]
  },  
  {
    name: 'Ant',
    countryCode: 'uk',
    img: ant,
    values: ['🍺', 'Pub', 2, 3]
  },  
  {
    name: 'Mike',
    countryCode: 'uk',
    img: mike,
    values: ['🍺', 'Pub', 2, 9]
  }, 
  {
    name: 'Stevooo',
    countryCode: 'uk',
    img: stevooo,
    values: ['🍹', 'La Rocca', 5, 3]
  },  
];

export default {
  categories,
  cards
}