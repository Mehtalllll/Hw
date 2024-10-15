import React from "react"
import Button from "./button"
import Inputs from "./Input"
import Cardlist from "./Cardlist";
import MyModal from "./modal";

interface Alarm {
    'Alarm Title': string;
    'Alarm Discription': string;
    'Alarm Time': string;
}

const Form = () => {
    // const [EditalarmsArray, setEditalarmsArray] = React.useState<boolean>(false);

    const [alarms, setAlarms] = React.useState<Alarm[]>([]);
    React.useEffect(() => {
        const storedAlarms = localStorage.getItem('alarms');
        if (storedAlarms) {
          setAlarms(JSON.parse(storedAlarms));
        }
      }, []);
      React.useEffect(() => {
        if (alarms.length > 0) {
          localStorage.setItem('alarms', JSON.stringify(alarms));
        }
      }, [alarms]);
    // localStorage.setItem("Alarm", JSON.stringify(alarms))
    const [modal, setModal] = React.useState<boolean>(false)
    const [modalndex, setModalindex] = React.useState<number>(-1)
    const [trueFalse, settrueFalse] = React.useState<boolean | undefined>(true)
    const [selectedAlarm, setSelectedAlarm] = React.useState<Alarm | null>(null);
    const [values, setValues] = React.useState<{
        'Alarm Title': string,
        'Alarm Discription': string,
        'Alarm Time': string
    }>({ "Alarm Discription": "", "Alarm Time": "00:00", "Alarm Title": "" })
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

    const onchangeHandler = (fieldName: 'Alarm Title' | 'Alarm Discription' | 'Alarm Time', value: string) => {
        const newValue = { ...values }
        newValue[fieldName] = value;
        const newError = { ...error };
        setValues(newValue)

        if (fieldName === 'Alarm Time') {

            if (value.trim() === "") {
                newError[fieldName] = "This field is required"
            } else if (isNaN(Number(value)) && !value.includes(":")) {
                newError[fieldName] = "This field must be a number"
            } else if (!value.includes(":")) {
                newError[fieldName] = "Enter with 00:00 format"
            } else {
                newError[fieldName] = ""
            }

        }

        if (fieldName === 'Alarm Title') {

            if (value.trim() === "") {
                newError[fieldName] = "This field is required"
            } else if (value.length < 6) {
                newError[fieldName] = "This field must be longer than 6 characters "
            } else {
                newError[fieldName] = ""
            }
        }
        if (fieldName === 'Alarm Discription') {
            if (value.trim() === "") {
                newError[fieldName] = "This field is required"
            } else if (value.length < 8) {
                newError[fieldName] = "This field must be longer than 6 characters "
            } else {
                newError[fieldName] = ""
            }
        }
        setError(newError);
        settrueFalse(trueOrFalse(newError))
        console.log(alarms);

    }

    const onsubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        console.log(values);
        setAlarms(prevAlarms => [...prevAlarms, values]);

    }
    const deletealarm = (index: any) => {
        setAlarms(alarms.filter((_, i) => i !== index));
    }
    const Editealarm = (index: number, updatedAlarm: Alarm) => {
        const updatedAlarms = alarms.map((alarm, i) => (i === index ? updatedAlarm : alarm));
        setAlarms(updatedAlarms);
    };
    const SortalarmbyTime = () => {
        const NewAlarms = [...alarms].sort((a, b) => a["Alarm Time"].localeCompare(b["Alarm Time"]))
        setAlarms(NewAlarms)

    }
    const SortalarmbyTitle = () => {
        const NewAlarms = [...alarms].sort((a, b) => a["Alarm Title"].localeCompare(b["Alarm Title"]))
        setAlarms(NewAlarms)

    }

    React.useEffect(() => {
        const timers = alarms.map((alarm, i) => {
            setModalindex(i)
            return setAlarm(alarm["Alarm Time"], alarm)

        });

        return () => {
            timers.forEach(timer => clearInterval(timer));
        };
    }, [alarms]);

    const setAlarm = (targetTime: string, alarm: Alarm) => {
        const checkAlarm = () => {
            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

            if (currentTime === targetTime) {
                setModal(true)
                setSelectedAlarm(alarm);
                clearInterval(intervalId);
            }
        };

        const intervalId = setInterval(checkAlarm, 1000);
        return intervalId
    }


    //   alarms.map(e=>setAlarm(e["Alarm Time"]))


    return (
        <div className='container mx-auto py-8 px-2 h-screen '>
            <div className=' mx-auto w-full max-w-[500px] h-full max-h-screen bg-[#06151c] shadow-3xl rounded-md p-4'>
                <form onSubmit={onsubmitHandler}>
                    <h1 className='text-slate-300 font-semibold text-3xl'>Reminder</h1>
                    <div className='pt-4 flex flex-col gap-y-2'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
                            <Inputs onChange={(event) =>
                                onchangeHandler('Alarm Title', event.target.value)
                            } error={error['Alarm Title']} label='Alarm Title' />
                            <Inputs max={5} onChange={(event) =>
                                onchangeHandler('Alarm Time', event.target.value)
                            } error={error["Alarm Time"]} label='Alarm Time' />
                        </div>
                        <Inputs onChange={(event) =>
                            onchangeHandler('Alarm Discription', event.target.value)
                        } error={error["Alarm Discription"]} className='font-light text-sm pb-8' label='Alarm Discription' />
                        <div className=' w-full flex justify-start'><Button disabled={trueFalse} type="submit" label='Submit' className="bg-green-500 hover:bg-green-600" /></div>
                        <div className="flex flex-row  justify-between py-3  items-end ">
                            <p className="text-slate-300 font-semibold text-xl ">Alarms</p>
                            <div className="w-3/6 flex flex-row justify-start gap-x-4 ">
                                <p className="text-slate-300 font-semibold text-sm ">Sort by :</p>
                                <p onClick={SortalarmbyTime} className="text-purple-500 ml-5 font-normal  hover:text-purple-200 text-xs flex items-end underline mr-3 cursor-pointer">Time</p>
                                <p onClick={SortalarmbyTitle} className="text-purple-500 font-normal hover:text-purple-200 text-xs flex items-end underline mr-3 cursor-pointer">Title</p>

                            </div>
                        </div>
                    </div>
                </form>

                <Cardlist alarms={alarms} Editealarm={Editealarm} deletealarm={deletealarm} />
                {selectedAlarm && (
                    <MyModal
                        alarmIndex={modalndex}
                        deletealarm={deletealarm}
                        shows={modal}
                        Time={selectedAlarm['Alarm Time']}
                        Title={selectedAlarm['Alarm Title']}
                        Discription={selectedAlarm["Alarm Discription"]}
                    />
                )}

            </div>
        </div>
    )
}

export default Form