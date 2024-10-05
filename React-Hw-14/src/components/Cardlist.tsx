import React from "react";
import Button from "./button";
import Inputs from "./Input";
import className from "../utils/ClassName";

interface Alarm {
    'Alarm Title': string;
    'Alarm Discription': string;
    'Alarm Time': string;
}
interface Icardlist {
    alarms: Alarm[]
    Editealarm: (index: number, updatedAlarm: Alarm) => void;
    deletealarm: (_: number) => void

}
const Cardlist: React.FC<Icardlist> = ({ alarms, deletealarm, Editealarm }) => {
    const [editIndex, setEditIndex] = React.useState<number | null>(null);
    const [trueFalse, settrueFalse] = React.useState<boolean | undefined>(true)
    const [editValues, setEditValues] = React.useState<Alarm>(
        {
            'Alarm Title': '',
            'Alarm Discription': '',
            'Alarm Time': ''
        }
    )
    const [error, setError] = React.useState<{
        'Alarm Title': string,
        'Alarm Discription': string,
        'Alarm Time': string
    }>({ "Alarm Discription": "", "Alarm Time": "", "Alarm Title": "" })
    const trueOrFalse = (value: {
        'Alarm Title': string;
        'Alarm Discription': string;
        'Alarm Time': string;
    }) => {

        if (value["Alarm Discription"] !== "" || value["Alarm Time"] !== "" || value["Alarm Title"] !== "") {
            return true
        }
        else if (value["Alarm Discription"] == "" && value["Alarm Time"] == "" && value["Alarm Title"] == "") {
            return false
        }

    }
    const handleEditClick = (index: number) => {
       if (editIndex === index) {
            setEditIndex(null)
        } else {
            setEditIndex(index)
        }
        setEditValues(alarms[index]); 
    };
    const handleInputChange = (field: keyof Alarm, value: string) => {
        setEditValues({ ...editValues, [field]: value });
        const newError = { ...error };
        if (field === 'Alarm Time') {

            if (value.trim() === "") {
                newError[field] = "This field is required"
            } else if (isNaN(Number(value)) && !value.includes(":")) {
                newError[field] = "This field must be a number"
            } else if (!value.includes(":")) {
                newError[field] = "Enter with 00:00 format"
            } else {
                newError[field] = ""
            }

        }
        
        if (field === 'Alarm Title') {

            if (value.trim() === "") {
                newError[field] = "This field is required"
            } else if (value.length < 6) {
                newError[field] = "This field must be longer than 6 characters "
            } else {
                newError[field] = ""
            }
        }
        if (field === 'Alarm Discription') {
            if (value.trim() === "") {
                newError[field] = "This field is required"
            } else if (value.length < 8) {
                newError[field] = "This field must be longer than 6 characters "
            } else {
                newError[field] = ""
            }
        }
        setError(newError);
        settrueFalse(trueOrFalse(newError))

    };
    const handleSubmit = () => {
        if (editIndex !== null) {
            Editealarm(editIndex, editValues);
            setEditIndex(null); //
        }


    };


    return (
        <>
            <div className="w-full h-[310px] overflow-y-scroll no-scrollbar flex flex-col gap-3 max-h-72 shadow-3xln rounded-md md:mt-3 p-2">
                {!alarms ? "we have,nt alarm" : alarms.map((index, num) => {
                    return <div className={className(
                        "h-auto max-h-fit border-2 border-dotted border-purple-600",
                        " text-slate-200 rounded-lg px-2 py-2 bg-slate-800 bg-cloock bg-card",
                        "flex flex-col gap-y-2 "
                    )}>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                            <img src="src/assets/clock-svgrepo-com-wh.svg" className="w-14 hidden md:block" />
                            <div className="bg-slate-900 border-2 w-full border-slate-300 px-2 py-2 rounded-md text-xs font-bold flex flex-col gap-x-6 gap-y-[6px]">
                                <div className="flex flex-row gap-x-2 w-full">
                                    <p className="bg-purple-300 px-2 rounded-full text-slate-900 overflow-x-scroll no-scrollbar border-2 border-purple-500 ">Title : <span className="font-medium" >{index["Alarm Title"]}</span></p>
                                    <p className="bg-purple-400 px-2 rounded-full text-slate-900 overflow-x-scroll no-scrollbar border-2 border-purple-600">Time : <span className="font-medium">{index["Alarm Time"]}</span></p>
                                </div>
                                <div className="bg-purple-200 px-2 rounded-md pt-1 text-black overflow-y-scroll h-6 no-scrollbar border-2 border-purple-400"><span className="font-medium">Discription : {index["Alarm Discription"]}</span></div>
                            </div>
                            <div className="w-full md:w-3/12 grid grid-cols-1 justify-items-center  gap-y-1  h-full">
                                <Button
                                    onClick={() => handleEditClick(num)}
                                    label="Edit"
                                    className="bg-[#e9d5ff] hover:bg-blue-200 text-blue-700 border-2 border-blue-700 m-0 h-full max-h-8" />
                                <Button
                                    onClick={() => deletealarm(num)}
                                    label="Delete"
                                    className="bg-[#e9d5ff] hover:bg-red-200 border-2 border-red-700 text-red-700 m-0 h-full" />
                            </div>
                        </div>
                        {
                            editIndex === num ?
                                <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-x-1 ">
                                    <Inputs
                                        error={error["Alarm Title"]}
                                        value={editValues["Alarm Title"]}
                                        onChange={(event) => handleInputChange('Alarm Title', event.target.value)}
                                        placeholder="Alarm Title"
                                        className="font-bold pl-2 text-sm" />
                                    <Inputs
                                        error={error["Alarm Discription"]}
                                        value={editValues["Alarm Discription"]}
                                        onChange={(event) => handleInputChange('Alarm Discription', event.target.value)}
                                        placeholder="Alarm Discription"
                                        className="pl-2 text-sm border-2 border-slate-900" />
                                    <Inputs
                                        error={error["Alarm Time"]}
                                        value={editValues["Alarm Time"]}
                                        onChange={(event) => handleInputChange('Alarm Time', event.target.value)}
                                        placeholder="Alarm Time"
                                        className="pl-2 text-sm border-2 border-slate-900" />
                                    <Button label="Submit" disabled={trueFalse} className="h-7 mt-2 bg-green-500 hover:bg-green-600" onClick={handleSubmit} />

                                </div> : ""
                        }
                    </div>
                })}
            </div>
        </>
    )
}

export default Cardlist