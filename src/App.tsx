import React from 'react';
import { observer, Observer, useObserver } from 'mobx-react-lite';
import { useRootStore } from './StoreContext';
import { UsersList } from './views/usersList';
import './app.gb.scss';
import { UsersStore } from './stores/UsersStore';


export const App: React.FC = observer((props) => {
    const { usersStore } = useRootStore();
    React.useEffect(() => {
      usersStore.getUsersData();
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
