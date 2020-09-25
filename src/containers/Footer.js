import React from 'react';
import images from '../components/images';

const {
  github, linkedIn, facebook, twitter, instagram,
  stackoverflow,
} = images;

const socialLinks = [{
  link: 'https://github.com/hezronkimutai',
  imgUrl: github,
}, {
  link: 'https://twitter.com/theHClerk',
  imgUrl: twitter,
}, {
  link: 'https://web.facebook.com/hezron.kimutai.35/',
  imgUrl: facebook,
}, {
  link: 'https://www.instagram.com/hezzkimutai/',
  imgUrl: instagram,
}, {
  link: 'https://www.linkedin.com/in/hezron-kimutai-603b62173/',
  imgUrl: linkedIn,
}, {
  link: 'https://stackoverflow.com/users/10624555/h-kim',
  imgUrl: stackoverflow,
}];
const App = () => (
  <div className="footer py-3 flex flex-row justify-center">
    {socialLinks.map((lnk) => <a rel="noreferrer" href={lnk.link} key={lnk.link} target="_blank"><img alt={lnk.link} className="w-8 h-8 mx-3" src={lnk.imgUrl} /></a>)}
  </div>
);
export default App;
