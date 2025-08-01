import React from 'react';

const Experiences: React.FC = () => (
  <section className="py-20 px-4" id="experience">
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
          A comprehensive journey of building scalable solutions, optimizing systems, and leading 
          development teams across various industries and technologies.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-12">
        
        {/* LinkedIn Experience Link */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-8 border border-white/20 
          hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 text-center">
          
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 
              flex items-center justify-center text-4xl mr-6">
              💼
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold text-white">Professional Journey</h3>
              <p className="text-blue-300 text-lg">Detailed Experience & Recommendations</p>
            </div>
          </div>
          
          <p className="text-gray-300 mb-8 leading-relaxed text-lg">
            Explore my complete professional timeline on LinkedIn, featuring detailed role descriptions, 
            key achievements, technical projects, and industry recommendations from colleagues and clients.
          </p>

          {/* Experience Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-400">6+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-400">10+</div>
              <div className="text-gray-300">Companies Worked</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-3xl font-bold text-purple-400">50+</div>
              <div className="text-gray-300">Projects Delivered</div>
            </div>
          </div>
          
          <a
            href="https://www.linkedin.com/in/hezron-kimutai/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 
              text-white text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 
              transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          >
            🔗 View Complete Experience on LinkedIn
          </a>
        </div>
      </div>

      {/* Key Expertise Areas */}
      <div className="mb-12">
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          Key Expertise Areas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-6 border border-white/20 
            hover:border-purple-500/50 transition-all duration-300 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h4 className="text-lg font-bold text-white mb-2">Fullstack Development</h4>
            <p className="text-gray-300 text-sm">React, Node.js, .NET, Flutter</p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-6 border border-white/20 
            hover:border-blue-500/50 transition-all duration-300 text-center">
            <div className="text-4xl mb-4">☁️</div>
            <h4 className="text-lg font-bold text-white mb-2">Cloud Architecture</h4>
            <p className="text-gray-300 text-sm">AWS, Serverless, Microservices</p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-6 border border-white/20 
            hover:border-green-500/50 transition-all duration-300 text-center">
            <div className="text-4xl mb-4">📱</div>
            <h4 className="text-lg font-bold text-white mb-2">Mobile Development</h4>
            <p className="text-gray-300 text-sm">React Native, Flutter, iOS/Android</p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-6 border border-white/20 
            hover:border-orange-500/50 transition-all duration-300 text-center">
            <div className="text-4xl mb-4">👥</div>
            <h4 className="text-lg font-bold text-white mb-2">Team Leadership</h4>
            <p className="text-gray-300 text-sm">Mentoring, Code Reviews, Architecture</p>
          </div>
        </div>
      </div>

      {/* Emerging Tech Interests */}
      <div className="mb-12">
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          Expanding Into Physical Computing
        </h3>
        
        <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
              Leveraging my software engineering foundation to explore hardware integration, 
              IoT systems, and the exciting frontier where digital meets physical.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 text-center">
              <div className="text-4xl mb-4">🔌</div>
              <h4 className="text-lg font-bold text-white mb-2">IoT Development</h4>
              <p className="text-gray-300 text-sm">Arduino, ESP32, Sensor Networks</p>
              <div className="mt-3 text-xs text-blue-300">Beginner • Exploring</div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-green-500/30 transition-all duration-300 text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="text-lg font-bold text-white mb-2">Embedded Programming</h4>
              <p className="text-gray-300 text-sm">Microcontrollers, Firmware, C/C++</p>
              <div className="mt-3 text-xs text-green-300">Learning • Passionate</div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-orange-500/30 transition-all duration-300 text-center">
              <div className="text-4xl mb-4">⚙️</div>
              <h4 className="text-lg font-bold text-white mb-2">Control Systems</h4>
              <p className="text-gray-300 text-sm">Automation, PID, Industrial IoT</p>
              <div className="mt-3 text-xs text-orange-300">Interested • Studying</div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="text-lg font-bold text-white mb-2">Electronics Design</h4>
              <p className="text-gray-300 text-sm">Circuits, PCB, Hardware Integration</p>
              <div className="mt-3 text-xs text-purple-300">Novice • Curious</div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
            <h4 className="text-lg font-bold text-white mb-3 text-center">🎯 Learning Roadmap</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <h5 className="font-semibold text-green-200 mb-2">Phase 1: Foundations</h5>
                <p className="text-gray-300">Arduino basics, sensor integration, simple IoT projects</p>
              </div>
              <div className="text-center">
                <h5 className="font-semibold text-blue-200 mb-2">Phase 2: Integration</h5>
                <p className="text-gray-300">Cloud connectivity, real-time data processing, mobile controls</p>
              </div>
              <div className="text-center">
                <h5 className="font-semibold text-purple-200 mb-2">Phase 3: Innovation</h5>
                <p className="text-gray-300">Custom PCBs, advanced automation, full-stack IoT solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Highlights */}
      <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-8 border border-white/10">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Recent Career Highlights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-bold text-white mb-3 flex items-center">
              <span className="text-green-400 mr-2">🥛</span>
              Fresh Networks (Current)
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Leading fullstack development for dairy technology solutions, optimizing systems for enhanced operational efficiency 
              using cutting-edge technologies like AWS, Golang, and React.js.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-3 flex items-center">
              <span className="text-blue-400 mr-2">🏛️</span>
              MOMI Foundation
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Developed scalable web applications using .NET, Flutter, and Vue.js, integrating AWS Lambda and DynamoDB 
              for optimized performance and cost efficiency.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-300 text-sm">
            For detailed role descriptions, achievements, and professional recommendations
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Experiences;
