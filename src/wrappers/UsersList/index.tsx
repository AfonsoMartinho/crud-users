import * as React from 'react';
import { IUser } from '../../models/User';
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { green, indigo } from '@mui/material/colors';

interface IUsersListProps {
	onDeleteUser: (userId: string) => void;
	users: IUser[];
}

export const UsersList = ({ onDeleteUser, users }: IUsersListProps): JSX.Element => {
	const rootClassName = 'users-list';

	const handleLoadMore = () => {
		console.log('loadMore')
	}

	return (
		<div className={rootClassName}>
			<div className={`${rootClassName}__content`}>
				{ users && users.map((user, i) => (
				<Card variant='outlined' className={`${rootClassName}__content-card`} key={user.id}>
					<CardHeader
						className={`${rootClassName}-card__header`}
						avatar={
							<Avatar className={`${rootClassName}-card__avatar`} alt="User Avatar" src={user.picture.large} sx={{ width: 96, height: 96 }} variant="rounded" />
						}
						title={
							<div className={`${rootClassName}-card__header-text`}>
								<div className={`${rootClassName}-card__location`}>
									<Avatar sx={{ bgcolor: green[500] }} variant="rounded">{user.nationality}</Avatar>
									<Typography>{user.location.country}</Typography>
								</div>
								<Typography className={`${rootClassName}-card__name`}>{`${user.name.title} ${user.name.first} ${user.name.last}`}</Typography>
							</div>
						}
						subheader={
							// TODO: Display Gender as icon
							<Typography>{user.gender}, {user.age} years old</Typography>
						}
					/>
					<CardContent>
						 {/* TODO: Add icons as label ex: phone: 📞 - 910227773 */}
						<div className={`${rootClassName}-card__content`}>
							<Typography>{user.email}</Typography>
							<Typography>Member since {user.registered.age} yrs</Typography>
							<Typography>{user.phone}</Typography>
						</div>
					</CardContent>
					<CardActions>
						<IconButton aria-label="delete" onClick={()=>onDeleteUser(user.id)}>
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
			<div className={`${rootClassName}__scroll`}>
				<button onClick={()=> handleLoadMore()}>Load More</button>
			</div>
		</div>
	);
};
