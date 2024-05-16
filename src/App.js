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

  const createList = (values, listId, itemId) => {
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
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          updateLists(); // Fetch updated lists after adding a new list
        } else {
          console.error("Error adding list:");
        }})
  }

  const deleteList = (values, listId, itemId) => {
    fetch("static/api/deletelist.php", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: listId
      })
    })
      .then((response) => response.json())
      .then((data) => {
      if (data.success) {
        updateLists(); // Fetch updated lists after adding a new list
      } else {
        console.error("Error adding list:");
      }})
  }

  const addListItem = (values, listId, itemId) => {
    const name = values['name']
    fetch("static/api/addlistitem.php", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        itemName: name,
        listId: listId
      })
    })
    .then((response) => response.json())
    .then((data) => {
    if (data.success) {
      updateLists(); // Fetch updated lists after adding a new list
    } else {
      console.error("Error adding list:");
    }})
  }

  const deleteListItem = (listId, itemId) => {
    fetch("static/api/deletelistitem.php", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        listId: listId,
        itemId: itemId
      })
    })
    .then((response) => response.json())
    .then((data) => {
    if (data.success) {
      updateLists(); // Fetch updated lists after adding a new list
    } else {
      console.error("Error adding list:");
    }})
  }

  const changeListItemChecked = (listId, itemId, checked) => {
    fetch("static/api/changelistitemchecked.php", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        listId: listId,
        itemId: itemId,
        checked: checked
      })
    })
    .then((response) => response.json())
    .then((data) => {
    if (data.success) {
      updateLists(); // Fetch updated lists after adding a new list
    } else {
      console.error("Error adding list:");
    }})
  }

  return (
    <div className='h-screen w-screen max-w-full bg-white flex items-center justify-center'>
      <h1 className='fixed top-2 font-bold text-5xl'>
        Todo List
      </h1>
      <div className="h-3/4 w-5/6 bg-slate-500 rounded-2xl flex flex-col items-center justify-start">
        <div className="h-[5%] w-full flex justify-end">
          <CiSquarePlus onClick={openPopup} className="m-2 text-green-400 text-3xl cursor-pointer" />
          {isPopupOpen && <Popup title={"Create List"} input={["name"]} onClose={closePopup} buttonFunction={"Create"} onClick={createList}/>}
        </div>
        <div className='h-[95%] w-full flex items-center justify-start'>
          {lists ? 
          lists.map(list => <List list={list}  onDelete={deleteList} onAdd={addListItem} onDeleteItem={deleteListItem} onChangeChecked={changeListItemChecked} key={list.id}/>)
          :<div></div>}
        </div>
      </div>
    </div>
  );
}

export default App;
