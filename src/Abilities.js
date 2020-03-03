import React from 'react';

const skills = [
  { skill: 'THML5', stars: '5' },
  { skill: 'THML5', stars: '5' },
  { skill: 'THML5', stars: '5' },
  { skill: 'THML5', stars: '5' },
];
const languages = [
  { skill: 'THML5', stars: '5' },
  { skill: 'THML5', stars: '5' },
  { skill: 'THML5', stars: '5' },
  { skill: 'THML5', stars: '5' },
];
const tools = [
  { skill: 'THML5', stars: '5' },
  { skill: 'THML5', stars: '5' },
  { skill: 'THML5', stars: '5' },
  { skill: 'THML5', stars: '5' },
];

const Abilities = () => (
  <div className="abilities">
    <div className="abilitiesHeader">
      <div>Abilities</div>
      “Life without knowledge is death in disguise.” - Talib Kweli
    </div>
    <div className="abilityRatings">
      <div className="abilityRatingsHeader">Skills</div>
      {skills.map((skill, index) => (
        <div key={index} className="">
          <div>{skill.skill}</div>
          <div>{skill.stars}</div>
        </div>
      ))}
      <div className="abilityRatingsFooter">footer</div>
    </div>
    <div className="abilityRatings">
      <div className="abilityRatingsHeader">Languages</div>
      {languages.map((skill, index) => (
        <div key={index} className="">
          <div>{skill.skill}</div>
          <div>{skill.stars}</div>
        </div>
      ))}
    </div>
    <div className="abilityRatings">
      <div className="abilityRatingsHeader">Tools</div>
      {tools.map((skill, index) => (
        <div key={index} className="">
          <div>{skill.skill}</div>
          <div>{skill.stars}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Abilities;
