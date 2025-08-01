import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactMethod {
  icon: string;
  title: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create mailto link with form data
    const mailtoLink = `mailto:hezronchelimo.hc@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const contactMethods: ContactMethod[] = [
    {
      icon: '📧',
      title: 'Email',
      value: 'hezronchelimo.hc@gmail.com',
      link: 'mailto:hezronchelimo.hc@gmail.com',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+254 790 717 147',
      link: 'tel:+254790717147',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'hezron-kimutai',
      link: 'https://www.linkedin.com/in/hezron-kimutai',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🔗',
      title: 'GitHub',
      value: 'hezronkimutai',
      link: 'https://github.com/hezronkimutai',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const attributes = [
    {
      icon: '🎯',
      title: 'Client-focused',
      description: 'Building lasting relationships through exceptional service'
    },
    {
      icon: '🔧',
      title: 'Problem Solver',
      description: 'Strong debugging and optimization skills'
    },
    {
      icon: '🚀',
      title: 'Tech Enthusiast',
      description: 'Passionate about AI and scalable architecture'
    },
    {
      icon: '💬',
      title: 'Great Communicator',
      description: 'Excellent leadership and collaboration skills'
    },
    {
      icon: '⚡',
      title: 'Adaptable',
      description: 'Thrives in fast-paced, Agile environments'
    },
    {
      icon: '🎓',
      title: 'Continuous Learner',
      description: 'Always exploring new technologies and methodologies'
    }
  ];

  return (
    <section className="py-20 px-4" id="contact">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r 
            from-white to-gray-100 bg-clip-text text-transparent 
            drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto 
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-slate-900/40 backdrop-blur-sm 
            rounded-lg p-4 border border-white/10">
            Ready to build something amazing? I'm available for new opportunities 
            and exciting projects. Let's discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-sm">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 
                      transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 
                      transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                    text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 
                    transition-colors duration-300"
                  placeholder="Project discussion, collaboration, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                    text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 
                    transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project or how we can work together..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 
                  text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 
                  transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                📧 Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & Attributes */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.title}
                    href={method.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 
                      border border-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${method.color} 
                      flex items-center justify-center text-2xl mr-4 group-hover:scale-110 
                      transition-transform duration-300`}>
                      {method.icon}
                    </div>
                    <div>
                      <div className="text-white font-medium">{method.title}</div>
                      <div className="text-gray-300 text-sm">{method.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Attributes & Strengths */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Why Work With Me</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {attributes.map((attr) => (
                  <div
                    key={attr.title}
                    className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 
                      transition-all duration-300"
                  >
                    <div className="text-2xl mb-2">{attr.icon}</div>
                    <div className="text-white font-medium mb-1">{attr.title}</div>
                    <div className="text-gray-400 text-sm">{attr.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Availability Status */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 
            rounded-full border border-green-500/30">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-green-300 font-medium">
              Available for new opportunities
            </span>
          </div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Currently accepting new projects and collaborations. 
            Response time: Usually within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;