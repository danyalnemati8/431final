

const List = () => {
    return (
        <div className="h-[90%] w-1/5 flex flex-col justify-start items-center m-3 bg-white rounded-2xl">
            <h2 className="h-[10%] w-full text-center text-black m-1">
                List Name
            </h2>
            <div className="h-[90%] w-full text-center flex flex-col justify-start items-center">
                <ListItem/>
            </div>
        </div>
    )
}

const ListItem = () => {
    const handleDelete = () => {
        console.log("Delete clicked")
    }
    return (
        <div className="w-5/6 h-1/6 flex flex-col justify-between bg-blue-400 p-2 rounded-xl">
            <div className="flex justify-between items-center">
                <h3 className="text-black">Item Name</h3>
                <input type="checkbox"/>
            </div>
            <button className="mt-2 text-black" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default List