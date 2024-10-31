import { RootState } from './redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { crudActions, Ifilm } from './redux/features/crudslice';
import { useState } from 'react';

function App() {
  const [id, setid] = useState<number>(0);
  const [sortField, setSortField] = useState<'name' | 'genre' | 'rate'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const dispatch = useDispatch();
  const List = useSelector((state: RootState) => state.Crud);
  console.log(List);

  const filmList = useForm<Ifilm>();
  const onsubmit: SubmitHandler<Ifilm> = form => {
    form.id = id;
    setid(id + 1);
    console.log(form.id);

    dispatch(crudActions.addFilm(form));
  };

  const onClickRemoveHandler = (id: any) => {
    dispatch(crudActions.removeFilm(id));
  };

  const sortedFilmList = [...List.filmList].sort((a, b) => {
    let comparison = 0;

    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'genre') {
      comparison = a.genre.localeCompare(b.genre);
    } else if (sortField === 'rate') {
      comparison = a.rate - b.rate;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const toggleSortDirection = (field: 'name' | 'genre' | 'rate') => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <main>
      <form
        onSubmit={filmList.handleSubmit(onsubmit)}
        className="w-full inline-flex gap-x-3 items-start p-4 justify-center h-fit bg-slate-300"
      >
        <div className="flex flex-col">
          <div className="inline-flex">
            <label className="font-semibold">Film Name</label>
            <input
              className="border rounded-md p-1 border-slate-700"
              {...filmList.register('name', {
                required: 'Film Name is required',
              })}
            />
          </div>
          {filmList.formState.errors.name && (
            <span className="text-red-500 text-xs">
              {filmList.formState.errors.name.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <div className="inline-flex">
            <label className="font-semibold">Genre</label>
            <input
              className="border rounded-md p-1 border-slate-700"
              {...filmList.register('genre', { required: 'Genre is required' })}
            />
          </div>
          {filmList.formState.errors.genre && (
            <span className="text-red-500 text-xs">
              {filmList.formState.errors.genre.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <div className="inline-flex">
            <label className="font-semibold">Rate</label>
            <input
              className="border rounded-md p-1 border-slate-700"
              {...filmList.register('rate', {
                required: 'Rate is required',
                min: { value: 1, message: 'Rate must be at least 1' },
                max: { value: 10, message: 'Rate cannot exceed 10' },
              })}
            />
          </div>
          {filmList.formState.errors.rate && (
            <span className="text-red-500 text-xs">
              {filmList.formState.errors.rate.message}
            </span>
          )}
        </div>
        <input
          type="submit"
          className="border bg-slate-500 py-1 px-3 ml-6 rounded-md border-slate-700 font-semibold text-white"
        />
      </form>
      <div className="w-full bg-slate-700">
        <div className="flex flex-col bg-slate-100 h-screen w-full max-w-[800px] m-auto">
          <section className="inline-flex items-center p-2 ">
            <p className=" rounded-md p-1 w-full max-w-[240px] font-semibold text-lg">
              Film Name
              <hr className="border- mt-2 border-purple-950" />
            </p>
            <p className=" rounded-md p-1 w-full max-w-[240px] font-semibold text-lg ">
              Genre
              <hr className="border- mt-2 border-purple-950" />
            </p>
            <p className="rounded-md p-1 w-full max-w-[320px] font-semibold text-lg">
              Rate
              <hr className="border- mt-2 border-purple-950" />
            </p>
          </section>
          {sortedFilmList.map(el => {
            return (
              <section className="inline-flex items-end p-2  ">
                <p
                  onClick={() => toggleSortDirection('name')}
                  className=" rounded-md p-1 w-full max-w-[240px]"
                >
                  {el.name}{' '}
                  <hr className="border- mt-2 border-purple-700 opacity-50" />
                </p>
                <p
                  onClick={() => toggleSortDirection('genre')}
                  className=" rounded-md p-1 w-full max-w-[240px] "
                >
                  {el.genre}{' '}
                  <hr className="border- mt-2 border-purple-700 opacity-50" />
                </p>
                <p
                  onClick={() => toggleSortDirection('rate')}
                  className="rounded-md p-1 w-full max-w-[240px]"
                >
                  {el.rate}
                  <hr className="border- mt-2 border-purple-700 opacity-50" />
                </p>
                <div className="w-full max-w-[80px] p-1">
                  <button
                    onClick={() => onClickRemoveHandler(el.id)}
                    className=" bg-red-500 p-1 rounded-md w-full"
                  >
                    Delete
                  </button>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default App;
