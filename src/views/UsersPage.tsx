import React from "react";
import { IUser } from "../models/User";
import { useRootStore } from "../StoreContext";
import { Filters, FilterType } from "../components/Filters";
import { UsersList } from "../wrappers/UsersList";
import { ExportActions } from "../components/ExportActions";

export const UsersPage: React.FC = ():JSX.Element => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [usersList, setUsersList] = React.useState<IUser[]>();
	const [errorMessage, setErrorMessage] = React.useState<string>();
    const { usersStore } = useRootStore();

    const fetchUsersFromStore = async () => {
		await usersStore.getUsersList()
		    .then(() => { 
                setUsersList(usersStore.usersList)
                setIsLoading(false);
            })
            .catch( (err)=> {
            console.log(err);
            setIsLoading(false);
            setErrorMessage('No Users Found!')
        })
    };

    const applyFilters = (filters: FilterType) => {
    if (filters.nationality === '' && filters.gender === '') return clearAllFilters();
    setUsersList(usersStore.usersList?.filter((user) => {
        for (const filterKey of Object.keys(filters) as (keyof FilterType)[]) {
            if (filters[filterKey] !== '' && user[filterKey] !== filters[filterKey]) {
                return false;
            }
        }
        return true;
    }));
    };
      

    const clearAllFilters = () => setUsersList(usersStore.usersList);

    React.useEffect(() => {
        if(!isLoading) return;
        fetchUsersFromStore();
    },[])

    return (
        <div className="users-page">
            { isLoading ? ( <div>isLoading</div> ) : ( 
          <>
            <ExportActions />
            <Filters
                onFilter={(filters: FilterType) => applyFilters(filters)} />
            { usersList && usersList.length > 0 ?
                <UsersList users={usersList} onDeleteUser={(userId: string)=> usersStore.deleteUser(userId)}/>
                :
                <h1>Empty State</h1>
            }
            { errorMessage!= undefined && ( <div>{errorMessage}</div> )}
          </> )
          }
        </div>
    );
}

export default UsersPage;