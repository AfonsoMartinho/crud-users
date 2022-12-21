import * as React from 'react';
import { IUser } from '../../models/User';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { green, indigo } from '@mui/material/colors';


interface IHomePage {
	usersList: IUser[]
}

export const UsersList: React.FC<IHomePage> = ({usersList}) => {
	const [users, setUsers] = React.useState<IUser[]>();
	const rootClassName = 'users-list';
	
	React.useEffect(() => {
		setUsers(usersList);
	},[usersList]); 

	return (
		<div className={rootClassName}>
				{ users && users.map((user, i) => (
				<Card variant='outlined' className={`${rootClassName}-card`} key={user.id}>
					<CardHeader
						avatar={
							<Avatar alt="User Avatar" src={user.picture.large} sx={{ width: 96, height: 96 }} variant="rounded" />
						}
						title={
							<Avatar sx={{ bgcolor: green[500] }} variant="rounded">{user.nationality}</Avatar>
						}
						subheader={
							<Typography>{`${user.name.title} ${user.name.first} ${user.name.last}`}</Typography>
						}
					/>
					<CardContent>
						<div className={`${rootClassName}-card__content`}>		
							<Typography>{user.nationality}</Typography>		
							<Typography>{user.gender}</Typography>		
						</div>
					</CardContent>
					<CardActions>
						<IconButton aria-label="delete">
							<DeleteIcon sx={{ color: indigo[100] }}/>
						</IconButton>
						<IconButton aria-label="download">
							<DownloadIcon sx={{ color:indigo[100] }}/>
						</IconButton>
      				</CardActions>
				</Card>
				))
				}
		</div>
	);
};
