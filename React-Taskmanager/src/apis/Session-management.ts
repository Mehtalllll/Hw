const SessionKey="Task-Manager-session"

export const getSession=()=>{
    return window.localStorage.getItem(SessionKey)
}
export const setSession=(value:string)=>{
    return window.localStorage.setItem(SessionKey,value)
}
export const delSession=()=>{
    return window.localStorage.removeItem(SessionKey)
}