import React from 'react';
import { Link } from 'react-router-dom';
import './assets/css/notFound.scss';

const NotFound = () => {
  return (
    <>
      <div className="not-found-container">
        <img src="https://media.gettyimages.com/photos/error-404-picture-id182927814?k=6&m=182927814&s=612x612&w=0&h=cvkNAAKZTecQg-GNKRXK1MLEhDCKlEcZxn6uBf4zC4U=" alt="image not found" />
        <div className='not-found-section'>
          <div className="not-found-txt">
            <div className></div>
            <h1 className="title">Page not found :(</h1>
            <p className="common-text-style apology-msg">We&apos;re sorry, we couldn&lsquo;t find the page you requested.</p>
            <p className="common-text-style ask-redirect">Please click the button below to go back home.</p>
            <div className="home-btn">
              <Link to="/">Go back</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NotFound;
