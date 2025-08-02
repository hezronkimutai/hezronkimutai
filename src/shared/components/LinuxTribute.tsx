import React from 'react';

const LinuxTribute: React.FC = () => {
  return (
    <div className="relative py-20 px-6 bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 overflow-hidden">
      {/* Background Terminal Effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="font-mono text-green-400 text-xs leading-relaxed whitespace-pre-wrap break-all">
          {`$ whoami
hezron@system:~$ uname -a
Linux inspiration 5.x.x #1 SMP PREEMPT Unix philosophy rocks
$ echo "Thanks Linus Torvalds for Linux!"
Thanks Linus Torvalds for Linux!
$ grep -r "elegance" /usr/src/linux/
Documentation/process/coding-style.rst: "Simplicity is the ultimate sophistication"
$ history | tail -5
  998  git clone https://github.com/torvalds/linux.git
  999  man unix
 1000  echo "Do one thing and do it well" | cowsay
 1001  ps aux | grep inspiration
 1002  uptime
$ █`}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            🐧 Standing on the Shoulders of Giants
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-mono">
            Deep appreciation for the foundation of modern computing
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Linus Torvalds */}
          <div className="group relative p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 hover:border-green-400/50 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="text-6xl mb-4 group-hover:animate-bounce">🧠</div>
              <h3 className="text-2xl font-bold text-green-400 mb-4">Linus Torvalds</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                The visionary who democratized operating systems. Creator of Linux and Git - 
                tools that revolutionized collaborative software development and powered the modern internet.
              </p>
              <blockquote className="text-green-300 italic font-mono text-sm border-l-2 border-green-400 pl-4">
                "Talk is cheap. Show me the code."
              </blockquote>
            </div>
          </div>

          {/* Unix Philosophy */}
          <div className="group relative p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 hover:border-blue-400/50 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="text-6xl mb-4 group-hover:animate-pulse">⚙️</div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Unix Philosophy</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Timeless design principles that shaped computing. The elegance of simplicity, 
                modularity, and composability continues to inspire clean architecture and efficient systems.
              </p>
              <blockquote className="text-blue-300 italic font-mono text-sm border-l-2 border-blue-400 pl-4">
                "Do one thing and do it well."
              </blockquote>
            </div>
          </div>

          {/* Open Source */}
          <div className="group relative p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 hover:border-purple-400/50 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="text-6xl mb-4 group-hover:animate-spin">🌍</div>
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Open Source Spirit</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                The collaborative movement that transforms individual brilliance into collective advancement. 
                From kernel development to enterprise solutions, proving humanity's capacity for shared innovation.
              </p>
              <blockquote className="text-purple-300 italic font-mono text-sm border-l-2 border-purple-400 pl-4">
                "Given enough eyeballs, all bugs are shallow."
              </blockquote>
            </div>
          </div>
        </div>

        {/* Terminal Command Showcase */}
        <div className="bg-black/80 rounded-2xl border border-gray-600 p-6 font-mono text-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-4 text-gray-400">hezron@inspiration:~</span>
          </div>
          <div className="space-y-2">
            <div className="text-green-400">
              <span className="text-gray-400">$</span> echo "Inspiration drives innovation"
            </div>
            <div className="text-white pl-2">Inspiration drives innovation</div>
            <div className="text-green-400">
              <span className="text-gray-400">$</span> grep -i "elegance\|simplicity" /philosophy/unix.txt
            </div>
            <div className="text-white pl-2">The beauty lies in simplicity and elegance of design</div>
            <div className="text-green-400">
              <span className="text-gray-400">$</span> uptime --since "1991-08-25" # Linux birthday
            </div>
            <div className="text-white pl-2">up 33 years, transforming the world one kernel at a time</div>
            <div className="text-green-400 animate-pulse">
              <span className="text-gray-400">$</span> █
            </div>
          </div>
        </div>

        {/* Appreciation Message */}
        <div className="mt-16 text-center">
          <p className="text-2xl md:text-3xl font-semibold text-gray-200 mb-4">
            Thank you to all the pioneers who built the foundation we stand on today 🙏
          </p>
          <p className="text-lg text-gray-400 font-mono">
            From Bell Labs to Helsinki, from terminals to clouds - the journey continues...
          </p>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LinuxTribute;
