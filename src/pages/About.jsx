import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import myPhoto from "../assets/kateryna.jpeg"; 

function AboutMePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f9f5f0] via-[#f5ede3] to-[#f0e4d1] relative overflow-hidden font-serif">
      {/* Decorative Hearts Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <Heart className="absolute top-10 left-10 w-24 h-24 rotate-6" color="#8B4513" />
        <Heart className="absolute top-20 right-32 w-40 h-40 rotate-12" color="#8B4513" />
        <Heart className="absolute top-40 left-60 w-20 h-20 -rotate-10" color="#CD853F" />
        <Heart className="absolute bottom-20 right-20 w-28 h-28 -rotate-6" color="#CD853F" />
        <Heart className="absolute bottom-40 left-1/4 w-36 h-36 rotate-20" color="#D2691E" />
        <Heart className="absolute top-1/3 right-1/3 w-20 h-20 rotate-30" color="#D2691E" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-xl sm:rounded-2xl shadow-xl border-4 sm:border-6 border-[#e8d5b7] p-4 sm:p-6 lg:p-8">
            {/* Decorative corner elements */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#CD853F] rounded-tl-lg"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#CD853F] rounded-tr-lg"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#CD853F] rounded-bl-lg"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#CD853F] rounded-br-lg"></div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center items-center mb-4 sm:mb-6">
                <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
                <span className="text-2xl sm:text-3xl mx-3 sm:mx-4 text-[#CD853F]">❦</span>
                <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#8B4513] mb-3" style={{fontFamily: 'Georgia, serif'}}>About Me</h1>
              <div className="flex justify-center items-center">
                <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#D2691E] to-transparent"></div>
                <span className="text-xl mx-3 text-[#D2691E]">✦</span>
                <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#D2691E] to-transparent"></div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="mb-12">
              <div className="bg-gradient-to-br from-[#f4e8d6] to-[#f0e2d0] rounded-xl shadow-lg border-3 border-[#e8d5b7] p-6 w-full">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <img
                      src={myPhoto}
                      alt="My profile"
                      className="w-full max-w-[160px] aspect-square object-cover rounded-xl border-4 border-[#CD853F] shadow-lg"
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#CD853F] rounded-full border-2 border-[#fefcf8]"></div>
                  </div>
                  <div className="flex flex-col text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#8B4513] mb-2" style={{fontFamily: 'Georgia, serif'}}>Kateryna Soloviova</h3>
                    <p className="text-base sm:text-lg text-[#A0522D] mb-4 font-medium italic">
                      Full Stack Web Developer
                    </p>
                    <div className="flex flex-col gap-3">
                      <span className="flex items-center justify-center sm:justify-start text-[#8B4513] text-sm sm:text-base break-words">
                        <Mail className="w-4 h-4 mr-2 text-[#CD853F]" />
                        soloviova.kateryna@gmail.com
                      </span>
                      <div className="flex gap-4 justify-center sm:justify-start">
                        <a
                          href="https://github.com/KaterynaSoloviova"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-[#8B4513] hover:text-[#CD853F] transition-colors duration-300 text-sm sm:text-base"
                        >
                          <Github className="w-4 h-4 mr-1" />
                          GitHub
                        </a>
                        <a
                          href="https://www.linkedin.com/in/kateryna-soloviova-b4629b157/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-[#8B4513] hover:text-[#CD853F] transition-colors duration-300 text-sm sm:text-base"
                        >
                          <Linkedin className="w-4 h-4 mr-1" />
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div className="mb-8">
              <div className="flex justify-center items-center mb-6">
                <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
                <span className="text-xl sm:text-2xl mx-3 text-[#CD853F]">❦</span>
                <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#8B4513] text-center" style={{fontFamily: 'Georgia, serif'}}>
                About Memory Lane
              </h2>
              <div className="bg-gradient-to-br from-[#f4e8d6] to-[#f0e2d0] rounded-xl p-6 border-3 border-[#e8d5b7] shadow-lg">
                <p className="text-lg leading-relaxed mb-4 text-[#8B4513]">
                  <span className="text-[#CD853F] font-bold">Memory Lane</span> is a
                  personal full-stack project designed to preserve and relive life's
                  most meaningful moments. It allows users to create digital time
                  capsules with text, photos, and interactive features that
                  can be revisited in the future.
                </p>
                <p className="text-lg leading-relaxed text-[#A0522D] italic" style={{fontFamily: 'Georgia, serif'}}>
                  Built with a focus on both functionality and emotional connection,
                  Memory Lane is more than just a technical exercise—it's a place for
                  memories, nostalgia, and personal storytelling.
                </p>
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <div className="flex justify-center items-center mb-6">
                <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
                <span className="text-xl sm:text-2xl mx-3 text-[#CD853F]">❦</span>
                <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#8B4513] text-center" style={{fontFamily: 'Georgia, serif'}}>
                Technologies Used
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-[#fefcf8] to-[#f8f3ec] rounded-xl shadow-lg border-3 border-[#e8d5b7] p-6 hover:shadow-xl transition-all duration-300 hover:border-[#CD853F]">
                    <h3 className="text-xl font-bold mb-4 text-[#8B4513] text-center" style={{fontFamily: 'Georgia, serif'}}>
                      Frontend
                    </h3>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D2691E] to-transparent mb-4"></div>
                    <ul className="space-y-3 text-[#A0522D]">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#CD853F] rounded-full mr-3"></span>
                        <span className="font-medium">React 19</span> - Modern UI library
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#CD853F] rounded-full mr-3"></span>
                        <span className="font-medium">Tailwind CSS</span> - Utility-first styling
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#CD853F] rounded-full mr-3"></span>
                        <span className="font-medium">Lucide React</span> - Beautiful icons
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#CD853F] rounded-full mr-3"></span>
                        <span className="font-medium">TipTap Editor</span> - Rich text editing
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#CD853F] rounded-full mr-3"></span>
                        <span className="font-medium">Framer Motion</span> - Smooth animations
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#CD853F] rounded-full mr-3"></span>
                        <span className="font-medium">Emoji Picker React</span> - Interactive emojis
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-[#fefcf8] to-[#f8f3ec] rounded-xl shadow-lg border-3 border-[#e8d5b7] p-6 hover:shadow-xl transition-all duration-300 hover:border-[#CD853F]">
                    <h3 className="text-xl font-bold mb-4 text-[#8B4513] text-center" style={{fontFamily: 'Georgia, serif'}}>
                      Backend & Tools
                    </h3>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D2691E] to-transparent mb-4"></div>
                    <ul className="space-y-3 text-[#A0522D]">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#CD853F] rounded-full mr-3"></span>
                        <span className="font-medium">React Router</span> - Client-side routing
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#CD853F] rounded-full mr-3"></span>
                        <span className="font-medium">Axios</span> - HTTP client for API calls
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#CD853F] rounded-full mr-3"></span>
                        <span className="font-medium">Vite</span> - Fast build tool & dev server
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#CD853F] rounded-full mr-3"></span>
                        <span className="font-medium">ESLint</span> - Code quality & standards
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#CD853F] rounded-full mr-3"></span>
                        <span className="font-medium">PostCSS</span> - CSS processing
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#CD853F] rounded-full mr-3"></span>
                        <span className="font-medium">GitHub</span> - Version control & deployment
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Goals */}
            <div className="mb-8">
              <div className="flex justify-center items-center mb-6">
                <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
                <span className="text-xl sm:text-2xl mx-3 text-[#CD853F]">❦</span>
                <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#8B4513] text-center" style={{fontFamily: 'Georgia, serif'}}>
                Project Goals
              </h2>
              <div className="bg-gradient-to-br from-[#f4e8d6] to-[#f0e2d0] rounded-xl p-6 border-3 border-[#e8d5b7] shadow-lg">
                <p className="text-lg leading-relaxed text-[#8B4513] italic text-center" style={{fontFamily: 'Georgia, serif'}}>
                  My goal with Memory Lane was to combine my technical skills as a
                  full-stack developer with my passion for storytelling and design.
                  This project reflects my ability to build scalable, interactive
                  applications while keeping the user experience personal and
                  engaging.
                </p>
              </div>
            </div>

            {/* Back to Home Button */}
            <div className="text-center mt-8">
              <div className="flex justify-center items-center mb-4">
                <div className="w-6 h-px bg-gradient-to-r from-transparent via-[#A0522D] to-transparent"></div>
                <span className="text-base mx-3 text-[#A0522D]">❦</span>
                <div className="w-6 h-px bg-gradient-to-r from-transparent via-[#A0522D] to-transparent"></div>
              </div>
              <Link 
                to="/" 
                className="bg-gradient-to-r from-[#CD853F] to-[#D2691E] hover:from-[#D2691E] hover:to-[#CD853F] text-white px-8 py-3 rounded-full font-semibold text-lg shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-[#8B4513] inline-flex items-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AboutMePage;
