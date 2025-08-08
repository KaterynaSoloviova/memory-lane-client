import { NavLink, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="bg-[#fdf7f2] text-gray-800 font-serif min-h-screen">
      {/* Hero section */}
      <section className="text-center py-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 tracking-wide">
          🧳 Memory Lane
        </h1>
        <p className="text-lg mb-8 leading-relaxed">
          A nostalgic place to preserve memories. Create a digital time capsule,
          invite loved ones, add photos and notes — and open it together in the
          future.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <NavLink
            to="/demo"
            className="bg-yellow-100 text-yellow-800 px-6 py-2 rounded shadow hover:bg-yellow-200"
          >
            🎁 See Demo Capsule
          </NavLink>

          <NavLink
            to="/create-capsule"
            className="bg-green-100 text-green-800 px-6 py-2 rounded shadow hover:bg-green-200"
          >
            ✨ Get Started
          </NavLink>

          <button
            onClick={() => navigate("/public")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Public Capsules
          </button>
        </div>
      </section>

      {/* How it works section */}
      <section className="bg-[#f3eee5] py-12 px-6 border-t border-[#e2d9cb]">
        <h2 className="text-3xl font-bold text-center mb-10">How it works</h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl mb-2">📦</div>
            <h3 className="text-xl font-semibold mb-1">Create a Capsule</h3>
            <p>Choose a title, date, and who it's for.</p>
          </div>
          <div>
            <div className="text-4xl mb-2">👨‍👩‍👧‍👦</div>
            <h3 className="text-xl font-semibold mb-1">Invite Others</h3>
            <p>Send an invite to friends or family to join.</p>
          </div>
          <div>
            <div className="text-4xl mb-2">🖼️</div>
            <h3 className="text-xl font-semibold mb-1">Add Content</h3>
            <p>Upload photos, letters, audio, or videos.</p>
          </div>
          <div>
            <div className="text-4xl mb-2">🔓</div>
            <h3 className="text-xl font-semibold mb-1">Unlock Later</h3>
            <p>Open your capsule together on a special date.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
