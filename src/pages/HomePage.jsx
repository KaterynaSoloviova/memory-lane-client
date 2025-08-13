import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Heart, Package, Users, ImagePlus, Unlock, Library, Eye } from 'lucide-react';


function HomePage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f9f5f0] via-[#f5ede3] to-[#f0e4d1] relative overflow-hidden font-serif">
       <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
      <Heart className="absolute top-10 left-10 w-24 h-24 rotate-6" color="#8B4513" />
      <Heart className="absolute top-20 left-32 w-40 h-40 rotate-12" color="#8B4513" />
      <Heart className="absolute top-40 left-60 w-20 h-20 -rotate-10" color="#CD853F" />
      <Heart className="absolute top-64 right-20 w-28 h-28 -rotate-6" color="#CD853F" />
      <Heart className="absolute top-80 right-40 w-36 h-36 rotate-20" color="#D2691E" />
      <Heart className="absolute bottom-20 left-20 w-20 h-20 rotate-30" color="#D2691E" />
      <Heart className="absolute bottom-40 left-1/4 w-24 h-24 rotate-45" color="#D2691E" />
      <Heart className="absolute bottom-10 right-1/3 w-24 h-24 -rotate-15" color="#A0522D" />
      <Heart className="absolute top-1/3 left-1/2 w-36 h-36 -rotate-12" color="#A0522D" />
      <Heart className="absolute bottom-20 right-1/4 w-20 h-20 rotate-30" color="#8B4513" />
      <Heart className="absolute bottom-64 right-10 w-16 h-16 rotate-45" color="#A0522D" />
      <Heart className="absolute top-72 left-1/5 w-20 h-20 rotate-5" color="#CD853F" />
    </div>

      {/* Hero section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Ornate vintage frame card */}
          <div className="relative bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-xl sm:rounded-2xl shadow-xl border-4 sm:border-6 border-[#e8d5b7] p-4 sm:p-6 lg:p-8 text-center">
            {/* Decorative corner elements */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#CD853F] rounded-tl-lg"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#CD853F] rounded-tr-lg"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#CD853F] rounded-bl-lg"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#CD853F] rounded-br-lg"></div>

            {/* Vintage ornamental divider */}
            <div className="flex justify-center items-center mb-4 sm:mb-6">
              <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
              <span className="text-2xl sm:text-3xl mx-2 sm:mx-3 text-[#CD853F]">❦</span>
              <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
            </div>

            <div className="flex justify-center items-center mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl lg:text-4xl mr-2 sm:mr-3 text-[#CD853F]">🤎</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#8B4513] tracking-wide" style={{fontFamily: 'Georgia, serif'}}>Memory Lane</h1>
              <span className="text-2xl sm:text-3xl lg:text-4xl ml-2 sm:ml-3 text-[#CD853F]">🤎</span>
            </div>
            
            {/* Vintage ornamental divider */}
            <div className="flex justify-center items-center mb-5">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D2691E] to-transparent"></div>
              <span className="text-xl mx-3 text-[#D2691E]">✦</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D2691E] to-transparent"></div>
            </div>
            
            <p className="text-xl text-[#8B4513] mb-4 font-medium italic leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
              A nostalgic sanctuary where precious moments become timeless treasures
            </p>
            <p className="text-lg text-[#A0522D] mb-8 leading-relaxed font-light">
              Create digital time capsules filled with love, laughter, and memories to cherish forever
            </p>

            {/* Conditional buttons based on authentication status */}
            {isLoggedIn ? (
              // For logged-in users: 3 buttons
              <div className="flex flex-col lg:flex-row justify-center gap-3 lg:gap-4 mb-4 sm:mb-6 px-2">
                <NavLink
                  to="/demo"
                  className="bg-gradient-to-r from-[#fefcf8] to-[#f8f3ec] border-3 border-[#CD853F] text-[#8B4513] hover:bg-gradient-to-r hover:from-[#CD853F] hover:to-[#D2691E] hover:text-white px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Demo
                </NavLink>

                <button
                  onClick={() => navigate("/create-capsule")}
                  className="bg-gradient-to-r from-[#CD853F] to-[#D2691E] hover:from-[#D2691E] hover:to-[#CD853F] text-white px-6 py-2.5 rounded-full font-semibold text-base shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-[#8B4513] flex items-center justify-center gap-2"
                >
                  <span className="text-lg">✨</span>
                  Create Your First Capsule
                </button>

                <button
                  onClick={() => navigate("/public")}
                  className="bg-gradient-to-r from-[#fefcf8] to-[#f8f3ec] border-3 border-[#CD853F] text-[#8B4513] hover:bg-gradient-to-r hover:from-[#CD853F] hover:to-[#D2691E] hover:text-white px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <Library className="w-4 h-4" />
                  Browse Public Capsules
                </button>
              </div>
            ) : (
              // For non-logged-in users: 2 buttons
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mb-4 sm:mb-6 px-2">
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-gradient-to-r from-[#CD853F] to-[#D2691E] hover:from-[#D2691E] hover:to-[#CD853F] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-base sm:text-lg shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-[#8B4513] flex items-center justify-center gap-2 sm:gap-3"
                >
                  <span className="text-lg sm:text-xl">✨</span>
                  Begin Your Journey
                </button>

                <NavLink
                  to="/demo"
                  className="bg-gradient-to-r from-[#fefcf8] to-[#f8f3ec] border-3 border-[#CD853F] text-[#8B4513] hover:bg-gradient-to-r hover:from-[#CD853F] hover:to-[#D2691E] hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 sm:gap-3"
                >
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  View Demo
                </NavLink>
              </div>
            )}

            <div className="flex justify-center items-center mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#A0522D] to-transparent"></div>
              <span className="text-base mx-3 text-[#A0522D]">❦</span>
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#A0522D] to-transparent"></div>
            </div>

            <p className="text-base text-[#8B4513] italic font-light leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
              "In every memory lies a story worth preserving"
            </p>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="relative z-10 bg-gradient-to-r from-[#f4e8d6] via-[#f0e2d0] to-[#ecdcc8] pt-4 sm:pt-6 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header with vintage styling */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center items-center mb-4 sm:mb-6">
              <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
              <span className="text-2xl sm:text-3xl mx-3 sm:mx-4 text-[#CD853F]">❦</span>
              <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#8B4513] mb-3 sm:mb-4" style={{fontFamily: 'Georgia, serif'}}>How it works</h2>
            <p className="text-lg sm:text-xl text-[#A0522D] italic px-4">Your journey to preserving precious memories</p>
          </div>

          <div className="hidden lg:flex lg:items-stretch lg:justify-center lg:gap-4">
            <div className="text-center group flex-1">
              <div className="bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border-3 lg:border-4 border-[#e8d5b7] transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-[#CD853F] relative overflow-hidden h-full flex flex-col">
                <div className="mb-6 flex justify-center">
                  <Package className="w-16 h-16 text-[#CD853F]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>Create a Capsule</h3>
                <p className="text-[#A0522D] leading-relaxed font-light flex-grow">Choose a meaningful title, special date, and cherished recipients</p>
              </div>
            </div>
            
            {/* Arrow between first and second */}
            <div className="text-2xl text-[#CD853F] flex-shrink-0 flex items-center">
              ➜
            </div>
            
            <div className="text-center group flex-1">
              <div className="bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border-3 lg:border-4 border-[#e8d5b7] transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-[#CD853F] relative overflow-hidden h-full flex flex-col">
                <div className="mb-6 flex justify-center">
                  <Users className="w-16 h-16 text-[#CD853F]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>Invite Loved Ones</h3>
                <p className="text-[#A0522D] leading-relaxed font-light flex-grow">Send heartfelt invitations to friends and family to join your journey</p>
              </div>
            </div>
            
            {/* Arrow between second and third */}
            <div className="text-2xl text-[#CD853F] flex-shrink-0 flex items-center">
              ➜
            </div>
            
            <div className="text-center group flex-1">
              <div className="bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border-3 lg:border-4 border-[#e8d5b7] transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-[#CD853F] relative overflow-hidden h-full flex flex-col">
                <div className="mb-6 flex justify-center">
                  <ImagePlus className="w-16 h-16 text-[#CD853F]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>Add Memories</h3>
                <p className="text-[#A0522D] leading-relaxed font-light flex-grow">Upload treasured photos, heartfelt letters, and precious moments</p>
              </div>
            </div>
            
            {/* Arrow between third and fourth */}
            <div className="text-2xl text-[#CD853F] flex-shrink-0 flex items-center">
              ➜
            </div>
            
            <div className="text-center group flex-1">
              <div className="bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border-3 lg:border-4 border-[#e8d5b7] transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-[#CD853F] relative overflow-hidden h-full flex flex-col">
                <div className="mb-6 flex justify-center">
                  <Unlock className="w-16 h-16 text-[#CD853F]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>Unlock Together</h3>
                <p className="text-[#A0522D] leading-relaxed font-light flex-grow">Open your time capsule together on that magical future date</p>
              </div>
            </div>
          </div>

          {/* Mobile/tablet grid layout without arrows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch lg:hidden">
            <div className="text-center group h-full">
              <div className="bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border-3 lg:border-4 border-[#e8d5b7] transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-[#CD853F] relative overflow-hidden h-full flex flex-col">
                <div className="mb-6 flex justify-center">
                  <Package className="w-16 h-16 text-[#CD853F]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>Create a Capsule</h3>
                <p className="text-[#A0522D] leading-relaxed font-light flex-grow">Choose a meaningful title, special date, and cherished recipients</p>
              </div>
            </div>
            
            <div className="text-center group h-full">
              <div className="bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border-3 lg:border-4 border-[#e8d5b7] transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-[#CD853F] relative overflow-hidden h-full flex flex-col">
                <div className="mb-6 flex justify-center">
                  <Users className="w-16 h-16 text-[#CD853F]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>Invite Loved Ones</h3>
                <p className="text-[#A0522D] leading-relaxed font-light flex-grow">Send heartfelt invitations to friends and family to join your journey</p>
              </div>
            </div>
            
            <div className="text-center group h-full">
              <div className="bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border-3 lg:border-4 border-[#e8d5b7] transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-[#CD853F] relative overflow-hidden h-full flex flex-col">
                <div className="mb-6 flex justify-center">
                  <ImagePlus className="w-16 h-16 text-[#CD853F]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>Add Memories</h3>
                <p className="text-[#A0522D] leading-relaxed font-light flex-grow">Upload treasured photos, heartfelt letters, and precious moments</p>
              </div>
            </div>
            
            <div className="text-center group h-full">
              <div className="bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border-3 lg:border-4 border-[#e8d5b7] transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-[#CD853F] relative overflow-hidden h-full flex flex-col">
                <div className="mb-6 flex justify-center">
                  <Unlock className="w-16 h-16 text-[#CD853F]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>Unlock Together</h3>
                <p className="text-[#A0522D] leading-relaxed font-light flex-grow">Open your time capsule together on that magical future date</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Only show for non-logged-in users */}
      {!isLoggedIn && (
        <section className="relative z-10 bg-gradient-to-br from-[#f9f5f0] via-[#f5ede3] to-[#f0e4d1] py-4 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-2xl shadow-xl border-6 border-[#e8d5b7] p-6 text-center">
              {/* Decorative corner elements */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#CD853F] rounded-tl-lg"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#CD853F] rounded-tr-lg"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#CD853F] rounded-bl-lg"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#CD853F] rounded-br-lg"></div>

              <div className="flex justify-center items-center mb-4">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
                <span className="text-3xl mx-3 text-[#CD853F]">❦</span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
              </div>

              <h2 className="text-4xl font-bold text-[#8B4513] mb-3 leading-tight" style={{fontFamily: 'Georgia, serif'}}>
                Start Preserving Your Precious Moments Today
              </h2>

              <div className="flex justify-center items-center mb-3">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D2691E] to-transparent"></div>
                <span className="text-xl mx-3 text-[#D2691E]">✦</span>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D2691E] to-transparent"></div>
              </div>
              
              <p className="text-lg text-[#8B4513] mb-3 font-medium italic leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
                Every day creates new memories worth treasuring
              </p>
              <p className="text-base text-[#A0522D] mb-5 leading-relaxed font-light">
                Don't let them fade away – capture them in a beautiful digital time capsule that will bring joy for years to come
              </p>

              <div className="flex justify-center gap-6 flex-wrap mb-4">
                <button
                  onClick={() => navigate("/create-capsule")}
                  className="bg-gradient-to-r from-[#CD853F] to-[#D2691E] hover:from-[#D2691E] hover:to-[#CD853F] text-white px-8 py-3 rounded-full font-semibold text-lg shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-[#8B4513] flex items-center gap-3"
                >
                  <span className="text-xl">✨</span>
                  Create Your First Capsule
                </button>

                <button
                  onClick={() => navigate("/public")}
                  className="bg-gradient-to-r from-[#fefcf8] to-[#f8f3ec] border-3 border-[#CD853F] text-[#8B4513] hover:bg-gradient-to-r hover:from-[#CD853F] hover:to-[#D2691E] hover:text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3"
                >
                  <Library className="w-5 h-5" />
                  Browse Public Capsules
                </button>
              </div>

              <div className="flex justify-center items-center mb-3">
                <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#A0522D] to-transparent"></div>
                <span className="text-base mx-3 text-[#A0522D]">❦</span>
                <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#A0522D] to-transparent"></div>
              </div>

              <p className="text-sm text-[#8B4513] italic font-light leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
                "Every moment is a gift worth preserving"
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Inspirational Quote Section */}
      <section className="relative z-10 bg-gradient-to-r from-[#f4e8d6] via-[#f0e2d0] to-[#ecdcc8] py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-2xl p-6 shadow-xl border-4 border-[#e8d5b7]">
            <div className="flex justify-center items-center mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
              <span className="text-xl mx-3 text-[#CD853F]">❦</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
            </div>
            
            <p className="text-lg text-[#8B4513] italic font-light leading-relaxed mb-4" style={{fontFamily: 'Georgia, serif'}}>
              "The best things in life are the people we love, the places we've been, and the 
              memories we've made along the way."
            </p>

            <div className="flex justify-center items-center">
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#A0522D] to-transparent"></div>
              <span className="text-base mx-2 text-[#A0522D]">✦</span>
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#A0522D] to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
