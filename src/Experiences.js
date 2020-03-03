import React from 'react';

const educations = [{
  school: 'Chebara High school',
  date: '2010- 2013',
  course: 'Mathematics',
  courseDescription: 'Did mathematics',
}, {
  school: 'Chebara High school',
  date: '2010- 2013',
  course: 'Mathematics',
  courseDescription: 'Did mathematics',
}, {
  school: 'Chebara High school',
  date: '2010- 2013',
  course: 'Mathematics',
  courseDescription: 'Did mathematics',
}];
const careers = [{
  institution: 'Chebara High school',
  date: '2010- 2013',
  role: 'Mathematics',
  roleDescription: 'Did mathematics',
}, {
  institution: 'Chebara High school',
  date: '2010- 2013',
  role: 'Mathematics',
  roleDescription: 'Did mathematics',
}, {
  institution: 'Chebara High school',
  date: '2010- 2013',
  role: 'Mathematics',
  roleDescription: 'Did mathematics',
}];
const Experiences = () => (

  <div className="experiences">
    <div className="">
      <div className="">Experiences</div>
      <div className="">
          “Protons give an atom its identity, electrons its personality.” - Bill
          Bryson, A short history of nearly everything
      </div>
    </div>
    <div className="education">
      <div className="">Education</div>
    </div>

    {educations.map((education, index) => (
      <div key={index} className="education">
        <div className="">
          <div className="">{education.school}</div>
          <div className="">{education.date}</div>
        </div>
        <div className="">
          <div className="">{education.course}</div>
          <div className="">{education.courseDescription}</div>
        </div>
      </div>
    ))}
    <div className="career">
      <div className="">Career</div>
    </div>
    {careers.map((career, index) => (
      <div key={index} className="career">
        <div className="">
          <div className="">{career.institution}</div>
          <div className="">{career.date}</div>
        </div>
        <div className="">
          <div className="">{career.role}</div>
          <div className="">{career.roleDescription}</div>
        </div>
      </div>
    ))}
  </div>

);

export default Experiences;
