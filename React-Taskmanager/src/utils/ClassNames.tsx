export const classNames=(...clases:string[]):string=>{
return clases.filter(Boolean).join(" ")
}