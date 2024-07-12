import React from 'react';
import axios from 'axios';
import images from '../../components/images';
import Paypal from './Paypal';

const { github, linkedIn } = images;

const socialLinks = [
  {
    link: 'https://github.com/hezronkimutai',
    imgUrl: github,
  },
  {
    link: 'https://www.linkedin.com/in/hezron-kimutai-603b62173/',
    imgUrl: linkedIn,
  },
];

const App = () => {
  const handleCheckout = async () => {
    try {
      const res = await axios.get('http://localhost:3000/checkout');
      console.log({ res: res.data.url });
      window.location.href = res.data.url;
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle error: display a message to the user or retry logic
    }
  };

  return (
    <div className="footer flex flex-row justify-center items-center bg-gray-200 py-4">
      <div className=" mx-2"><Paypal /></div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={handleCheckout}
      >
        Stripe Button
      </button>
      <div className="flex flex-row ml-2">
        {socialLinks.map((lnk) => (
          <a
            key={lnk.link}
            href={lnk.link}
            target="_blank"
            rel="noreferrer"
            className="ml-2"
          >
            <img
              className="w-8 h-8"
              src={lnk.imgUrl}
              alt="Social Media Icon"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default App;
