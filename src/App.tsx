import React from 'react';
import { observer, Observer, useObserver } from 'mobx-react-lite';
import { useRootStore } from './StoreContext';
import { UsersList } from './wrappers/UsersList';
import './app.gb.scss';


export const App: React.FC = observer((props) => {
    const { usersStore } = useRootStore();
    React.useEffect(() => {
      usersStore.getUsersList();
      //usersStore.loadUsersByNationality(Nationalities.UA);
    },[])

    return (
        <div className="crud-users">
          {usersStore.usersList && <UsersList usersList={usersStore.usersList} />}
        </div>
    );
  }
);

export default App
