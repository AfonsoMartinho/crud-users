import * as React from 'react';
import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { IUser } from '../../models/User';
import InfiniteScroll from 'react-infinite-scroll-component'
import { UserCard } from '../../components/UserCard';

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
						<UserCard user={user} />
					))
					}
				</div>
			</InfiniteScroll>
		</div>
	);
};
