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
    category: 'status',
    title: 'Status',
    ranking: ['🐌', '🛎', '🛋', '🐿', '🌎 🚀'],
  },
  {
    category: 'banter',
    title: 'Banter Level',
    ranking: ['GNVQ', 'GCSE', 'A Level', 'Covid20'],
  },
  {
    category: 'weight',
    title: 'Weight (kg)',
  },
  {
    category: 'chess',
    title: 'Chess Rating',
  }
]

const cards: CardType[] = [
  {
    name: 'DT',
    countryCode: 'uk',
    img: dt,
    values: ['🛋', 'Covid20', 88, 935]
  },
  {
    name: 'G Dawg',
    countryCode: 'gb wls',
    img: grant,
    values: ['🐿', 'GNVQ', 65, 0]
  },
  {
    name: 'Captain Morgan',
    countryCode: 'gb sct',
    img: morgan,
    values: ['🛋', 'GCSE', 68, 1078]
  },  
  {
    name: 'Sunny',
    countryCode: 'uk',
    img: sunny,
    values: ['🛎', 'GNVQ', 94, 1261]
  },    
  {
    name: 'American Ben',
    countryCode: 'us',
    img: ben,
    values: ['🌎 🚀', 'GCSE', 95, 0]
  },     
  {
    name: 'Willbert',
    countryCode: 'gb sct',
    img: will,
    values: ['🌎 🚀', 'A Level', 75, 669]
  },  
  {
    name: 'Landers',
    countryCode: 'uk',
    img: rob,
    values: ['🐿', 'A Level', 70, 600]
  },
  {
    name: 'Scouse',
    countryCode: 'gb sct',
    img: scouse,
    values: ['🛋', 'GCSE', 85, 1149]
  },
  {
    name: 'Master of Weights and Measures',
    countryCode: 'gb wls',
    img: vinnie,
    values: ['🌎 🚀', 'A Level', 80, 0]
  },
  {
    name: 'Didun',
    countryCode: 'gb wls',
    img: didun,
    values: ['🌎 🚀', 'GCSE', 80, 600]
  },  
  {
    name: 'Nick',
    countryCode: 'uk',
    img: nick,
    values: ['🐌', 'GCSE', 99, 500]
  },
  {
    name: 'Pierce',
    countryCode: 'uk',
    img: pierce,
    values: ['🛋', 'GCSE', 70, 0]
  },
  {
    name: 'Karate Kid',
    countryCode: 'gb sct',
    img: dan,
    values: ['🛋', 'GCSE', 125, 746]
  },  
  {
    name: 'Ant',
    countryCode: 'uk',
    img: ant,
    values: ['🛋', 'GCSE', 90, 0]
  },  
  {
    name: 'Mike',
    countryCode: 'uk',
    img: mike,
    values: ['🐌', 'GCSE', 73, 300]
  }, 
  {
    name: 'Stevooo',
    countryCode: 'uk',
    img: stevooo,
    values: ['🐿', 'GCSE', 95, 0]
  },   
];

export {
  categories,
  cards
}