import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, UpdateToPaste } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [seachParams, setSeachParams] = useSearchParams();
  const pasteId = seachParams.get("pasteId");

  const dispatch = useDispatch()

  function createPaste(){
    const paste = {
      title : title,
      content: value,
      _id: pasteId || 
           Date.now().toString(36),
      cretaedAt: new Date().toISOString(),
    }
    if(pasteId){
      // update
      dispatch(UpdateToPaste(paste))
    } else{
      //create
      dispatch(addToPaste(paste))
    }
    // after creation or updation
    setTitle('');
    setValue('');
    setSeachParams('');

  }

  return (
    <div>
      <div className="flex flex-row gap-7 bg-black text-white place-content-between">
        <input
          className="p-1 rounded-2xl mt-2 w-[66%] pl-3"
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createPaste} className="p-2 rounded-2xl mt-2 bg-red-600 cursor:pointer">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div className="mt-8 bg-black text-white">
        <textarea
        className="rounded-2xl mt-4 min-w-[500px] p-4 "
        value={value}
        placeholder="enter content here"
        onChange={(e)=> setValue(e.target.value)} rows={20}/>
      </div>
    </div>
  );
};

export default Home;
