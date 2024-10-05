 const className=(...clases:string[]):string=>{
    return clases.filter(Boolean).join(" ")
}
export default className