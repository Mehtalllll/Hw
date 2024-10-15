import React from "react";
import { classNames } from "../utils/ClassNames";
interface IInpits extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string
    Error?: string
}
export const Input: React.FC<IInpits> = ({ label, Error, ...props }) => {
    return (
        <div className="space-y-2 pb-3">
            <label className={classNames(
                "font-semibold pl-1 text-sm text-slate-800",
                label ? "block" : "hidden"
            )}>{label}</label>
            <input className={classNames("w-full border-b-2  rounded-sm p-1 text-sm ", !Error ? "border-slate-400" : "border-red-400")} {...props} />
            <p className={classNames(
                "font-normal pl-1 text-xs text-red-500",
                Error ? "block" : "hidden"
            )}>{Error}</p>
        </div>
    )
}