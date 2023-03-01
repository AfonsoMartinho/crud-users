import * as React from 'react';
import { IUser } from '../../models/User';
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { green, indigo } from '@mui/material/colors';
import InfiniteScroll from 'react-infinite-scroll-component'

interface IUsersListProps {
	onDeleteUser?: (userId: string) => void;
	onLoadMore?: () => void;
	users: IUser[];
}

export const UsersList = ({ onLoadMore, users }: IUsersListProps): JSX.Element => {
	const rootClassName = 'users-list';
	const [isFiltering] = React.useState<boolean>(false);

	const handleInfiniteScroll =  () => {
		if (onLoadMore) onLoadMore();
	}

	const loaderElement = (): JSX.Element => {
		if(isFiltering) return(<></>) 
		return ( <h4>Loading...</h4> )
	}

	return (
		<div className={rootClassName}>
			<InfiniteScroll
				dataLength={users.length}
				next={() => handleInfiniteScroll()}
				hasMore={true}
				loader={loaderElement()}
				endMessage={<h1>ay! You have seen it all</h1>}
			>
				<div className={`${rootClassName}__content`}>
					{ users && users.map((user) => (
					<Card variant='outlined' className={`${rootClassName}-card`} key={user.id}>
						<CardHeader
							className={`${rootClassName}-card__header`}
							avatar={
								user.picture && <Avatar className={`${rootClassName}-card__avatar`} alt="User Avatar" src={user.picture.large} sx={{ width: 96, height: 96 }} variant="rounded" />
							}
							title={
								<div className={`${rootClassName}-card__header-text`}>
									<div className={`${rootClassName}-card__location`}>
										{ user.nat && <Avatar sx={{ bgcolor: green[500] }} variant="rounded">{user.nat}</Avatar> }
										{ user.location && <Typography>{user.location.country}</Typography> }
									</div>
									<Typography className={`${rootClassName}-card__name`}>{`${user.name.title} ${user.name.first} ${user.name.last}`}</Typography>
								</div>
							}
							subheader={
								// TODO: Display Gender as icon
								user.gender && <Typography>{user.gender}, {user.age} years old</Typography>
							}
						/>
						<CardContent>
							{/* TODO: Add icons as label ex: phone: 📞 - 910227773 */}
							<div className={`${rootClassName}-card__content`}>
								{ user.email && <Typography>{user.email}</Typography> }
								{ user.registered?.age && <Typography>Member since {user.registered.age} yrs</Typography> }
								{ user.phone && <Typography>{user.phone}</Typography> }
							</div>
						</CardContent>
					</Card>
					))
					}
				</div>
			</InfiniteScroll>
		</div>
	);
};
