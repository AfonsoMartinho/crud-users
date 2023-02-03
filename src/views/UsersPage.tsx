import React from "react";
import { IUser } from "../models/User";
import { useRootStore } from "../StoreContext";
import { UsersList } from "../wrappers/UsersList";

export const UsersPage: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [usersList, setUsersList] = React.useState<IUser[]>();
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
        <div className="users-page">
            { isLoading ? ( <div>isLoading</div> ) : ( 
          <>
              { usersStore.usersList.length > 0 &&
                <UsersList users={usersStore.usersList} onDeleteUser={(userId: string)=> usersStore.deleteUser(userId)}/>
              }
              { errorMessage!= undefined && ( <div>{errorMessage}</div> )}
          </> )
          }
        </div>
    );
}

export default UsersPage;