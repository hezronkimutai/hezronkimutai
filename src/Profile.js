import React from 'react';

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

const Profile = () => (
  <div className="profile" id="profile">
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
          I was born in Eldoret town in Kenya, Since I was young I have been
          playing with computers, I wrote my first computer program when I was
          10 I was born in Eldoret town in Kenya, Since I was young I have been
          playing with computers, I wrote my first computer program when I was
          10 I was born in Eldoret town in Kenya, Since I was young I have been
          playing with computers, I wrote my first computer program when I was
          10 I was born in Eldoret town in Kenya, Since I was young I have been
          playing with computers, I wrote my first computer program when I was
          10 I was born in Eldoret town in Kenya, Since I was young I have been
          playing with computers, I wrote my first computer program when I was
          10 I was born in Eldoret town in Kenya, Since I was young I have been
          playing with computers, I wrote my first computer program when I was
          10 I was born in Eldoret town in Kenya, Since I was young I have been
          playing with computers, I wrote my first computer program when I was
          10
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

export default Profile;
