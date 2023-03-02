import React from "react";
import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { IUser } from "../../models/User";

interface IUserCardProps {
	user: IUser;
}

export const UserCard = ({user}: IUserCardProps):JSX.Element => {
	const rootClassName = 'user-card';
    return (
        <Card variant='outlined' className={`${rootClassName}`} key={user.id}>
            <CardHeader
                className={`${rootClassName}__header`}
                avatar={
                    user.picture && <Avatar className={`${rootClassName}__avatar`} alt="User Avatar" src={user.picture.large} sx={{ width: 96, height: 96 }} variant="rounded" />
                }
                title={
                    <div className={`${rootClassName}__header-text`}>
                        <div className={`${rootClassName}__location`}>
                            { user.nat && <Avatar sx={{ bgcolor: green[500] }} variant="rounded">{user.nat}</Avatar> }
                            { user.location && <Typography>{user.location.country}</Typography> }
                        </div>
                        <Typography className={`${rootClassName}__name`}>{`${user.name.title} ${user.name.first} ${user.name.last}`}</Typography>
                    </div>
                }
                subheader={
                    // TODO: Display Gender as icon
                    <Typography>
                        { user.gender && <span>{user.gender}</span> }
                        { user.age && <span>, {user.age} years old</span> }
                    </Typography>
                }
            />
            <CardContent>
                {/* TODO: Add icons as label ex: phone: 📞 - 910227773 */}
                <div className={`${rootClassName}__content`}>
                    { user.email && <Typography>{user.email}</Typography> }
                    { user.registered?.age && <Typography>Member since {user.registered.age} yrs</Typography> }
                    { user.phone && <Typography>{user.phone}</Typography> }
                </div>
            </CardContent>
        </Card>
    )
}