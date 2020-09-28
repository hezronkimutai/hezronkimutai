import React from 'react';
// import { CallToactionBtn } from './LandingDiv';
import images from '../components/images';

const {
  bena,
  bon,
  ivy,
  victor,
  willy,
  ezrqn,
} = images;

const patners = [
  {
    imageUrl: ezrqn,
    name: 'Ezrqn Kemboi',
    webUrl: 'https://github.com/ezkemboi',
  }, {
    imageUrl: bon,
    name: 'BonVic Bundi',
    webUrl: 'https://bonvich.me/',
  }, {
    imageUrl: willy,
    name: 'Willy Sugira',
    webUrl: 'https://github.com/william000000',
  }, {
    imageUrl: victor,
    name: 'Victor Karangwa',
    webUrl: 'https://victorkarangwa.com',
  }, {
    imageUrl: bena,
    name: 'Benard Kitungu',
    webUrl: 'https://kitingu.com',
  }, {
    imageUrl: ivy,
    name: 'Ivy Nzioka',
    webUrl: 'https://github.com/nziokaivy',
  },
];
// style={{ backgroundColor: '#DEECF7' }}
const WhyMe = () => (
  <div className="" id="">
    <div className="mx-auto py-8">
      <h1
        data-aos="flip-right"
        className=" mx-auto text-4xl text-center font-bold"
      >
        PATNERS
      </h1>
      <div style={{ }} className="mx-auto w-11/12 flex flex-wrap justify-around">
        {
     patners.map((patner) => (
       <a className="flex flex-col m-2" target="_blank" rel="noreferrer" href={patner.webUrl} key={patner.webUrl}>
         <img className="rounded-full m-auto h-20 w-20" src={patner.imageUrl} alt={patner.webUrl} />
         <a className="text-blue-700 p-2" target="_blank" rel="noreferrer" href={patner.webUrl}>
           {patner.name}
         </a>
       </a>
     ))
   }
      </div>
    </div>

  </div>
);

export default WhyMe;
