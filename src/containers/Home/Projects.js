import React from 'react';

const projects = [
  {
    name: 'Tikiti - Event Ticketing Platform',
    description: 'Modern event management and ticketing platform with real-time booking, payment processing, and analytics dashboard.',
    link: 'https://ticketing-web-three.vercel.app/',
    github: 'https://github.com/hezronkimutai/tikiti',
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'Stripe API', 'AWS'],
    icon: '🎫',
    color: 'from-purple-500 to-pink-500',
    status: 'Live'
  },
  {
    name: 'Merigo Round - Gaming Platform',
    description: 'Interactive gaming platform with real-time multiplayer functionality, user authentication, and leaderboards.',
    link: 'https://web-one-khaki.vercel.app/',
    github: 'https://github.com/hezronkimutai/merigo-round',
    tech: ['Vue.js', 'NestJS', 'Socket.io', 'MongoDB', 'Redis'],
    icon: '🎮',
    color: 'from-blue-500 to-cyan-500',
    status: 'Live'
  },
  {
    name: 'Chess Game Platform',
    description: 'Real-time chess game with AI opponent, move validation, game history, and multiplayer support.',
    link: 'https://chessdau.onrender.com/',
    github: 'https://github.com/hezronkimutai/chess',
    tech: ['React.js', 'Express.js', 'Socket.io', 'Chess.js', 'Node.js'],
    icon: '♟️',
    color: 'from-green-500 to-emerald-500',
    status: 'Live'
  },
  {
    name: 'Custom React Pages - NPM Package',
    description: 'Open-source NPM package that simplifies pagination implementation in React applications with customizable components.',
    link: 'https://www.npmjs.com/package/custom-react-pages',
    github: 'https://github.com/hezronkimutai/custom-react-pages',
    tech: ['React.js', 'TypeScript', 'NPM', 'Jest', 'Rollup'],
    icon: '📦',
    color: 'from-orange-500 to-red-500',
    status: 'Published'
  },
  {
    name: 'Node.js API CLI Tool',
    description: 'Command-line interface tool for scaffolding Node.js APIs with best practices, authentication, and database integration.',
    link: 'https://www.npmjs.com/package/nodejs-api-cli',
    github: 'https://github.com/hezronkimutai/nodejs-api-cli',
    tech: ['Node.js', 'Commander.js', 'Express.js', 'MongoDB', 'JWT'],
    icon: '⚡',
    color: 'from-indigo-500 to-purple-500',
    status: 'Published'
  },
  {
    name: 'Chally.com - Challenge Platform',
    description: 'Serverless web application for creating and managing coding challenges with automated testing and scoring.',
    link: 'https://chally.com',
    tech: ['AWS Lambda', 'DynamoDB', 'React.js', 'API Gateway', 'CloudFront'],
    icon: '🏆',
    color: 'from-teal-500 to-blue-500',
    status: 'Enterprise'
  }
];

const Projects = () => (
  <section className="py-20 px-4" id="projects">
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r 
          from-white to-gray-300 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A showcase of innovative solutions, from enterprise applications to open-source 
          contributions that demonstrate technical expertise and problem-solving skills.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden 
              border border-white/10 hover:border-white/20 transition-all duration-300
              hover:transform hover:scale-105"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {/* Project Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${project.color} 
                  flex items-center justify-center text-2xl`}>
                  {project.icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Live' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                  project.status === 'Published' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                  'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                {project.name}
              </h3>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Links */}
            <div className="p-6 bg-white/5">
              <div className="flex space-x-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 
                      text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 
                      transition-all duration-300 text-center"
                  >
                    🌐 Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-4 py-2 border border-white/20 text-white text-sm 
                      font-medium rounded-lg hover:bg-white/10 transition-all duration-300 text-center"
                  >
                    📂 Code
                  </a>
                )}
              </div>
            </div>

            {/* Hover Effect */}
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${project.color} 
              opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
          </div>
        ))}
      </div>

      {/* Open Source Contributions */}
      <div className="mt-20 text-center">
        <h3 className="text-3xl font-bold text-white mb-8">
          Open Source Contributions
        </h3>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">15+</div>
              <div className="text-gray-300">Open Source Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-gray-300">GitHub Contributions</div>
            </div>
          </div>
          <p className="text-gray-300 mt-6">
            Active contributor to the open-source community with focus on developer tools, 
            React components, and Node.js utilities.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Projects;