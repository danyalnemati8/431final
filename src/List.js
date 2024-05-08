import { RxCross1 } from "react-icons/rx";
import { CiSquarePlus } from "react-icons/ci";

const List = () => {
    return (
        <div className="h-[90%] w-1/5 flex flex-col justify-start items-center m-3 bg-white rounded-2xl">
            <div className="h-[10%] w-full m-1 flex items-center">
                <CiSquarePlus className="h-1/2 w-1/5 text-green-600"/>
                <h2 className="h-2/3 w-3/5 text-center text-black text-xl">
                    List Name
                </h2>
                <RxCross1 className="h-1/2 w-1/5 text-red-600"/>
            </div>
            <div className="h-[90%] w-full text-center flex flex-col justify-start items-center">
                <ListItem />
            </div>
        </div>
    )
}

const ListItem = () => {
    const handleDelete = () => {
        console.log("Delete clicked")
    }
    return (
        <div className="w-5/6 h-1/6 flex justify-between items-center bg-blue-400 p-2 rounded-xl">
            <div className="h-full flex justify-center items-center w-4/5">
                <h3 className="text-black">Item Name</h3>
            </div>
            <div className="flex flex-col justify-between items-center h-full w-1/5">
                <RxCross1 className="text-red-600" />
                <input type="checkbox" />
            </div>
        </div>
    )
}

export default List