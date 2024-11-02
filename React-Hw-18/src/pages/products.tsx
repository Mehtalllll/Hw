import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../Redux/Hook';
import { RootState } from '../Redux/Store';
import { FetchProducts } from '../api/Listapi';
import { productsSliceactions } from '../Redux/features/productsSlice';
import React from 'react';
import { Carditem } from '../Components/card';

export const Products: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = React.useState<string>('all');
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    0, 1000,
  ]);

  const dispatch = useAppDispatch();

  const productsList = useQuery({
    queryKey: ['initialproduts'],
    queryFn: FetchProducts,
  });

  React.useEffect(() => {
    if (productsList.isSuccess && productsList.data) {
      dispatch(productsSliceactions.addtoListItem(productsList.data.products));
    }
  }, [productsList.isSuccess, productsList.data, dispatch]);

  const Products = useAppSelector(
    (state: RootState) => state.products.products[0],
  );
  console.log(Products);
  const productList = Array.isArray(Products) ? Products : [];
  const filteredProducts = productList.filter(product => {
    const isCategoryMatch =
      categoryFilter === 'all' || product.category === categoryFilter;
    const isPriceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return isCategoryMatch && isPriceMatch;
  });

  return (
    <main className="inline-flex w-full mt-20">
      <div className="w-full max-w-[325px] bg-slate-700 h-screen hidden md:block">
        <div className="w-full max-w-[325px] bg-slate-700 h-screen p-4 hidden md:block">
          <label className="text-white">Filter by Category:</label>
          <select
            className="w-full p-2 mb-4"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
          </select>

          <label className="text-white">Price Range:</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={e =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="w-1/2 p-2 mb-4"
              min="0"
              max="1000"
            />
            <input
              type="number"
              value={priceRange[1]}
              onChange={e =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-1/2 p-2 mb-4"
              min="0"
              max="1000"
            />
          </div>
        </div>
      </div>
      <div className="bg-slate-300 w-full grid gap-y-3 grid-cols-1 h-screen overflow-y-scroll lg:grid-cols-2 xl:grid-cols-3 p-4 no-scrollbar">
        {productsList.isLoading ? (
          <p className="text-5xl text-center">Loading...</p>
        ) : (
          filteredProducts?.map(el => (
            <div className="mx-auto" key={`${el.id}-${Math.random()}`}>
              <Carditem AddorRemove={true} item={el} />
            </div>
          ))
        )}
      </div>
    </main>
  );
};
