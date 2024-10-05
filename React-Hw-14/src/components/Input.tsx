import React from "react";
import ClassName from "../utils/ClassName";

interface IInputs extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
    type?: string;
    placeholder?: string
    className?:string
    error?: string;
    max?:number

}
const Inputs: React.FC<IInputs> = ({ label,className,error,max,...Inputs}) => {


    return (
        <div className="flex flex-col gap-y-1 py-1">
            <label className="text-slate-400 text-sm">{label}</label>
            <input
                maxLength={max}
                {...Inputs}
                className={ClassName("bg-purple-200 rounded-md p-1 text-slate-800 font-semibold font-mono", className?className:"")} />
        {error && <p className="w-fit text-red-500 text-[8px] font-semibold pl-1 mt-1">{error}</p>}
        </div>
    )

}

export default Inputs