import { useAppSelector } from '../Redux/Hook';
import { RootState } from '../Redux/Store';
import React from 'react';
import { Carditem } from '../Components/card';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Sellcomp from '../Components/Modal Dialogs';
const zodSell = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  mail: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(?:\+98|0098|98)?9\d{9}$/, 'Invalid phone number'),
  address: z.string().min(1, 'Address is required'),
});

type ISell = z.infer<typeof zodSell>;

const ShoppingCart: React.FC = () => {
  const [modal, setmodal] = React.useState<boolean>(false);
  const [data, setdata] = React.useState<any>();
  const sellform = useForm<ISell>({
    resolver: zodResolver(zodSell),
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<ISell> = data => {
    setdata(data);
    setmodal(true);
    setTimeout(() => {
      setmodal(false);
    }, 5000);
  };

  const Products = useAppSelector((state: RootState) => state.cart);
  console.log(Products);

  return (
    <main className="grid grid-cols-1 md:inline-flex w-full md:mt-20">
      <form
        onSubmit={sellform.handleSubmit(onSubmit)}
        className="w-full md:max-w-[30%] bg-slate-700 h-screen flex flex-col p-4 gap-2 mt-20 md:mt-0 "
      >
        <div className="flex flex-col gap-2 w-full">
          <label className="text-lg font-semibold text-white" htmlFor="">
            First Name
          </label>
          <input
            {...sellform.register('firstname')}
            className="border border-slate-100 bg-slate-300  px-2 "
            type="text"
            placeholder="First Name"
          />
          {sellform.formState.errors.firstname && (
            <p className="text-xs text-red-400">
              {sellform.formState.errors.firstname?.message}
            </p>
          )}
          <label className="text-lg font-semibold text-white" htmlFor="">
            Last Name
          </label>
          <input
            {...sellform.register('lastname')}
            className="border border-slate-100 bg-slate-300  px-2 "
            type="text"
            placeholder="Last Name"
          />
          {sellform.formState.errors.lastname && (
            <p className="text-xs text-red-400">
              {sellform.formState.errors.lastname?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-lg font-semibold text-white" htmlFor="">
            Email
          </label>
          <input
            {...sellform.register('mail')}
            className="border border-slate-100 bg-slate-300  px-2 "
            type="text"
            placeholder="Email"
          />
          {sellform.formState.errors.mail && (
            <p className="text-xs text-red-400">
              {sellform.formState.errors.mail?.message}
            </p>
          )}
          <label className="text-lg font-semibold text-white" htmlFor="">
            Phone Number
          </label>
          <input
            {...sellform.register('phone')}
            className="border border-slate-100 bg-slate-300  px-2 "
            type="text"
            placeholder="Phone Number"
          />
          {sellform.formState.errors.phone && (
            <p className="text-xs text-red-400">
              {sellform.formState.errors.phone?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-lg font-semibold text-white" htmlFor="">
            Address
          </label>
          <input
            {...sellform.register('address')}
            className="border border-slate-100 bg-slate-300  px-2 h-[150px] placeholder:text-start "
            type="text"
            placeholder="Address"
          />{' '}
          {sellform.formState.errors.address && (
            <p className="text-xs text-red-400">
              {sellform.formState.errors.address?.message}
            </p>
          )}
        </div>
        <input
          type="submit"
          className="bg-green-500 text-white p-2 mt-10 cursor-pointer hover:bg-green-400"
        />
      </form>
      <div className="flex flex-col w-full md:max-w-[70%] h-screen bg-slate-300 p-4 ">
        <p className="text-lg font-semibold w-full text-slate-800 pb-2">
          Selected items
        </p>
        <div className=" w-full grid gap-3 grid-cols-1 h-screen overflow-y-scroll lg:grid-cols-2 no-scrollbar">
          {Products.products.map(el => (
            <Carditem AddorRemove={false} key={el.id} item={el} />
          ))}
        </div>
      </div>
      {modal && <Sellcomp data={data} />}
    </main>
  );
};
export default ShoppingCart;
