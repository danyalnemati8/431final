import { CiSquarePlus } from "react-icons/ci";
import { useState, useEffect } from "react";
import Popup from "./Popup";
import List from "./List";

function App() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(()=> {
    updateLists();
  }, [])

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const updateLists = () => {
    fetch("static/api/getlists.php", {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => setLists(json))
  }

  const createList = (values) => {
    const name = values['name']
    fetch("static/api/addlist.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name
      })
    })
    updateLists();
  }

  return (
    <div className='h-screen w-screen max-w-full bg-white flex items-center justify-center'>
      <h1 className='fixed top-2 font-bold text-5xl'>
        Todo List
      </h1>
      <div className="h-3/4 w-5/6 bg-slate-500 rounded-2xl flex flex-col items-center justify-start">
        <div className="h-[5%] w-full flex justify-end">
          <CiSquarePlus onClick={openPopup} className="m-2 text-green-400 text-3xl cursor-pointer" />
          {isPopupOpen && <Popup title={"Create List"} input={["name"]} onClose={closePopup} buttonFunction={"Create"} onClick={createList} />}
        </div>
        <div className='h-[95%] w-full flex items-center justify-start'>
          {lists ? 
          lists.map(list => <List list={list}/>)
          :<div></div>}
        </div>
      </div>
    </div>
  );
}

export default App;
