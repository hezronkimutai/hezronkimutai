import React from 'react';

const experiences = [
  {
    company: 'Fresh Networks',
    position: 'Fullstack Software Engineer',
    location: 'Nairobi, Kenya',
    period: 'January 2025 – Present',
    type: 'Full-time',
    icon: '🥛',
    color: 'from-green-500 to-emerald-500',
    achievements: [
      'Designing and developing scalable software solutions to enhance dairy technology operations',
      'Optimizing system performance and automating business processes',
      'Implementing secure, high-availability applications using AWS, Golang, and React.js',
      'Collaborating with cross-functional teams to improve user experience and operational efficiency'
    ]
  },
  {
    company: 'MOMI Foundation',
    position: 'Senior Full Stack Developer',
    location: 'Nairobi, Kenya',
    period: 'April 2024 – January 2025',
    type: 'Contract',
    icon: '🏛️',
    color: 'from-blue-500 to-cyan-500',
    achievements: [
      'Developed scalable and responsive web applications using .NET, Flutter, Vue.js, and AWS',
      'Built and optimized RESTful APIs and GraphQL endpoints for seamless data access',
      'Ensured cross-platform compatibility for Android and iOS through rigorous testing',
      'Integrated AWS Lambda, DynamoDB, and CI/CD pipelines for optimized performance and cost efficiency'
    ]
  },
  {
    company: 'Valet Seller',
    position: 'Full Stack Developer',
    location: 'Remote',
    period: 'July 2023 – February 2024',
    type: 'Full-time',
    icon: '🛒',
    color: 'from-purple-500 to-pink-500',
    achievements: [
      'Developed scalable microservices using NestJS and React.js',
      'Integrated Shopify API, enabling seamless e-commerce platform functionality',
      'Mentored junior engineers, conducting code reviews and fostering technical excellence',
      'Built and deployed custom mobile applications using Flutter'
    ]
  },
  {
    company: 'TheJitu',
    position: 'Software Engineer',
    location: 'Nairobi, Kenya',
    period: 'March 2020 – 2023',
    type: 'Full-time',
    icon: '🎯',
    color: 'from-orange-500 to-red-500',
    achievements: [
      'Led development on chally.com, implementing AWS serverless architecture',
      'Enhanced scalability and cost-efficiency through performance optimization',
      'Conducted performance tuning and debugging to optimize system response times',
      'Collaborated with cross-functional teams to enhance application functionality'
    ]
  },
  {
    company: 'PickMeUp',
    position: 'Software Engineer',
    location: 'Remote',
    period: 'June 2020 – September 2020',
    type: 'Contract',
    icon: '🚗',
    color: 'from-indigo-500 to-purple-500',
    achievements: [
      'Built microservices-based backend in TypeScript with modular, scalable architecture',
      'Implemented Redis and RabbitMQ for real-time messaging and data synchronization',
      'Designed user-friendly interfaces and integrated Google Maps API for location tracking',
      'Optimized system performance for real-time ride-sharing functionality'
    ]
  },
  {
    company: 'Andela',
    position: 'Software Engineer (React Native)',
    location: 'Remote',
    period: 'June 2019 – April 2020',
    type: 'Full-time',
    icon: '📱',
    color: 'from-teal-500 to-blue-500',
    achievements: [
      'Developed cross-platform mobile applications using React Native',
      'Focused on real-time collaboration features for e-learning applications',
      'Engineered backend APIs for seamless low-latency data processing',
      'Maintained high code quality standards and performance optimization'
    ]
  }
];

const Experiences = () => (
  <section className="py-20 px-4">
    <div className="max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r 
          from-white to-gray-100 bg-clip-text text-transparent 
          drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
          Professional Experience
        </h2>
        <p className="text-xl text-gray-100 max-w-3xl mx-auto 
          drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-slate-900/40 backdrop-blur-sm 
          rounded-lg p-4 border border-white/10">
          A journey of building scalable solutions, optimizing systems, and leading 
          development teams across various industries and technologies.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 
          w-1 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 rounded-full" />

        {/* Experience Items */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Node */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 
                w-8 h-8 rounded-full bg-white border-4 border-purple-500 z-10" />

              {/* Content Card */}
              <div className={`ml-16 md:ml-0 md:w-5/12 ${
                index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
              }`}>
                <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-6 border border-white/20 
                  hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105 
                  shadow-lg hover:shadow-xl">
                  
                  {/* Company Header */}
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${exp.color} 
                      flex items-center justify-center text-2xl mr-4`}>
                      {exp.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white drop-shadow-sm">{exp.company}</h3>
                      <p className="text-purple-200 font-medium drop-shadow-sm">{exp.position}</p>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="mb-4 space-y-1">
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="mr-2">📍</span>
                      {exp.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="mr-2">📅</span>
                      {exp.period}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="mr-2">💼</span>
                      {exp.type}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start">
                        <span className="text-purple-400 mr-2 mt-1">▸</span>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="mt-20 text-center">
        <h3 className="text-3xl font-bold text-white mb-8">Education</h3>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 
              flex items-center justify-center text-3xl mr-6">
              🎓
            </div>
            <div className="text-left">
              <h4 className="text-2xl font-bold text-white">Bachelor of Science</h4>
              <p className="text-purple-300 font-medium">Electrical Engineering</p>
            </div>
          </div>
          <div className="space-y-2 text-gray-300">
            <p><span className="text-gray-400">Institution:</span> Machakos University, Kenya</p>
            <p><span className="text-gray-400">Graduated:</span> 2019</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Experiences;
