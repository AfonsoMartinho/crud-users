import * as React from 'react';
import { IUser } from '../../models/User';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { UsersStore } from '../../stores/UsersStore';

interface IHomePage {
	usersList: IUser[]
}

export const UsersList: React.FC<IHomePage> = ({usersList}) => {
	const [users, setUsers] = React.useState<IUser[]>();
	const [usersKeys, setUsersKeys] = React.useState<GridColDef[]>();
	const rootClassName = 'users-table';
	
	React.useEffect(() => {
		setUsers(usersList);
		setUsersListKeys();
	},[usersList]);

	const setUsersListKeys = () => {
        const usersKeysReturnArray: React.SetStateAction<GridColDef<any, any, any>[] | undefined> | { id: number; field: string; headerName: string; }[] = []
        if(!usersList[0]) return;
		const currentUsersKeys = Object.keys(usersList[0]); 
		currentUsersKeys.forEach((key, i) =>{
			usersKeysReturnArray.push({
				id: i, field: key, headerName: key.toUpperCase()
			}); 
		})
        setUsersKeys(usersKeysReturnArray)
    }

	return (
		<div className={rootClassName}>
			{ users && usersKeys &&
			  <DataGrid
				rows={users}
				columns={usersKeys}
				pageSize={8}
				checkboxSelection
				/>
			}
			{/* <ul>
				{ users && users.map((user, i) => (
					<li key={user.uuid}>{user.phone}</li>
				))
				}
			</ul> */}
		</div>
	);
};
