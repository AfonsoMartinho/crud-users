import React from "react";
import { IUser } from "../models/User";
import { useRootStore } from "../StoreContext";
import { Filters, FilterType } from "../components/Filters";
import { UsersList } from "../wrappers/UsersList";
import { ExportActions } from "../components/ExportActions";
import { GendersType } from "../constants/genders";
import { NationalitiesType } from "../constants/nationalities";
import { ExcludableUserFields } from "../components/FieldsSettings";
import SettingsBar from "../wrappers/SettingsBar";

export const UsersPage: React.FC = ():JSX.Element => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [usersList, setUsersList] = React.useState<IUser[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [nationalityFilter, setNationalityFilter] = React.useState<NationalitiesType | undefined>()
    const [genderFilter, setGenderFilter] = React.useState<GendersType | undefined>()
    const [excludedFields, setExcludedFields] = React.useState<ExcludableUserFields[]>()
	const [errorMessage, setErrorMessage] = React.useState<string>();
    const { usersStore } = useRootStore();

    const fetchUsersFromStore = async () => {
		await usersStore.getUsersList(nationalityFilter, genderFilter, currentPage, excludedFields)
		    .then(() => { 
                setUsersList([...usersStore.usersList])
                setIsLoading(false);
            })
            .catch( (err)=> {
                console.log(err);
                setIsLoading(false);
                setErrorMessage('No Users Found!')
            })
    };

    const loadMoreUsers = () => {
        setCurrentPage(currentPage + 1);
    }

    const applyFilters = (filters: FilterType) => {
        setCurrentPage(1);
        setNationalityFilter(filters.nationality || undefined);
        setGenderFilter(filters.gender || undefined)
    };

    React.useEffect(() => {
        fetchUsersFromStore()
    },[currentPage, nationalityFilter, genderFilter, excludedFields])

    return (
        <div className="users-page">
            { isLoading ? ( <div>isLoading</div> ) : ( 
          <>
            <ExportActions />
            <SettingsBar onFieldsChange={(excludedFields) => setExcludedFields(excludedFields)}/>
            <Filters
                onFilter={(filters: FilterType) => applyFilters(filters)} />
            { usersList && usersList.length > 0 ?
                <UsersList users={[...usersList]} onLoadMore={() => loadMoreUsers()} onDeleteUser={(userId: string)=> usersStore.deleteUser(userId)}/>
                :
                <h1>Empty State</h1>
            }
            { errorMessage!== undefined && ( <div>{errorMessage}</div> )}
          </> )
          }
        </div>
    );
}

export default UsersPage;