import React from 'react';

const skills = [
  { skill: 'HTML5', stars: '5' },
  { skill: 'CSS3', stars: '5' },
  { skill: 'Javascript', stars: '5' },
  { skill: 'NodeJs', stars: '5' },
  { skill: 'Express', stars: '5' },
  { skill: 'Python', stars: '5' },
  { skill: 'Flask', stars: '5' },
  { skill: 'Django', stars: '5' },
  { skill: 'NestJs', stars: '5' },
  { skill: 'ReactJs', stars: '5' },
  { skill: 'SCSS', stars: '5' },
  { skill: 'SQL', stars: '5' },
  { skill: 'No SQL', stars: '5' },
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
  { tool: 'Docker', stars: '5' },
  { tool: 'Heroku', stars: '5' },
  { tool: 'Git & Github', stars: '5' },
  { tool: 'Code Climate', stars: '5' },
  { tool: 'Travis Ci', stars: '5' },
  { tool: 'Circle Ci', stars: '5' },
  { tool: 'Coveralls', stars: '5' },
  { tool: 'Postgres', stars: '5' },
  { tool: 'My sql', stars: '5' },
  { tool: 'Mongo db', stars: '5' },
  { tool: 'Amazon web service', stars: '5' },
  { tool: 'Docker', stars: '5' },
];

const Abilities = () => (
  <div className="abilities" id="abilities">
    <div className="abilitiesContainer">
      <div className="abilitiesHeader">
        <div>
          <h1>Abilities</h1>
        </div>
        {/* <div>“Life without knowledge is death in disguise.” - Talib Kweli</div> */}
      </div>
      <div className="abilityRatings">
        <div className="abilityRatingsHeader">
          <h2>Skills</h2>
        </div>
        {skills.map((skill) => (
          <div key={skill.skill}>
            <div>{skill.skill}</div>
            <div>{skill.stars}</div>
          </div>
        ))}
        <div className="abilityRatingsFooter">footer</div>
      </div>
      <div className="abilityRatings">
        <div className="abilityRatingsHeader">
          <h2>Languages</h2>
        </div>
        {languages.map((language) => (
          <div key={language.language}>
            <div>{language.language}</div>
            <div>{language.stars}</div>
          </div>
        ))}
      </div>
      <div className="abilityRatings">
        <div className="abilityRatingsHeader">
          <h2>Tools</h2>
        </div>
        {tools.map((tool) => (
          <div key={tool.tool}>
            <div>{tool.tool}</div>
            <div>{tool.stars}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Abilities;
