import { NavLink, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f9f5f0] via-[#f5ede3] to-[#f0e4d1] relative overflow-hidden font-serif">
      {/* Vintage decorative background elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-16 w-40 h-40 border-2 border-[#8B4513] rounded-full transform rotate-12"></div>
        <div className="absolute top-60 right-32 w-28 h-28 border border-[#CD853F] rounded-full transform -rotate-6"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 border border-[#D2691E] rounded-full transform rotate-45"></div>
        <div className="absolute top-1/3 left-1/2 w-36 h-36 border-2 border-[#A0522D] rounded-full transform -rotate-12"></div>
        <div className="absolute bottom-20 right-1/4 w-20 h-20 border border-[#8B4513] rounded-full transform rotate-30"></div>
      </div>

      {/* Vintage decorative dots */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-1/4 left-1/6 w-3 h-3 bg-[#CD853F] rounded-full animate-pulse"></div>
        <div className="absolute top-2/3 right-1/5 w-2 h-2 bg-[#D2691E] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-[#A0522D] rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-[#CD853F] rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Hero section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Ornate vintage frame card */}
          <div className="relative bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-[2rem] shadow-2xl border-8 border-[#e8d5b7] p-12 text-center">
            {/* Decorative corner elements */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-[#CD853F] rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-[#CD853F] rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-[#CD853F] rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-[#CD853F] rounded-br-lg"></div>

            {/* Vintage ornamental divider */}
            <div className="flex justify-center items-center mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
              <span className="text-4xl mx-4 text-[#CD853F]">❦</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
            </div>

            <div className="flex justify-center items-center mb-8">
              <span className="text-5xl mr-4 text-[#CD853F]">🕰️</span>
              <h1 className="text-7xl font-bold text-[#8B4513] tracking-wide" style={{fontFamily: 'Georgia, serif'}}>Memory Lane</h1>
              <span className="text-5xl ml-4 text-[#CD853F]">🕰️</span>
            </div>
            
            {/* Vintage ornamental divider */}
            <div className="flex justify-center items-center mb-8">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D2691E] to-transparent"></div>
              <span className="text-2xl mx-3 text-[#D2691E]">✦</span>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D2691E] to-transparent"></div>
            </div>
            
            <p className="text-2xl text-[#8B4513] mb-6 font-medium italic leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
              A nostalgic sanctuary where precious moments become timeless treasures
            </p>
            <p className="text-xl text-[#A0522D] mb-12 leading-relaxed font-light">
              Create digital time capsules filled with love, laughter, and memories to cherish forever
            </p>

            <div className="flex justify-center gap-8 flex-wrap mb-10">
              <button
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-[#CD853F] to-[#D2691E] hover:from-[#D2691E] hover:to-[#CD853F] text-white px-10 py-4 rounded-full font-semibold text-xl shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-[#8B4513] flex items-center gap-3"
              >
                <span className="text-2xl">✨</span>
                Begin Your Journey
              </button>

              <NavLink
                to="/demo"
                className="bg-gradient-to-r from-[#fefcf8] to-[#f8f3ec] border-3 border-[#CD853F] text-[#8B4513] hover:bg-gradient-to-r hover:from-[#CD853F] hover:to-[#D2691E] hover:text-white px-10 py-4 rounded-full font-semibold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3"
              >
                <span className="text-2xl">🎁</span>
                View Demo
              </NavLink>
            </div>

            <div className="flex justify-center items-center mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#A0522D] to-transparent"></div>
              <span className="text-lg mx-3 text-[#A0522D]">❦</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#A0522D] to-transparent"></div>
            </div>

            <p className="text-xl text-[#8B4513] italic font-light leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
              "In every memory lies a story worth preserving"
            </p>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="relative z-10 bg-gradient-to-r from-[#f4e8d6] via-[#f0e2d0] to-[#ecdcc8] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header with vintage styling */}
          <div className="text-center mb-20">
            <div className="flex justify-center items-center mb-6">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
              <span className="text-3xl mx-4 text-[#CD853F]">❦</span>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
            </div>
            <h2 className="text-5xl font-bold text-[#8B4513] mb-4" style={{fontFamily: 'Georgia, serif'}}>How it works</h2>
            <p className="text-xl text-[#A0522D] italic">Your journey to preserving precious memories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-3xl p-8 shadow-xl border-4 border-[#e8d5b7] transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-[#CD853F] relative overflow-hidden">
                <div className="absolute top-2 right-2 text-sm text-[#CD853F] opacity-50">01</div>
                <div className="text-6xl mb-6 text-[#CD853F]">📦</div>
                <h3 className="text-2xl font-bold mb-4 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>Create a Capsule</h3>
                <p className="text-[#A0522D] leading-relaxed font-light">Choose a meaningful title, special date, and cherished recipients</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-3xl p-8 shadow-xl border-4 border-[#e8d5b7] transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-[#CD853F] relative overflow-hidden">
                <div className="absolute top-2 right-2 text-sm text-[#CD853F] opacity-50">02</div>
                <div className="text-6xl mb-6 text-[#CD853F]">👨‍👩‍👧‍👦</div>
                <h3 className="text-2xl font-bold mb-4 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>Invite Loved Ones</h3>
                <p className="text-[#A0522D] leading-relaxed font-light">Send heartfelt invitations to friends and family to join your journey</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-3xl p-8 shadow-xl border-4 border-[#e8d5b7] transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-[#CD853F] relative overflow-hidden">
                <div className="absolute top-2 right-2 text-sm text-[#CD853F] opacity-50">03</div>
                <div className="text-6xl mb-6 text-[#CD853F]">🖼️</div>
                <h3 className="text-2xl font-bold mb-4 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>Add Memories</h3>
                <p className="text-[#A0522D] leading-relaxed font-light">Upload treasured photos, heartfelt letters, and precious moments</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-3xl p-8 shadow-xl border-4 border-[#e8d5b7] transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-[#CD853F] relative overflow-hidden">
                <div className="absolute top-2 right-2 text-sm text-[#CD853F] opacity-50">04</div>
                <div className="text-6xl mb-6 text-[#CD853F]">🔓</div>
                <h3 className="text-2xl font-bold mb-4 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>Unlock Together</h3>
                <p className="text-[#A0522D] leading-relaxed font-light">Open your time capsule together on that magical future date</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative z-10 bg-gradient-to-br from-[#f9f5f0] via-[#f5ede3] to-[#f0e4d1] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-[#f5e6b8] via-[#f2e1b0] to-[#efdaa5] border-8 border-[#D2691E] rounded-[2.5rem] p-16 text-center shadow-2xl">
            {/* Ornate corner decorations */}
            <div className="absolute top-6 left-6 w-10 h-10 border-t-4 border-l-4 border-[#8B4513] rounded-tl-xl"></div>
            <div className="absolute top-6 right-6 w-10 h-10 border-t-4 border-r-4 border-[#8B4513] rounded-tr-xl"></div>
            <div className="absolute bottom-6 left-6 w-10 h-10 border-b-4 border-l-4 border-[#8B4513] rounded-bl-xl"></div>
            <div className="absolute bottom-6 right-6 w-10 h-10 border-b-4 border-r-4 border-[#8B4513] rounded-br-xl"></div>

            <div className="flex justify-center items-center mb-8">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#8B4513] to-transparent"></div>
              <span className="text-3xl mx-4 text-[#8B4513]">✦</span>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#8B4513] to-transparent"></div>
            </div>

            <h2 className="text-5xl font-bold text-[#8B4513] mb-8 leading-tight" style={{fontFamily: 'Georgia, serif'}}>
              Start Preserving Your Precious Moments Today
            </h2>
            
            <p className="text-2xl text-[#A0522D] mb-12 leading-relaxed font-light italic" style={{fontFamily: 'Georgia, serif'}}>
              Every day creates new memories worth treasuring. Don't let them fade away – capture 
              them in a beautiful digital time capsule that will bring joy for years to come.
            </p>

            <div className="flex justify-center gap-8 flex-wrap mb-8">
              <button
                onClick={() => navigate("/create-capsule")}
                className="bg-gradient-to-r from-[#CD853F] to-[#D2691E] hover:from-[#D2691E] hover:to-[#CD853F] text-white px-12 py-5 rounded-full font-bold text-xl shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-[#8B4513] flex items-center gap-3"
              >
                <span className="text-2xl">✨</span>
                Create Your First Capsule
              </button>

              <button
                onClick={() => navigate("/public")}
                className="bg-gradient-to-r from-[#fefcf8] to-[#f8f3ec] border-3 border-[#CD853F] text-[#8B4513] hover:bg-gradient-to-r hover:from-[#CD853F] hover:to-[#D2691E] hover:text-white px-12 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-3"
              >
                <span className="text-2xl">📚</span>
                Browse Public Capsules
              </button>
            </div>

            <div className="flex justify-center items-center">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#A0522D] to-transparent"></div>
              <span className="text-2xl mx-4 text-[#A0522D]">❦</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#A0522D] to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Quote Section */}
      <section className="relative z-10 bg-gradient-to-r from-[#f4e8d6] via-[#f0e2d0] to-[#ecdcc8] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-3xl p-12 shadow-xl border-4 border-[#e8d5b7]">
            <div className="flex justify-center items-center mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
              <span className="text-2xl mx-4 text-[#CD853F]">❦</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent"></div>
            </div>
            
            <p className="text-3xl text-[#8B4513] italic font-light leading-relaxed mb-6" style={{fontFamily: 'Georgia, serif'}}>
              "The best things in life are the people we love, the places we've been, and the 
              memories we've made along the way."
            </p>

            <div className="flex justify-center items-center">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#A0522D] to-transparent"></div>
              <span className="text-lg mx-3 text-[#A0522D]">✦</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#A0522D] to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
