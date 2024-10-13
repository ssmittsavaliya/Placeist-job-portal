
import Header from '@/component/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
        <div className="grid-background"></div>
        <main className='min-h-screen container'>
       <Header/>
      <Outlet/>
        </main>
        <div className="p-10 text-center bg-gray-800 mt-10">copyRigth by smit</div>
    </div>
  );
}

export default AppLayout;
