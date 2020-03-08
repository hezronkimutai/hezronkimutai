import React, { useRef } from 'react';
import propTypes from 'prop-types';

const contactInfo = [
  { key: 'First name', value: 'Hezron' },
  { key: 'Last name', value: 'Kimutai' },
  { key: 'Address', value: 'Kigali' },
  { key: 'Phone number', value: '+254799087221' },
  { key: 'Email address', value: 'hezronchelimo.hc@gmail.com' },
  { key: 'Date of birth', value: '14/11/1996' },
  { key: 'Nationality', value: 'Kenyan' },
  { key: 'Web', value: 'link' },
];

const Profile = ({ prof }) => {
  const profileRef = useRef();
  prof(profileRef);
  return (
    <div className="profile" id="profile" ref={profileRef}>
      <div className="profileContainer">
        <div className="detailsHeader">
          <div>
            <h1>Profile</h1>
          </div>
        </div>
        <div className="details">
          <div className="contacts">
            <div className="contactsHeader">
              <h1>About</h1>
            </div>
            {contactInfo.map((item) => (
              <div>
                <div>{item.key}</div>
                <div>{item.value}</div>
              </div>
            ))}
          </div>
          <div className="about">
            <div className="contactsHeader">
              <h1>Biography</h1>
            </div>
            I am a goal-oriented, hardworking person who likes exploring new
            stuff. I am a full-stack engineer specialized in
            NodeJs/ExpressJs/NestJs and React. But I do have significant
            experience in Python/Flask/Django. I also have some interests in
            Java. I believe that I am a team player and I have spent the past
            two years working with different agile teams. Moreover, I am an Open
            Source enthusiast.
          </div>
        </div>
        <div className="detailsFooter">
          Got inspired? Copied the theme? Or do you just like the website? No
          problem, just buy me a beer and make me happy! PayPal - The safer,
          easier way to pay online!
        </div>
      </div>
    </div>
  );
};
Profile.propTypes = {
  prof: propTypes.func,
};
Profile.defaultProps = {
  prof: null,
};
export default Profile;
