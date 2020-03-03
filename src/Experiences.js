import React from 'react';

const educations = [
  {
    school: 'Chebororwa Primary school',
    date: '1998- 2010',
    course: 'Primary education',
    courseDescription: 'Did basic things',
  },
  {
    school: 'Chebara High school',
    date: '2010- 2013',
    course: 'Mathematics,Physics,Chemistry,Geography,English,Kiswahili,History',
    courseDescription: 'High school education',
  },
  {
    school: 'Machakos university',
    date: '2014- 2019',
    course: 'Electrical and electronics engineering',
    courseDescription: 'Bsc electrical and electronics engineering',
  },
  {
    school: 'Andela',
    date: '2019',
    course: 'web development',
    courseDescription:
      'Participated in two andela bootcamps one in Nairobi and the other one in Kigali',
  },
];
const careers = [
  {
    institution: 'East Africa portland cement(Blue triangle)',
    date: '2018',
    role: 'Intern',
    roleDescription: 'Electrical engineer intern',
  },
  {
    institution: 'Self employed',
    date: '2019',
    role: 'Python and Javascript web developer',
    roleDescription: 'Web developer',
  },
  {
    institution: 'Andela',
    date: '2019- 2020',
    role: 'Trainee',
    roleDescription: 'Software development trainee at Andela',
  },
];
const Experiences = () => (
  <div className="experiences" id="experiences">
    <div className="experiencesContainer">
      <div>
        <div className="experiencesHeader">
          <h1>Experience</h1>
        </div>
        <div className="experiencesQuote">
          “Protons give an atom its identity, electrons its personality.” - Bill
          Bryson, A short history of nearly everything
        </div>
      </div>
      <div className="education">
        <div>
          <h1>Education</h1>
        </div>
      </div>

      {educations.map((education) => (
        <div key={education.date} className="education">
          <div>
            <div>{education.school}</div>
            <div>{education.date}</div>
          </div>
          <div>
            <div>{education.course}</div>
            <div>{education.courseDescription}</div>
          </div>
        </div>
      ))}
      <div className="career">
        <div>
          <h1>Career</h1>
        </div>
      </div>
      {careers.map((career) => (
        <div key={career.date} className="career">
          <div>
            <div>{career.institution}</div>
            <div>{career.date}</div>
          </div>
          <div>
            <div>{career.role}</div>
            <div>{career.roleDescription}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Experiences;
