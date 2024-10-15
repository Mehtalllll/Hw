export const PasswordValidator=(value:string)=>{
    return value.length>=8?"":"password length must be more  then 8"
}