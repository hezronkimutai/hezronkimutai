import React from 'react';
import { CallToactionBtn } from './LandingDiv';

const WhyMe = () => (
  <div className="py-6">
    <div className="container mx-auto px-4 ">
      <div className="flex items-center justify-center">
        {/* <img
          className="h-48 w-48 rounded-full shadow-lg mr-8"
          src="https://res.cloudinary.com/hezzie/image/upload/v1720881850/HEEEEEEEEEEEEE_ljnqek.png"
          alt="hezronKimutai"
        /> */}
        <div className="flex-1  shadow-lg rounded-lg p-8">
          <p className="text-xl leading-relaxed">
            Over the years, I have acquired relevant skills and experience,
            which I shall bring to your organization. I have also worked
            tirelessly on my communication abilities and teamwork skills, which
            I will put to use in my future career, which would be in your
            organization if I am selected for the position. I have given my
            100% effort in my past companies, and this has enabled me to
            recognize my capabilities and limitations. If I channelize them
            further, they will bring fruitful results to me and also to your
            esteemed organization.
          </p>
          <CallToactionBtn
            className="mt-4 bg-blue-700 hover:bg-blue-600 text-gray-300 py-2 px-6 rounded-full text-xl font-semibold transition duration-300 ease-in-out"
            onClick={() => 0}
            displayText="HIRE ME"
          />
        </div>
      </div>
    </div>
  </div>
);

export default WhyMe;
