function DemoCapsule() {
  return (
    <div className="bg-[#fffdf8] min-h-screen py-12 px-6 font-serif text-gray-800">
      <div className="max-w-4xl mx-auto bg-[#f3eee5] p-8 rounded-lg shadow-md border border-[#e2d9cb]">
        <h1 className="text-4xl font-bold mb-4 text-center">
          🎁 Our Summer 1999
        </h1>
        <p className="text-center mb-6 text-sm text-gray-600">
          Unlocked on: <strong>July 1st, 2024</strong> • Created by:{" "}
          <em>Alex</em>
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">👥 Participants</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Alex</li>
            <li>Maria</li>
            <li>Jordan</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">🖼️ Memories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <img
              src="https://source.unsplash.com/400x300/?vintage,summer"
              alt="vintage summer"
              className="rounded shadow-sm border"
            />
            <img
              src="https://source.unsplash.com/400x300/?retro,friends"
              alt="vintage friends"
              className="rounded shadow-sm border"
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            📜 A Note from the Past
          </h2>
          <p className="italic bg-white p-4 rounded shadow-inner border">
            “To the best summer ever. Long nights, beach bonfires, and mixtapes.
            Can’t wait to open this again in 10 years and remember it all.”
          </p>
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-gray-600">
            This is just a demo. Create your own capsule to start preserving
            memories.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DemoCapsule;
