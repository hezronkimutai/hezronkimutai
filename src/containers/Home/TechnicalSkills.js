import React from 'react';

const TechnicalSkills = () => {
  const coreValues = [
    {
      title: 'Strategic Thinking',
      icon: '🎯',
      description: 'Approaching every challenge with a deep understanding of business context, user needs, and long-term implications.',
      philosophy: 'Solutions that create lasting value',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Adaptive Excellence',
      icon: '🌟',
      description: 'Embracing change and uncertainty as opportunities to innovate and deliver exceptional outcomes.',
      philosophy: 'Quality that evolves with requirements',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Systems Mastery',
      icon: '⚡',
      description: 'Understanding complex interdependencies and designing elegant solutions that scale gracefully.',
      philosophy: 'Simplicity in complexity',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Collaborative Impact',
      icon: '🤝',
      description: 'Building bridges between technical possibility and human potential through thoughtful engineering.',
      philosophy: 'Technology that empowers people',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const mindsetPrinciples = [
    {
      principle: 'Curiosity-Driven',
      description: 'Constant learning and exploration of new possibilities.',
      icon: '🔍'
    },
    {
      principle: 'Purpose-Oriented',
      description: 'Every solution serves a meaningful objective.',
      icon: '🎪'
    },
    {
      principle: 'Future-Minded',
      description: 'Building for tomorrow while solving today.',
      icon: '🚀'
    },
    {
      principle: 'Human-Centered',
      description: 'Technology as a tool for human flourishing.',
      icon: '💡'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r 
            from-white to-gray-100 bg-clip-text text-transparent 
            drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
            Engineering Mindset
          </h2>
          <p className="text-xl text-gray-100 max-w-4xl mx-auto 
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-slate-900/40 backdrop-blur-sm 
            rounded-lg p-6 border border-white/10 leading-relaxed">
            Great engineering isn't about mastering tools—it's about understanding problems deeply, 
            thinking systemically, and crafting solutions that create genuine value. My approach 
            centers on strategic thinking, adaptive learning, and building systems that serve human potential.
          </p>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {coreValues.map((value, index) => (
            <div
              key={value.title}
              className="group relative bg-slate-900/60 backdrop-blur-md rounded-xl p-8 
                border border-white/20 hover:border-white/30 transition-all duration-300
                hover:transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Value Header */}
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${value.color} 
                  flex items-center justify-center text-3xl mr-6`}>
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white drop-shadow-sm">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 italic text-sm">
                    {value.philosophy}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed text-lg">
                {value.description}
              </p>

              {/* Hover Effect */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${value.color} 
                opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        {/* Mindset Principles */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            Core Principles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mindsetPrinciples.map((principle, index) => (
              <div
                key={principle.principle}
                className="bg-slate-900/60 backdrop-blur-md rounded-xl p-6 border border-white/20 
                  hover:border-purple-500/50 transition-all duration-300 text-center group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {principle.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-3">
                  {principle.principle}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Statement */}
        <div className="text-center bg-slate-900/40 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">
            Engineering Philosophy
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              "I believe engineering is fundamentally about understanding—understanding problems, 
              understanding people, understanding systems. The best solutions emerge not from 
              technical prowess alone, but from the intersection of deep thinking, strategic planning, 
              and genuine care for the outcomes we create."
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-lg p-6 text-left">
                <h4 className="text-xl font-bold text-white mb-3">💭 My Approach</h4>
                <p className="text-gray-300 leading-relaxed">
                  Every project begins with questions: What problem are we really solving? 
                  Who benefits? How does this fit into the larger ecosystem? The answers guide 
                  every technical decision.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 text-left">
                <h4 className="text-xl font-bold text-white mb-3">🎯 My Focus</h4>
                <p className="text-gray-300 leading-relaxed">
                  Building systems that don't just work today, but adapt and evolve. 
                  Creating value that compounds over time. Enabling teams and businesses 
                  to achieve more than they thought possible.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
              <p className="text-purple-200 font-medium">
                "The intersection of learning, systems, and entrepreneurship is where innovation happens."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;