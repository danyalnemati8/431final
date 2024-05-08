

const List = () => {
    return (
        <div className="h-[90%] w-1/5 flex flex-col justify-start items-center m-3 bg-black rounded-2xl">
            <h2 className="h-[10%] w-full text-center text-white m-1">
                List Name
            </h2>
            <div className="h-[90%] w-full text-center flex flex-col justify-start items-center">
                <ListItem/>
            </div>
        </div>
    )
}

const ListItem = () => {
    return (
        <div className="w-5/6 h-1/6 flex justify-between items-center bg-red-200 p-2 rounded-xl">
            <h3 className="text-white">Item Name</h3>
            <input type="checkbox"/>
        </div>
    )
}

export default List