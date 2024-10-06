import React from "react"
import { data } from "./Assets/data"
interface ICafeData {
  name: string;
  img: string;
  price: number;
  quantity: number;
} 
function App() {
  const [Total, setTotal] = React.useState<number>(0)
  const [CafeData, setCafeData] = React.useState<ICafeData[]>(data)

  const MinusOnclickHandler = (index: number) => {
    setCafeData((prevCafeData)=>{
      const UpdateCafeData=prevCafeData.map((card,i)=>
        i===index && card.quantity>0?{...card, quantity: card.quantity - 1 }:card
    );

    setTotal((prevTotal)=>prevTotal>0?prevTotal-prevCafeData[index].price:prevTotal)

    return UpdateCafeData
    });
    }

  
    const PlusOnclickHandler = (index: number) => {
      // به‌روزرسانی CafeData و Total همزمان
      setCafeData((prevCafeData) => {
        // ابتدا CafeData جدید را ایجاد می‌کنیم
        const updatedCafeData = prevCafeData.map((card, i) =>
          i === index ? { ...card, quantity: card.quantity + 1 } : card
        );
        
        // سپس Total را به‌روزرسانی می‌کنیم
        setTotal((prevTotal) => prevTotal + prevCafeData[index].price);
    
        // داده به‌روزرسانی شده را برمی‌گردانیم
        return updatedCafeData;
      });
    };



  return (
    <div className="container max-w-[1000px]  mx-auto ">
      <div className="bg-[#ececec] pb-14">
        <div className="flex flex-row justify-center items-center gap-x-4 pt-4">
          <img src="src/Assets/logo.png" className="w-[80px]" alt="" />
          <p className="font-extrabold text-4xl">Starbucks</p>
        </div>
          <p className="w-fit mx-auto py-4 font-bold text-lg  text-slate-800">Starbucks Online Coffee Order</p>
        <div className="w-full max-w-96 flex flex-col mx-auto gap-y-4 md:max-w-[1000px] md:px-4 md:flex-row md:justify-around gap-x-2 pt-4 px-10">
          {data ? CafeData.map((card, i) => {
            return (
              <div className="bg-[#1c3a32] flex flex-col w-full md:max-w-40 rounded-lg p-3 gap-y-3 mx-auto">
                <img src={card.img} alt="" className="w-40 mx-auto" />
                <p className="font-semibold text-white text-left">{card.name}</p>
                <p className="text-[#e7c7a1] font-extrabold">${card.price}</p>
                <div className="bg-white w-fit flex flex-row items-center mx-auto">
                  <button
                    onClick={() => MinusOnclickHandler(i)}
                    className="bg-[#e7c7a1] w-8 h-8 hover:bg-[#e5bc8a] font-black">-</button>
                  <p className="px-2">{card.quantity}</p>
                  <button
                  onClick={()=>PlusOnclickHandler(i)}
                    className="bg-[#e7c7a1] w-8 h-8 hover:bg-[#e5bc8a] font-black">+</button>
                </div>
              </div>
            )
          }) : ""}
        </div>
        <p className="w-fit mx-auto py-4 font-bold text-lg text-slate-800 hidden md:block">Bill</p>
        <div className="w-full md:flex flex-row md:flex-row justify-around px-6 gap-x-2 hidden ">
          {data ? CafeData.map((card) => {
            return (
              <div className="bg-[#1c3a32] flex flex-col max-w-40 rounded-lg  p-3 gap-y-3">
                <img src={card.img} alt="" className="w-40 mx-auto" />
                <p className="font-semibold text-white text-left">{card.name}</p>
                <p className="text-[#e7c7a1] font-extrabold">${card.price}</p>
                <p className="text-white font-semibold">Qty:{card.quantity}</p>
              </div>
            )
          }) : ""}
        </div>
        <p className="w-fit mx-auto py-4 font-bold text-lg text-slate-800">Total:${Total}</p>
        <div className="w-full p-4 flex justify-center">
        <button disabled={Total===0?true:false} className="font-bold text-white bg-[#ddb078] w-full max-w-[920px] p-2 text-xl rounded-md hover:bg-[#e1b682]">Submit Order</button>
        </div>
      </div>
    </div>
  )
}

export default App
