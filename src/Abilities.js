import React from 'react';

const skills = [
  { skill: 'THML5', stars: '5' },
  { skill: 'THffML5', stars: '5' },
  { skill: 'THssML5', stars: '5' },
  { skill: 'f', stars: '5' },
];
const languages = [
  { language: 'English', stars: '5' },
  { language: 'Kiswahili', stars: '5' },
  { language: 'Kalenjin', stars: '5' },
];
const tools = [
  { tool: 'Figma', stars: '5' },
  { tool: 'Vs code', stars: '5' },
  { tool: 'mac', stars: '5' },
  { tool: 'Linux', stars: '5' },
];

const Abilities = () => (
  <div className="abilities">
    <div className="abilitiesHeader">
      <div>Abilities</div>
      “Life without knowledge is death in disguise.” - Talib Kweli
    </div>
    <div className="abilityRatings">
      <div className="abilityRatingsHeader">Skills</div>
      {skills.map((skill) => (
        <div key={skill.skill}>
          <div>{skill.skill}</div>
          <div>{skill.stars}</div>
        </div>
      ))}
      <div className="abilityRatingsFooter">footer</div>
    </div>
    <div className="abilityRatings">
      <div className="abilityRatingsHeader">Languages</div>
      {languages.map((language) => (
        <div key={language.language}>
          <div>{language.language}</div>
          <div>{language.stars}</div>
        </div>
      ))}
    </div>
    <div className="abilityRatings">
      <div className="abilityRatingsHeader">Tools</div>
      {tools.map((tool) => (
        <div key={tool.tool}>
          <div>{tool.tool}</div>
          <div>{tool.stars}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Abilities;
