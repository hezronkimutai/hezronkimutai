import React from 'react';

const Projects = () => (
  <section className="py-20 px-4" id="projects">
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r 
          from-white to-gray-100 bg-clip-text text-transparent 
          drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
          Projects & Work
        </h2>
        <p className="text-xl text-gray-100 max-w-3xl mx-auto 
          drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-slate-900/40 backdrop-blur-sm 
          rounded-lg p-4 border border-white/10">
          Explore my comprehensive portfolio of innovative solutions, from enterprise applications 
          to open-source contributions, and learn about my entrepreneurial initiatives.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        
        {/* LinkedIn Projects */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-8 border border-white/20 
          hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 
              flex items-center justify-center text-3xl mr-4">
              💼
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Professional Portfolio</h3>
              <p className="text-blue-300">LinkedIn Projects & Experience</p>
            </div>
          </div>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            Discover my complete professional journey, detailed project showcases, and industry recommendations 
            on LinkedIn. View live applications, technical implementations, and client testimonials.
          </p>
          
          <a
            href="https://www.linkedin.com/in/hezron-kimutai/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
              text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 
              transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          >
            🔗 View LinkedIn Portfolio
          </a>
        </div>

        {/* GitHub Projects */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-8 border border-white/20 
          hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 
              flex items-center justify-center text-3xl mr-4">
              📂
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Open Source Work</h3>
              <p className="text-purple-300">GitHub Repositories & Contributions</p>
            </div>
          </div>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            Explore my open-source contributions, personal projects, and code samples. 
            From NPM packages to full-stack applications, see the code behind the solutions.
          </p>
          
          <a
            href="https://github.com/hezronkimutai"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 
              text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 
              transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            📚 View GitHub Profile
          </a>
        </div>
      </div>

      {/* Initiatives Section */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          Entrepreneurial Initiatives
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LIF Community */}
          <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-8 border border-white/20 
            hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-green-500/20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 
                flex items-center justify-center text-2xl mr-4">
                🎓
              </div>
              <h4 className="text-xl font-bold text-white">LIF (Learning Is Fun)</h4>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              A community platform designed to make learning collaborative, playful, and intellectually rigorous. 
              An ecosystem where mentorship, experimentation, and debate happen in real-time—structured like chess, driven by curiosity.
            </p>
            
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/lifcommunity"
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 
                  text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 
                  transition-all duration-300 text-center"
              >
                🌐 Company Page
              </a>
              <a
                href="https://github.com/lifcommunity"
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-4 py-2 border border-white/20 text-white text-sm 
                  font-medium rounded-lg hover:bg-white/10 transition-all duration-300 text-center"
              >
                📂 GitHub
              </a>
            </div>
          </div>

          {/* HK Group */}
          <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-8 border border-white/20 
            hover:border-orange-500/50 transition-all duration-300 shadow-lg hover:shadow-orange-500/20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 
                flex items-center justify-center text-2xl mr-4">
                🏢
              </div>
              <h4 className="text-xl font-bold text-white">HK Group</h4>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              The execution layer where business happens. Ideas refined within LIF evolve into real products 
              and companies under the HK umbrella. We treat engineering, strategy, and go-to-market like a well-played game.
            </p>
            
            <div className="px-4 py-2 bg-orange-500/20 text-orange-300 text-sm 
              font-medium rounded-lg border border-orange-500/30 text-center">
              🚀 Coming Soon
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Projects Reference */}
      <div className="text-center bg-slate-900/40 backdrop-blur-sm rounded-xl p-8 border border-white/10">
        <h3 className="text-2xl font-bold text-white mb-4">
          Detailed Project Documentation
        </h3>
        <p className="text-gray-300 mb-6">
          For comprehensive project details, technical specifications, and implementation insights, 
          check out the detailed documentation in this repository.
        </p>
        <a
          href="https://github.com/hezronkimutai/hezronkimutai/blob/develop/Projects.md"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 
            text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 
            transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
        >
          📖 View Projects.md
        </a>
      </div>

      {/* Fun Section */}
      <div className="mt-16 text-center">
        <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-8 border border-white/20 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            Want to play chess? ♟️
          </h3>
          <p className="text-gray-300 mb-6">
            Strategy in code, strategy on the board. Challenge me to a game!
          </p>
          <a
            href="https://www.chess.com/member/hezronchelimo"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 
              text-white font-semibold rounded-lg hover:from-yellow-700 hover:to-orange-700 
              transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
          >
            🏆 Challenge on Chess.com
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Projects;