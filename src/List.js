import { RxCross1 } from "react-icons/rx";
import { CiSquarePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import Popup from "./Popup";

const List = ({list, onDelete, onAdd, onDeleteItem, onChangeChecked}) => {
    const [deletePopupOpen, setDeletePopupOpen] = useState(false);
    const [addPopupOpen, setAddPopupOpen] = useState(false);

    const openDeletePopup = () => {
        setDeletePopupOpen(true);
    };
    const closeDeletePopup = () => {
        setDeletePopupOpen(false);
    };

    const openAddPopup = () => {
        setAddPopupOpen(true);
    };
    const closeAddPopup = () => {
        setAddPopupOpen(false);
    };

    return (
        <div className="h-[90%] w-1/5 flex flex-col justify-start items-center m-3 bg-white rounded-2xl">
            <div className="h-[10%] w-full m-1 flex items-center">
                <CiSquarePlus onClick={openAddPopup} className="h-1/2 w-1/5 text-green-600 cursor-pointer" />
                {addPopupOpen && <Popup title={"Add List Item"} onClose={closeAddPopup} input={["name"]} buttonFunction={"Add"} onClick={onAdd} id={list.id}/>}
                <h2 className="h-2/3 w-3/5 text-center text-black text-xl">
                    {list.name}
                </h2>
                <RxCross1 onClick={openDeletePopup} className="h-1/2 w-1/5 text-red-600 cursor-pointer" />
                {deletePopupOpen && <Popup title={"Confirm List Deletion"} onClose={closeDeletePopup} buttonFunction={"Confirm"} onClick={onDelete} id={list.id}/>}
            </div>
            <div className="h-[90%] w-full text-center flex flex-col justify-start items-center">
                {list.items ?
                list.items.map(item => <ListItem item={item} listId={list.id} onDelete={onDeleteItem} onChangeChecked={onChangeChecked}/>)
                :<div></div>}
            </div>
        </div>
    )
}

const ListItem = ({item, listId, onDelete, onChangeChecked}) => {
    //const [isPopupOpen, setIsPopupOpen] = useState(false);

    /*const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };*/

    const handleDelete = () => {
        onDelete(listId, item.id);
    }

    const handleCheck = ({target}) => {
        console.log(target.checked)
        onChangeChecked(listId, item.id, target.checked);
    }

    return (
        <div className={"w-5/6 h-1/6 flex justify-between items-center p-2 rounded-xl mb-3 " + (item.checked ? "bg-green-400" :  "bg-blue-400")}>
            <div className="h-full flex justify-center items-center w-4/5">
                <h3 className="text-black">{item.name}</h3>
            </div>
            <div className="flex flex-col justify-between items-center h-full w-1/5">
                <RxCross1 onClick={handleDelete} className="text-red-600 cursor-pointer" />
                <input type="checkbox" defaultChecked={item.checked} onClick={handleCheck}/>
            </div>
        </div>
    )
}

export default List