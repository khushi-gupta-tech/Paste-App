import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((store) => store.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="text-center text-gray-400 mt-20 text-xl">
        ❌ Paste not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 rounded-2xl shadow-lg">
      {/* Title */}
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">
        {paste.title}
      </h2>

      {/* Content */}
      <div className="bg-gray-800 text-white rounded-lg p-5 font-mono text-sm overflow-x-auto">
        <pre className="whitespace-pre-wrap">{paste.content}</pre>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-gray-400 text-sm">
        <span>📅 {new Date(paste.createdAt).toLocaleString()}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(paste.content);
          }}
          className="px-4 py-2 rounded-lg bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default ViewPaste;
