import React from 'react';

const skills = [
  { skill: 'THML5', stars: '5' },
  { skill: 'THML5', stars: '5' },
  { skill: 'THML5', stars: '5' },
  { skill: 'THML5', stars: '5' },
];
const languages = [
  { language: 'THML5', stars: '5' },
  { language: 'THML5', stars: '5' },
  { language: 'THML5', stars: '5' },
  { language: 'THML5', stars: '5' },
];
const tools = [
  { tool: 'THML5', stars: '5' },
  { tool: 'THML5', stars: '5' },
  { tool: 'THML5', stars: '5' },
  { tool: 'THML5', stars: '5' },
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
      {languages.map((language, index) => (
        <div key={index} className="">
          <div>{language.language}</div>
          <div>{language.stars}</div>
        </div>
      ))}
    </div>
    <div className="abilityRatings">
      <div className="abilityRatingsHeader">Tools</div>
      {tools.map((tool, index) => (
        <div key={index} className="">
          <div>{tool.tool}</div>
          <div>{tool.stars}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Abilities;
