import React from 'react';
import images from './assets/images';

const { contact } = images;
const App = () => (
  <div className="footer" style={{ backgroundImage: `url(${contact})` }}>Contact info goes here</div>
);
export default App;
