import React from 'react';
import { RxCross1 } from "react-icons/rx";
import './Popup.css';

const Popup = ({ title, input, onClose }) => {
    return (
        <div className="popup-container">
            <div className="popup flex flex-col justify-center items-end h-[50%] w-[50%] p-5">
                <RxCross1 onClick={onClose} className='h-[10%] text-5xl text-red-600 cursor-pointer'/>
                <div className='flex flex-col justify-between items-center h-[100%] w-full'>
                    <h2 className='text-3xl'>{title}</h2>
                    {input ? 
                    input.map(item => <div className='flex text-2xl'>
                    <p>{item}:</p>
                    <input type='text'></input>
                    </div>)
                    :<div></div>}
                    <button className='bg-green-500 text-white rounded-xl p-3 hover:text-green-500 hover:bg-white border-green-500 border-solid border-2' onClick={onClose}>Create</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;