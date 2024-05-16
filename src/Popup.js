import React from 'react';
import { useRef } from 'react';
import { RxCross1 } from "react-icons/rx";
import './Popup.css';

const Popup = ({ title, input, buttonFunction, onClose,  onClick, id }) => {
    const refs = useRef({});

    const handleClick = () => {
        const values = {};
        for(let key in refs.current) {
            values[key] = refs.current[key].value;
        }
        onClick(values, id);
        onClose();
    }

    return (
        <div className="popup-container">
            <div className="popup flex flex-col justify-center items-end h-[50%] w-[50%] p-5">
                <RxCross1 onClick={onClose} className='h-[10%] text-5xl text-red-600 cursor-pointer'/>
                <div className='flex flex-col justify-between items-center h-[100%] w-full'>
                    <h2 className='text-3xl'>{title}</h2>
                    {input ? 
                    input.map(item => <div key={input} className='flex text-2xl'>
                    <p>{item}:</p>
                    <input type='text' ref={ref => refs.current[item] = ref}></input>
                    </div>)
                    :<div></div>}
                    <button className='bg-black text-white rounded-xl p-3 hover:text-black hover:bg-white border-black border-solid border-2 transition-colors duration-300' onClick={handleClick}>{buttonFunction}</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;