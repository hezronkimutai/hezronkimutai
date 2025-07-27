import React from 'react';

const TechnicalSkills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: '💻',
      skills: ['Golang', 'Python', 'JavaScript', 'Java', 'TypeScript', 'C#', 'C++'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Frontend',
      icon: '🎨',
      skills: ['React.js', 'Vue.js', 'React Native', 'Flutter', 'Next.js', 'Tailwind CSS'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Backend',
      icon: '⚙️',
      skills: ['Node.js', 'Express.js', 'NestJS', 'Spring Boot', '.NET', 'GraphQL'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Cloud & DevOps',
      icon: '☁️',
      skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Databases',
      icon: '🗄️',
      skills: ['PostgreSQL', 'MongoDB', 'DynamoDB', 'Redis', 'MySQL'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Tools & Technologies',
      icon: '🛠️',
      skills: ['Git', 'GRPC/Protobuf', 'Datadog', 'Grafana', 'RabbitMQ', 'Shopify API'],
      color: 'from-teal-500 to-blue-500'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r 
            from-white to-gray-300 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Proficient in modern technologies and frameworks for building scalable, 
            high-performance applications and distributed systems.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 
                border border-white/10 hover:border-white/20 transition-all duration-300
                hover:transform hover:scale-105"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} 
                  flex items-center justify-center text-2xl mr-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between p-3 rounded-lg 
                      bg-white/5 hover:bg-white/10 transition-all duration-200"
                    style={{
                      animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s`
                    }}
                  >
                    <span className="text-gray-300 font-medium">{skill}</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < 4 ? `bg-gradient-to-r ${category.color}` : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hover Effect */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${category.color} 
                opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        {/* Architecture & Methodologies */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            Architecture & Methodologies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Microservices Architecture',
              'Event-Driven Systems', 
              'Serverless Computing',
              'Test-Driven Development (TDD)',
              'Agile Development',
              'System Optimization'
            ].map((methodology) => (
              <span
                key={methodology}
                className="px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 
                  rounded-full text-purple-200 border border-purple-500/30 
                  hover:border-purple-400 transition-all duration-300"
              >
                {methodology}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;