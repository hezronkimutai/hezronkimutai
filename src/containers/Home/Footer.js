import React from 'react';
import images from '../../components/images';
import { Paypal } from './WhyMe'
const {
  github, linkedIn } = images;
const socialLinks = [{
  link: 'https://github.com/hezronkimutai',
  imgUrl: github,
},
{
  link: 'https://www.linkedin.com/in/hezron-kimutai-603b62173/',
  imgUrl: linkedIn,
}
];
const App = () => (
  <div className='footer flex flex-row'>
    <div className='w-10 m-auto'><Paypal /></div>
    <div className=" py-3 m-auto flex flex-row justify-center">
      {socialLinks.map((lnk) => <a rel="noreferrer" href={lnk.link} key={lnk.link} target="_blank"><img alt={lnk.link} className="w-8 h-8 mx-3" src={lnk.imgUrl} /></a>)}
    </div>
  </div>
);
export default App;
