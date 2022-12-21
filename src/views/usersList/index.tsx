import * as React from 'react';
import { IUser } from '../../models/User';

interface IHomePage {
	usersList: IUser[]
}

export const UsersList: React.FC<IHomePage> = ({usersList}) => {
	const [users, setUsers] = React.useState<IUser[]>();
	
	React.useEffect(() => {
		setUsers(usersList);
	},[usersList]);

	return (
		<>
			<div>UsersList</div>
			<ul>
				{ users && users.map(user => (
					<li key={user.uuid}>{user.name.first}</li>
				))
				}
			</ul>
		</>
	);
};
