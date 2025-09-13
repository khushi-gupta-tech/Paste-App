import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((store) => store.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      {/* Search Bar */}
      <input
        className="w-full p-3 rounded-lg bg-gray-800 text-white 
                   placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
        type="search"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Paste Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste?._id}
              className="bg-gray-900 text-white rounded-xl shadow-lg p-5 flex flex-col justify-between"
            >
              {/* Title */}
              <h3 className="text-xl font-bold text-yellow-400 mb-2">
                {paste.title}
              </h3>

              {/* Content preview */}
              <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                {paste.content}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`/?pasteId=${paste?._id}`}
                  className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-sm transition"
                >
                  Edit
                </a>
                <a
                  href={`pastes/${paste?._id}`}
                  className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-white text-sm transition"
                >
                  View
                </a>
                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white text-sm transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                  }}
                  className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-gray-900 text-sm transition"
                >
                  Copy
                </button>
                <button
                  onClick={async () => {
                    const shareUrl = `${window.location.origin}/pastes/${paste?._id}`;
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: paste.title,
                          text: "Check out this paste I created!",
                          url: shareUrl,
                        });
                        toast.success("Shared successfully!");
                      } catch (error) {
                        toast.error("Sharing cancelled or failed");
                      }
                    } else {
                      // Fallback for browsers that don’t support Web Share API
                      navigator.clipboard.writeText(shareUrl);
                      toast.success("Link copied to clipboard!");
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-white text-sm transition"
                >
                  Share
                </button>
              </div>

              {/* Date */}
              <p className="text-xs text-gray-400 mt-3">
                {new Date(paste.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center mt-10">
            No pastes found. Create one!
          </p>
        )}
      </div>
    </div>
  );
};

export default Paste;
