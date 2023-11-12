import React from 'react';
import { Search, CharacterList, Blocker } from '../../components';
import commonClasses from '../../styles/common.module.scss';
import { Outlet } from 'react-router-dom';

const SearchPage: React.FC = () => {
  return (
    <>
      <Blocker />
      <div className={commonClasses.container}>
        <header className={commonClasses.header}>
          <Search />
        </header>
        <div className="flex w-fit">
          <CharacterList />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
