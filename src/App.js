import { CiSquarePlus } from "react-icons/ci";
import { useState, useEffect, useRef } from "react";
import Popup from "./Popup";
import List from "./List";

function App() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lists, setLists] = useState([]);
  const [order, setOrder] = useState("date-asc");

  useEffect(() => {
    updateLists();
  }, [])

  const handleChangeOrder = (event) => {
    setOrder(event.target.value);
  }

  useEffect(() => {
    function compare(a, b) {
      switch (order) {
        case 'date-asc': {
          if (a.created < b.created) {
            return -1;
          }
          if (a.created > b.created) {
            return 1;
          }
        }
        case 'date-desc': {
          if (a.created < b.created) {
            return 1;
          }
          if (a.created > b.created) {
            return -1;
          }
        }
        case 'name-asc': {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
        }
        case 'name-desc': {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
        }
      }
    }
    setLists((prevLists) => [...prevLists].sort(compare));
    console.log(order);
  }, [order])

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
        name: name,
        created: (new Date()).toString()
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          updateLists(); // Fetch updated lists after adding a new list
        } else {
          console.error("Error adding list:");
        }
      })
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
        }
      })
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
        listId: listId,
        created: (new Date()).toString()
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          updateLists(); // Fetch updated lists after adding a new list
        } else {
          console.error("Error adding list:");
        }
      })
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
        }
      })
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
        }
      })
  }

  const editListName = (values, listId, itemId) => {
    const name = values['name'];
    fetch("static/api/changelistname.php", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        listId: listId
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          updateLists(); // Fetch updated lists after adding a new list
        } else {
          console.error("Error adding list:");
        }
      })
  }

  return (
    <div className='h-screen w-screen max-w-full bg-white flex items-center justify-center'>
      <h1 className='fixed top-2 font-bold text-5xl'>
        Todo List
      </h1>
      <div className="h-3/4 w-5/6 bg-slate-500 rounded-2xl flex flex-col items-center justify-start">
        <div className="h-[5%] w-full flex justify-end">
          <select onChange={handleChangeOrder} className="m-2 h-full" defaultValue="date-asc">
            <option value="date-asc">Date Ascending</option>
            <option value="date-desc">Date Descending</option>
            <option value="name-asc">Name Ascending</option>
            <option value="name-desc">Name Descending</option>
          </select>
          <CiSquarePlus onClick={openPopup} className="m-2 text-green-400 text-3xl cursor-pointer" />
          {isPopupOpen && <Popup title={"Create List"} input={["name"]} onClose={closePopup} buttonFunction={"Create"} onClick={createList} />}
        </div>
        <div className='h-[95%] w-full flex items-center justify-start'>
          {lists ?
            lists.map(list => <List list={list} onDelete={deleteList} onAdd={addListItem} onEdit={editListName} onDeleteItem={deleteListItem} onChangeChecked={changeListItemChecked} key={list.id} />)
            : <div></div>}
        </div>
      </div>
    </div>
  );
}

export default App;
