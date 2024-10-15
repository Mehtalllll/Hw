import React from 'react';
import { NewTaskForm } from '../components/NewTak';

export const NewTask: React.FC = () => {
  return (
    <main className="bg-slate-200 min-h-screen w-full p-1">
      <section className="bg-white rounded-lg p-5 mt-4 shadow-md mx-auto w-full max-w-[600px]">
        <p className="font-semibold text-2xl pb-4 text-slate-700">New Task</p>
        <NewTaskForm />
      </section>
    </main>
  );
};
