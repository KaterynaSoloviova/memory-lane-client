import { VintageDecorations, VintageOrnament, VintageContainer, vintageClasses } from "../utils/vintageStyles.jsx";

function DemoCapsule() {
  return (
    <main className={vintageClasses.pageContainer}>
      <VintageDecorations />
      
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <VintageContainer>
            <VintageOrnament symbol="🎁" />
            <h1 className="text-5xl font-bold mb-6 text-center text-[#8B4513] tracking-wide" style={{fontFamily: 'Georgia, serif'}}>
              🎁 Our Summer 1999
            </h1>
            <p className="text-center mb-8 text-lg text-[#A0522D]" style={{fontFamily: 'Georgia, serif'}}>
              Unlocked on: <strong className="text-[#CD853F]">July 1st, 2024</strong> • Created by:{" "}
              <em className="text-[#8B4513]">Alex</em>
            </p>
            <VintageOrnament size="sm" symbol="✦" />

            <div className="mb-8 text-left">
              <h2 className="text-3xl font-semibold mb-4 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>👥 Participants</h2>
              <ul className="list-none space-y-2 text-[#A0522D]" style={{fontFamily: 'Georgia, serif'}}>
                <li className="flex items-center gap-2">
                  <span className="text-[#CD853F]">✦</span>
                  Alex
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#CD853F]">✦</span>
                  Maria
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#CD853F]">✦</span>
                  Jordan
                </li>
              </ul>
            </div>

            <div className="mb-8 text-left">
              <h2 className="text-3xl font-semibold mb-6 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>🖼️ Memories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <img
                  src="https://source.unsplash.com/400x300/?vintage,summer"
                  alt="vintage summer"
                  className="rounded-2xl shadow-xl border-4 border-[#e8d5b7] transition-transform hover:scale-105"
                />
                <img
                  src="https://source.unsplash.com/400x300/?retro,friends"
                  alt="vintage friends"
                  className="rounded-2xl shadow-xl border-4 border-[#e8d5b7] transition-transform hover:scale-105"
                />
              </div>
            </div>

            <div className="mb-8 text-left">
              <h2 className="text-3xl font-semibold mb-4 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>
                📜 A Note from the Past
              </h2>
              <div className="bg-gradient-to-br from-[#fefcf8] to-[#f8f3ec] p-6 rounded-2xl shadow-inner border-4 border-[#e8d5b7]">
                <p className="italic text-[#8B4513] text-lg leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
                  "To the best summer ever. Long nights, beach bonfires, and mixtapes.
                  Can't wait to open this again in 10 years and remember it all."
                </p>
              </div>
            </div>

            <VintageOrnament size="sm" symbol="✦" />
            
            <div className="text-center mt-8">
              <p className="text-lg text-[#A0522D] italic" style={{fontFamily: 'Georgia, serif'}}>
                This is just a demo. Create your own capsule to start preserving
                precious memories.
              </p>
            </div>
          </VintageContainer>
        </div>
      </section>
    </main>
  );
}

export default DemoCapsule;
