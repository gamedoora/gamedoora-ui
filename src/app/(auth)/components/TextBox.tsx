import { ChangeEvent } from "react";

interface TextBoxProps{
    height: number;
    id: string;
    placeholder: string;
    label: string;
    type: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextBox({id, height,placeholder, label, type, onChange}:TextBoxProps){
    return(
        <div className={`relative w-full`}>
            <input onChange={onChange} type={type} id={id} 
                className={`block px-2.5 pb-2.5 pt-4 w-full h-${height} text-md text-black rounded-md border border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 focus:border-2 peer hover:border-black focus:placeholder-gray-400 placeholder-transparent`} placeholder={placeholder} />
            <label htmlFor={id} 
                className="absolute text-md text-gray-500  duration-150 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3 peer-focus:font-semibold">{label}</label>
        </div>
    );
}