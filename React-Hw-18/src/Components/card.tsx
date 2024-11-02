import { useSelector } from 'react-redux';
import { cartActions } from '../Redux/features/cartSlice';
import { useAppDispatch } from '../Redux/Hook';
import type { Icard } from '../Types/Card.type';
import { IoStar } from 'react-icons/io5';
import { RootState } from '../Redux/Store';

interface Iitems {
  item: Icard;
  AddorRemove: boolean;
}
export const Carditem: React.FC<Iitems> = ({ item, AddorRemove }) => {
  const dispatch = useAppDispatch();
  const Logi = useSelector((state: RootState) => state.cart);

  const removeOnclickHandler = (id: Icard) => {
    dispatch(cartActions.removeFromCart(id.id));
    console.log(Logi);
  };
  const addOnclickHandler = (id: Icard) => {
    dispatch(cartActions.addToCart(id));
  };

  return (
    <>
      {item && (
        <div
          className="w-full mx-auto max-w-[300px] border border-slate-400 space-y-2 text-slate-800 bg-white flex flex-col h-full max-h-[450px] justify-center items-center px-3"
          key={item.id}
        >
          <img className="max-h-60 w-fit" src={item.images[0]} alt="" />
          <p className="text-center font-bold text-sm">{item.title}</p>
          <p className="w-full text-center text-sm">
            <span className="font-semibold">price:</span>
            {item.price}$
          </p>
          <p
            className="w-full truncate overflow-hidden text-sm "
            title={item.description}
          >
            {item.description}
          </p>
          <div className="grid grid-cols-2 py-4 gap-2 space-x-2 ">
            {AddorRemove == true ? (
              <button
                onClick={() => addOnclickHandler(item)}
                className="bg-blue-600 font-semibold text-white px-3 py-2 hover:bg-blue-500 cursor-pointer"
              >
                Add to Cart
              </button>
            ) : (
              <button
                onClick={() => removeOnclickHandler(item)}
                className="bg-red-500 font-semibold text-white px-3 py-2 hover:bg-blue-500 cursor-pointer"
              >
                Remove
              </button>
            )}
            <p className="text-center font-bold text-xs inline-flex items-center gap-x-2  text-orange-500">
              rating: {item.rating}
              <IoStar className="w-4 h-4" />
            </p>
          </div>
        </div>
      )}
    </>
  );
};
