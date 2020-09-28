import React from 'react';
import { CallToactionBtn } from './LandingDiv';

// backgroundColor: '#DEECF7'

const WhyMe = () => (
  <div className="" id="">
    <div style={{ }} className="mx-auto py-8">
      <h1
        data-aos="flip-right"
        className=" mx-auto text-4xl text-center font-bold"
      >
        WHY ME?
      </h1>
      <div style={{ }} className="mx-auto w-11/12 flex flex-row">
        <img className="whyMeLeft h-48  my-auto" src="https://res.cloudinary.com/hezzie/image/upload/v1600969619/imageedit_41_7430976344_lijyjt.png" alt="hezronKimutai" />
        <div className="whyMeRight">
          <h3
            className="text-l"
            data-aos="fade-left"
          >
            Over the years, I have acquired relevant skills and experience,
            which I shall bring to your organization.
            I have also worked tirelessly on my
            communication abilities and teamwork
            skills, which I will put to use in my future career,
            which would be in your organization if I am selected for the position.
            I have given my 100% effort in my past
            companies, and this has enabled me to
            recognize my capabilities and limitations.
            If I channelize them further, they will
            bring fruitful results to me and also to your esteemed organization.
          </h3>
          <CallToactionBtn className="   text-2xl font-semibold m-1 p-3 bg-blue-700 rounded text-gray-300 delay-150 duration-300 ease-in-out " onClick={() => 0} displayText="HIRE ME" />
        </div>
      </div>
    </div>

  </div>
);

export default WhyMe;
