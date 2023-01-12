import React from 'react';
import { observer, Observer, useObserver } from 'mobx-react-lite';
import { useRootStore } from './StoreContext';
import { UsersList } from './wrappers/UsersList';
import './app.gb.scss';


export const App: React.FC = observer((props) => {
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [errorMessage, setErrorMessage] = React.useState<string>();
  const { usersStore } = useRootStore();

  const fetchUsersFromStore = async () => {
		await usersStore.getUsersList()
		  .then( () => { setIsLoading(false); })
      .catch( (err)=> {
        console.log(err);
        setIsLoading(false);
        setErrorMessage('No Users Found!')
      })
    };

  React.useEffect(() => {
    if(!isLoading) return;
    fetchUsersFromStore();
  },[])
  
    return (
        <div className="crud-users">
          { isLoading ? ( <div>isLoading</div> ) : ( 
          <>
              { usersStore.usersList.length > 0 &&
                <UsersList />
              }
              { errorMessage!= undefined && ( <div>{errorMessage}</div> )}
          </> )
          }
        </div>
    );
  }
);

export default App
