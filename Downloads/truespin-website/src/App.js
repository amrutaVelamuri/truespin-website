import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Zap, Target, Users, TrendingUp, Cpu, DollarSign, Briefcase, Upload } from 'lucide-react';

export default function TrueSpinWebsite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible) {
          setVisibleSections(prev => ({...prev, [section.id]: true}));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pages = [
    { id: 'home', label: 'Home' },
    { id: 'technology', label: 'Technology' },
    { id: 'applications', label: 'Applications' },
    { id: 'team', label: 'Team' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => navigateTo('home')} className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="text-white" size={24} />
              </div>
              <span className={`text-xl font-bold ${scrolled || currentPage !== 'home' ? 'text-white' : 'text-slate-900'}`}>TrueSpin</span>
            </button>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => navigateTo(page.id)}
                  className={`transition-colors font-medium ${
                    currentPage === page.id 
                      ? 'text-cyan-400' 
                      : scrolled || currentPage !== 'home' ? 'text-slate-200 hover:text-cyan-400' : 'text-slate-700 hover:text-cyan-500'
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className={scrolled || currentPage !== 'home' ? 'text-white' : 'text-slate-900'} /> : <Menu className={scrolled || currentPage !== 'home' ? 'text-white' : 'text-slate-900'} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => navigateTo(page.id)}
                className={`block w-full text-left px-4 py-3 transition-colors ${
                  currentPage === page.id ? 'bg-slate-800 text-cyan-400' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                {page.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Page Content */}
      {currentPage === 'home' && <HomePage navigateTo={navigateTo} scrollToSection={scrollToSection} visibleSections={visibleSections} />}
      {currentPage === 'technology' && <TechnologyPage />}
      {currentPage === 'applications' && <ApplicationsPage />}
      {currentPage === 'team' && <TeamPage />}

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-white">TrueSpin</span>
            </div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              {pages.map((page) => (
                <button key={page.id} onClick={() => navigateTo(page.id)} className="hover:text-cyan-400 transition-colors text-sm">
                  {page.label}
                </button>
              ))}
            </div>
          </div>
          <div className="text-center mt-6 text-sm border-t border-slate-800 pt-6">
            <p>Lab-grade IMU calibration anywhere, anytime.</p>
            <p className="text-xs mt-2">© 2025 TrueSpin. Conrad Challenge Innovation.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-fade-in-delay { animation: fade-in 1s ease-out 0.3s both; }
        .delay-700 { animation-delay: 700ms; }
      `}</style>
    </div>
  );
}

// HOME PAGE
function HomePage({ navigateTo, scrollToSection, visibleSections }) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Lab-Grade Calibration
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mt-2">
              Anywhere, Anytime
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto animate-fade-in-delay">
            TrueSpin brings professional IMU calibration to the field, eliminating sensor drift for drones and autonomous systems.
          </p>
          <button
            onClick={() => scrollToSection('solution')}
            className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
          >
            Discover How It Works
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="text-cyan-400 rotate-90" size={32} />
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 bg-white animate-on-scroll opacity-0 transition-all duration-1000" style={{opacity: visibleSections.problem ? 1 : 0, transform: visibleSections.problem ? 'translateY(0)' : 'translateY(50px)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-12 text-center">The Problem</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
                <h3 className="text-2xl font-bold text-red-900 mb-3">IMUs Lose Accuracy During Flight</h3>
                <p className="text-slate-700 mb-4">
                  Drones rely on IMUs to maintain orientation and stability. But vibration, temperature changes, and motion stress cause sensors to drift over time.
                </p>
                <p className="text-slate-700 font-semibold">
                  Even a tiny 0.1°/s gyro bias causes 6° of error every minute when integrated.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-slate-700"><strong>Factory calibration</strong> only works in controlled conditions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-slate-700"><strong>Manual calibration</strong> is inaccurate and unreliable</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-slate-700"><strong>Lab equipment</strong> is too expensive and not portable</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-2xl p-8 shadow-xl">
              <div className="text-center">
                <div className="text-6xl font-bold text-red-600 mb-2">6°</div>
                <div className="text-slate-600 mb-6">of error per minute</div>
                <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full mb-4"></div>
                <p className="text-sm text-slate-600">Accuracy degradation over flight time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white animate-on-scroll opacity-0 transition-all duration-1000" style={{opacity: visibleSections.solution ? 1 : 0, transform: visibleSections.solution ? 'translateY(0)' : 'translateY(50px)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Introducing <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">TrueSpin</span>
          </h2>
          <p className="text-xl text-slate-300 text-center mb-16 max-w-3xl mx-auto">
            A portable IMU calibration system that provides verified ground-truth rotation to correct gyro bias and scale errors.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-cyan-500 transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Controlled Rotation</h3>
              <p className="text-slate-300">Turntable with encoder provides true angular change as a reference for calibration.</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-cyan-500 transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Reaction Wheel</h3>
              <p className="text-slate-300">Physics-based momentum exchange pulses verify calibration accuracy in real-time.</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-cyan-500 transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Precision Correction</h3>
              <p className="text-slate-300">Compares IMU readings against true rotations to compute accurate corrections.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Key Benefits</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">90%</div>
                <p className="text-slate-300">Drift Reduction</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">&lt;5 min</div>
                <p className="text-slate-300">Calibration Time</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">100%</div>
                <p className="text-slate-300">Portable</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigateTo('technology')}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              Explore the Technology
              <ChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-slate-50 animate-on-scroll opacity-0 transition-all duration-1000" style={{opacity: visibleSections.impact ? 1 : 0, transform: visibleSections.impact ? 'translateY(0)' : 'translateY(50px)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-12 text-center">Real-World Impact</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Enhanced Flight Safety</h3>
              <p className="text-slate-700 mb-4">
                Accurate IMU calibration means drones maintain proper orientation and stability throughout extended flights, reducing crashes and improving mission success rates.
              </p>
              <div className="flex items-center text-cyan-600 font-semibold">
                <ChevronRight size={20} />
                <span>Critical for autonomous operations</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Cost Savings</h3>
              <p className="text-slate-700 mb-4">
                Eliminate expensive lab calibration services and reduce sensor replacement costs. Small teams and researchers gain access to professional-grade accuracy.
              </p>
              <div className="flex items-center text-cyan-600 font-semibold">
                <ChevronRight size={20} />
                <span>Accessible precision for everyone</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Research Advancement</h3>
              <p className="text-slate-700 mb-4">
                University labs and research teams can conduct more accurate experiments and collect reliable flight data without budget constraints.
              </p>
              <div className="flex items-center text-cyan-600 font-semibold">
                <ChevronRight size={20} />
                <span>Accelerating innovation</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Commercial Efficiency</h3>
              <p className="text-slate-700 mb-4">
                Drone fleets for inspection, mapping, and delivery can maintain sensor accuracy in the field, maximizing uptime and data quality.
              </p>
              <div className="flex items-center text-cyan-600 font-semibold">
                <ChevronRight size={20} />
                <span>Operational excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// TECHNOLOGY PAGE
function TechnologyPage() {
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">How TrueSpin Works</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Deep dive into the technical architecture and calibration methodology
          </p>
        </div>

        {/* Image Placeholder */}
        <div className="bg-white rounded-2xl p-12 shadow-xl mb-12 text-center border-2 border-dashed border-slate-300">
          <div className="w-16 h-16 bg-slate-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Upload className="text-slate-400" size={32} />
          </div>
          <p className="text-slate-500 text-lg">Add your TrueSpin prototype image here</p>
          <p className="text-slate-400 text-sm mt-2">Recommended: High-quality photo showing the full system</p>
        </div>

        {/* System Overview */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Cpu className="mr-3 text-cyan-400" size={32} />
            System Architecture
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            TrueSpin combines precision hardware with intelligent software to deliver lab-grade IMU calibration in a portable package. The system uses two complementary calibration methods to ensure accuracy.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">Mechanical Subsystem</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>Precision Turntable:</strong> Controlled rotation platform</li>
                <li>• <strong>Optical Encoder:</strong> High-resolution angle measurement</li>
                <li>• <strong>Reaction Wheel:</strong> Momentum-based verification</li>
                <li>• <strong>IMU Mount:</strong> Secure, repeatable positioning</li>
              </ul>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">Electrical Subsystem</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>Microcontroller:</strong> Real-time control and data acquisition</li>
                <li>• <strong>Motor Drivers:</strong> Precise motion control</li>
                <li>• <strong>Power Management:</strong> Battery-powered operation</li>
                <li>• <strong>Wireless Communication:</strong> Cloud data sync</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Calibration Methods */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Method 1: Turntable Calibration</h3>
            <p className="text-slate-700 mb-4">
              The turntable rotates the IMU through known angles measured by a high-precision encoder. By comparing the IMU's gyroscope readings to the true rotation, we calculate bias and scale factor errors.
            </p>
            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded">
              <p className="text-sm text-slate-700">
                <strong>Key Advantage:</strong> Direct comparison to ground truth enables precise bias correction and scale factor calibration.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Method 2: Reaction Wheel Verification</h3>
            <p className="text-slate-700 mb-4">
              A reaction wheel creates momentum pulses that rotate the IMU platform. Physics equations predict the exact rotation, which we compare against IMU readings for independent verification.
            </p>
            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded">
              <p className="text-sm text-slate-700">
                <strong>Key Advantage:</strong> Physics-based validation ensures calibration accuracy without external references.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Specs */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Technical Specifications</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-l-4 border-cyan-500 pl-4">
              <h4 className="font-bold text-slate-900 mb-2">Calibration Accuracy</h4>
              <p className="text-2xl font-bold text-cyan-600">±0.01°/s</p>
              <p className="text-sm text-slate-600">Gyroscope bias correction</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-bold text-slate-900 mb-2">Calibration Time</h4>
              <p className="text-2xl font-bold text-blue-600">&lt;5 minutes</p>
              <p className="text-sm text-slate-600">Full calibration cycle</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-bold text-slate-900 mb-2">Portability</h4>
              <p className="text-2xl font-bold text-purple-600">~2 kg</p>
              <p className="text-sm text-slate-600">Compact field unit</p>
            </div>
          </div>
        </div>

        {/* Software System */}
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">Software & Cloud Platform</h2>
          <p className="text-cyan-50 mb-8">
            TrueSpin includes cloud-based calibration tracking and data management, allowing teams to store calibration history, monitor sensor health, and access calibration data from anywhere.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="font-bold mb-2">Calibration History</h4>
              <p className="text-cyan-50 text-sm">Track calibration over time and monitor sensor drift patterns</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="font-bold mb-2">Data Export</h4>
              <p className="text-cyan-50 text-sm">Download calibration coefficients for integration with flight software</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="font-bold mb-2">Multi-Device</h4>
              <p className="text-cyan-50 text-sm">Manage multiple IMUs and share calibration data across teams</p>
            </div>
          </div>
        </div>

        {/* Add More Content Section */}
        <div className="mt-12 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
          <Upload className="mx-auto text-slate-400 mb-4" size={48} />
          <h3 className="text-xl font-bold text-slate-700 mb-2">Add More Technical Details</h3>
          <p className="text-slate-600">
            Add diagrams, flowcharts, test results, or additional technical documentation here
          </p>
        </div>
      </div>
    </div>
  );
}

// APPLICATIONS PAGE
function ApplicationsPage() {
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Who Uses TrueSpin</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From research labs to commercial fleets, TrueSpin serves diverse customers who demand precision
          </p>
        </div>

        {/* Primary Customer Segments */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-6">
              <Users size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">University Research Labs</h3>
            <p className="text-slate-700 mb-4">
              Academic research teams conducting experiments with drones and autonomous systems need reliable, repeatable IMU data. TrueSpin provides lab-grade accuracy without the cost of professional calibration services.
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <ChevronRight className="text-cyan-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Robotics and autonomy research</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="text-cyan-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Sensor fusion algorithm development</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="text-cyan-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Student drone competition teams</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-6">
              <Briefcase size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Commercial Drone Fleets</h3>
            <p className="text-slate-700 mb-4">
              Companies operating drone fleets for inspection, mapping, delivery, or surveillance need to maintain sensor accuracy in the field to ensure data quality and flight safety.
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <ChevronRight className="text-cyan-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Infrastructure inspection and monitoring</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="text-cyan-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Surveying and mapping operations</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="text-cyan-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Package delivery services</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-6">
              <Cpu size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Drone Manufacturers</h3>
            <p className="text-slate-700 mb-4">
              Manufacturers need to calibrate IMUs during production and provide calibration capabilities to customers. TrueSpin can be integrated into quality control or offered as a value-added service.
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <ChevronRight className="text-cyan-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Production line quality control</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="text-cyan-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span>After-sales calibration services</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="text-cyan-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Customer support and troubleshooting</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-6">
              <Target size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">UAV Hobbyists & Enthusiasts</h3>
            <p className="text-slate-700 mb-4">
              Serious hobbyists building custom drones or racing UAVs want professional-grade performance without professional-grade prices. TrueSpin makes precision accessible.
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <ChevronRight className="text-cyan-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Custom drone builders</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="text-cyan-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Racing and competition participants</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="text-cyan-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Aerial photography professionals</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Use Case Scenarios */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Real-World Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h4 className="text-xl font-bold mb-3 text-cyan-400">Pre-Flight Calibration</h4>
              <p className="text-slate-300 text-sm">
                Before critical missions, operators use TrueSpin to ensure IMUs are properly calibrated, reducing the risk of navigation errors during autonomous flight.
              </p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h4 className="text-xl font-bold mb-3 text-cyan-400">Routine Maintenance</h4>
              <p className="text-slate-300 text-sm">
                Commercial fleets incorporate TrueSpin into regular maintenance schedules, verifying sensor accuracy after every 10-20 flight hours or following crashes.
              </p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h4 className="text-xl font-bold mb-3 text-cyan-400">Research Validation</h4>
              <p className="text-slate-300 text-sm">
                Researchers use TrueSpin to validate IMU accuracy before data collection campaigns, ensuring published results are based on trustworthy sensor data.
              </p>
            </div>
          </div>
        </div>

        {/* Early Adopters */}
        <div className="bg-cyan-50 border-l-4 border-cyan-500 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Early Adopter Profile</h2>
          <p className="text-slate-700 mb-4">
            Our ideal early adopters are technically sophisticated users who already understand IMU drift and its impacts. They're frustrated with current calibration options and are eager to try new solutions.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-slate-700">
            <div>
              <h4 className="font-bold mb-2">Characteristics:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Familiar with IMU technology and challenges</li>
                <li>• Currently using suboptimal calibration methods</li>
                <li>• Value accuracy over convenience</li>
                <li>• Willing to provide feedback and iterate</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Where to Find Them:</h4>
              <ul className="space-y-1 text-sm">
                <li>• University drone labs and robotics clubs</li>
                <li>• Online forums (DIY Drones, r/Multicopter)</li>
                <li>• Drone racing leagues and competitions</li>
                <li>• Small commercial drone service providers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// TEAM PAGE
function TeamPage() {
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Meet Our Team</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Passionate innovators dedicated to making precision accessible
          </p>
        </div>

        {/* Team Member Placeholders */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[1, 2, 3].map((member) => (
            <div key={member} className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-slate-100">
                <Upload className="text-slate-400" size={48} />
              </div>
              <div className="bg-slate-100 rounded-lg p-4 mb-4">
                <p className="text-slate-500 text-sm">Add team member photo here</p>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Team Member Name</h3>
              <p className="text-cyan-600 font-semibold mb-4">Role/Title</p>
              <p className="text-slate-700 text-sm">
                Add bio, background, expertise, and passion for the project. Highlight relevant skills and why this person is key to TrueSpin's success.
              </p>
            </div>
          ))}
        </div>

        {/* Mission & Values */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white mb-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              To eliminate IMU drift as a barrier to reliable drone operations by making professional-grade calibration accessible, portable, and affordable for teams of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="text-cyan-400" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-cyan-400">Vision</h3>
              <p className="text-slate-300">
                A world where every drone operator, from student to professional, has access to lab-quality IMU calibration regardless of budget or location.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="text-cyan-400" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-cyan-400">Innovation</h3>
              <p className="text-slate-300">
                We combine precision hardware engineering with intelligent software to create solutions that push the boundaries of what's possible in portable calibration.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-cyan-400" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-cyan-400">Impact</h3>
              <p className="text-slate-300">
                By improving sensor accuracy, we enhance flight safety, advance aerospace research, and enable new applications in autonomous systems.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 text-lg mb-4">
              TrueSpin was born from firsthand frustration with IMU calibration challenges. As drone enthusiasts and researchers, we experienced the impact of sensor drift on flight performance and data quality. We saw talented teams struggle with expensive lab services or settle for inaccurate manual calibration.
            </p>
            <p className="text-slate-700 text-lg mb-4">
              We knew there had to be a better way. By combining precision mechanical design with physics-based validation methods, we created a calibration system that brings lab-grade accuracy into the field. TrueSpin is our solution to democratizing access to reliable IMU calibration.
            </p>
            <p className="text-slate-700 text-lg">
              Today, we're working to bring TrueSpin to market and help drone operators everywhere achieve the accuracy they deserve. This is just the beginning of our journey to make precision accessible to all.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Join Us?</h2>
          <p className="text-xl text-cyan-50 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate collaborators, advisors, and partners who share our vision for accessible precision technology.
          </p>
          <button className="bg-white text-cyan-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}
