import ClassName from "../utils/ClassName";

interface IButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    label?: string;
    disabled?:boolean 
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    className?:string

}
const Button: React.FC<IButton> = ({ label,disabled,onClick,className}) => {

    return (
        <>
            <button onClick={onClick} disabled={disabled} className={ClassName("w-full h-8 font-semibold rounded-md",className?className:"")}>{label}</button>
        </>
    )

}

export default Button