import React from 'react';

const educations = [{
  school: 'Chebara High school',
  date: '2010- 2013',
  course: 'Mathematics',
  courseDescription: 'Did mathematics',
}, {
  school: 'Chebara High school',
  date: '2013- 2019',
  course: 'Mathematics',
  courseDescription: 'Did mathematics',
}, {
  school: 'Chebara High school',
  date: '2019- 2020',
  course: 'Mathematics',
  courseDescription: 'Did mathematics',
}];
const careers = [{
  institution: 'Chebara High school',
  date: '2011- 2013',
  role: 'Mathematics',
  roleDescription: 'Did mathematics',
}, {
  institution: 'Chebara High school',
  date: '2014- 2015',
  role: 'Mathematics',
  roleDescription: 'Did mathematics',
}, {
  institution: 'Chebara High school',
  date: '2015- 2019',
  role: 'Mathematics',
  roleDescription: 'Did mathematics',
}];
const Experiences = () => (

  <div className="experiences">
    <div>
      <div>Experiences</div>
      <div>
          “Protons give an atom its identity, electrons its personality.” - Bill
          Bryson, A short history of nearly everything
      </div>
    </div>
    <div className="education">
      <div>Education</div>
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
      <div>Career</div>
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

);

export default Experiences;
