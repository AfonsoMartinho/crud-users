import React from "react";
import { GendersType } from "../constants/genders";
import { NationalitiesType } from "../constants/nationalities";
import { IUser } from "../models/User";
import { useRootStore } from "../StoreContext";
import { FiltersBar } from "../wrappers/FiltersBar/indext";
import { UsersList } from "../wrappers/UsersList";

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

    const filterByNationality = (nationality: NationalitiesType) => {
        setUsersList(usersStore.usersList?.filter((user) => user.nationality === nationality));
    };

    const filterByGender = (gender: GendersType) => {
        clearFilters();
        setUsersList(usersStore.usersList?.filter((user) => user.gender === gender));
    };

    const clearFilters = () => {
        setUsersList(usersStore.usersList);
    }

    React.useEffect(() => {
        if(!isLoading) return;
        fetchUsersFromStore();
    },[])

    return (
        <div className="users-page">
            { isLoading ? ( <div>isLoading</div> ) : ( 
          <>
            <FiltersBar 
                onClearFilters={()=> clearFilters()}
                onGenderFilter={(gender: GendersType) => filterByGender(gender)}
                onNationalityFilter={(nationality: NationalitiesType) => filterByNationality(nationality)} />
            { usersList && usersList.length > 0 &&
                <UsersList users={usersList} onDeleteUser={(userId: string)=> usersStore.deleteUser(userId)}/>
            }
            { errorMessage!= undefined && ( <div>{errorMessage}</div> )}
          </> )
          }
        </div>
    );
}

export default UsersPage;