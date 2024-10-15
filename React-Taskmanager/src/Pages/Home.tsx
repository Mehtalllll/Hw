import React, { useState } from "react";

import { LoginForm } from "../containers/Login-form";
import { SingupForm } from "../containers/Singup-form";

export const Home: React.FC = () => {
    const [Form, setForm] = useState<1 | 2>(1)
    const ChangeForm = (formnumber: 1 | 2) => {
        setForm(formnumber)
    }
    return (
        <main className="px-2 py-20 bg-slate-200 min-h-screen">
            <section className="max-w-[500px] w-full mx-auto bg-white shadow-lg rounded-md py-4 px-4">

                {Form === 1
                    ? (<>
                        <p className="font-bold text-slate-800 text-2xl">Login</p>
                        <LoginForm />
                        <div className="flex justify-center  text-xs  text-blue-600  font-semibold ">
                            <button className="hover:underline mt-2" onClick={() => ChangeForm(2)}>Signup</button>
                        </div>
                    </>)
                    : (<>
                        <p className="font-bold text-slate-800 text-2xl">Signup</p>
                        <SingupForm />
                        <div className="flex justify-center  text-xs  text-blue-600  font-semibold ">
                            <button className="hover:underline mt-2" onClick={() => ChangeForm(1)}>Login</button>
                        </div>
                    </>)
                }
            </section>
        </main>
    )

}