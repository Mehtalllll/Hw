import React from 'react';
interface Iinput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  src: string;
}
const SearchInput: React.FC<Iinput> = ({
  placeholder,
  type,
  className,
  src,
  onChange,
}) => {
  return (
    <div className="relative max-w-[800px] w-full">
      <input
        onChange={el => onChange(el)}
        type={type}
        placeholder={placeholder}
        className={className}
      />
      <img
        src={src}
        alt="Search"
        className="absolute right-3 top-2 w-5 h-5 text-gray-400 cursor-pointer hover:opacity-60"
      />
    </div>
  );
};

export default SearchInput;
