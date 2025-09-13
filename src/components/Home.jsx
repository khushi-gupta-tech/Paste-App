import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, UpdateToPaste } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [seachParams, setSeachParams] = useSearchParams();

  const pasteId = seachParams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((store) => store.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(UpdateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    // reset
    setTitle("");
    setValue("");
    setSeachParams("");
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 rounded-2xl shadow-lg">
      {/* Title + Button */}
      <div className="flex flex-row gap-4 items-center">
        <input
          className="flex-1 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 
                     focus:ring-2 focus:ring-yellow-400 outline-none"
          type="text"
          placeholder="Enter title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="px-5 py-3 rounded-lg bg-yellow-400 text-gray-900 font-semibold 
                     hover:bg-yellow-300 transition"
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>

      {/* Textarea */}
      <div className="mt-6">
        <textarea
          className="w-full h-[400px] p-4 rounded-lg bg-gray-800 text-white 
                     placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none 
                     resize-none font-mono"
          value={value}
          placeholder="Enter content here..."
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
