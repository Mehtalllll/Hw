import React from "react";
import { Input } from "../components/Inputs";
import { IAuthDto } from "../types/Auth";
import { classNames } from "../utils/ClassNames";
import { UsernameValidator } from "../validators/username-validations";
import { Signup } from "../apis/Auth";
import { AxiosError } from "axios";
import { setSession } from "../apis/Session-management";

export const SingupForm: React.FC = () => {
    const [FirstLoad, setFirstLoad] = React.useState<boolean>(true)
    const [Disable, setDisable] = React.useState<boolean>(true)
    const [Values, setValues] = React.useState<IAuthDto>({
        username: "",
        password: ""
    })
    const [Error, setError] = React.useState<IAuthDto>({
        username: "",
        password: ""
    })
    const [serverError, setserverError] = React.useState<string>("")

    const OnSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        try {
            const response = await Signup(Values)
            setSession(response.token)
            window.location.href = '/test2'
        } catch (error: unknown) {
            const err = error as AxiosError
            console.log(err.response?.data);
            const response = err.response?.data as { message: Array<string> }
            if (Array.isArray(response?.message)) {
                const NewError: IAuthDto = {
                    username: "",
                    password: ""
                };
                for (const msg of response.message) {
                    if (msg.includes("username")) {
                        NewError.username = msg
                    } else if (msg.includes("password")) {
                        NewError.password = msg
                    } else setserverError(msg)

                }
                setError(NewError)
            } else if (typeof response?.message === "string") {
                setserverError(response.message)
            }
        }
    }
    const OnValueChange = (field: keyof IAuthDto, value: string) => {
        const NewValues = { ...Values }
        NewValues[field] = value
        setValues(NewValues)
        console.log(Values);
    }
    React.useEffect(() => {
        if (FirstLoad) {
            setFirstLoad(false)
            return
        }
        const UserNameError = UsernameValidator(Values.username)
        const PasswordError = UsernameValidator(Values.password)
        const NewError: IAuthDto = {
            username: "",
            password: ""
        };
        if (UserNameError) NewError.username = UserNameError
        if (PasswordError) NewError.password = PasswordError
        // if (UserNameError || PasswordError) setDisable(true)
        setDisable(!!UserNameError || !!PasswordError)
        setError(NewError)
        setserverError("")
    }, [Values])
    return (
        <form onSubmit={OnSubmitHandler} className="mt-10">
            <Input
                onChange={(e) => OnValueChange("username", e.target.value)}
                label="UserName"
                placeholder="UserName"
                value={Values.username}
                Error={Error.username}
            />
            <Input
                onChange={(e) => OnValueChange("password", e.target.value)}
                label="password"
                placeholder="password"
                type="password"
                value={Values.password}
                Error={Error.password}
            />
            <button
                disabled={Disable}
                className={classNames(
                    "bg-slate-800 text-white font-semibold p-1",
                    " rounded-sm w-full mt-2 hover:bg-slate-700",
                    "disabled:bg-slate-500"
                )}>Signup</button>
            <p className={classNames(
                "font-normal pl-1 text-xs text-red-500",
                serverError ? "block" : "hidden"
            )}>{serverError}</p>
        </form>
    )

}