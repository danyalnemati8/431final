import { CiSquarePlus } from "react-icons/ci";
import { useState } from "react";
import Popup from "./Popup";
import List from "./List";

function App() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className='h-screen w-screen max-w-full bg-white flex items-center justify-center'>
      <h1 className='fixed top-2 font-bold text-5xl'>
        Todo List
      </h1>
      <div className="h-3/4 w-5/6 bg-slate-500 rounded-2xl flex flex-col items-center justify-start">
        <div className="h-[5%] w-full flex justify-end">
          <CiSquarePlus onClick={openPopup} className="m-2 text-green-400 text-3xl cursor-pointer"/>
          {isPopupOpen && <Popup title={"Create List"} input={"List Name"} onClose={closePopup} />}
        </div>
        <div className='h-[95%] w-full flex items-center justify-start'>
          <List/>
          <List/>
        </div>
      </div>
    </div>
  );
}

export default App;
