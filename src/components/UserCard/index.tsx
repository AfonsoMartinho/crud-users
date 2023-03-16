import React from "react";
import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { IUser } from "../../models/User";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';

interface IUserCardProps {
	user: IUser;
}

export const UserCard = ({user}: IUserCardProps):JSX.Element => {
	const rootClassName = 'user-card';
    return (
        <Card variant='outlined'  className={rootClassName} key={user.id}>
            <CardHeader
                className={`${rootClassName}__header`}
                avatar={
                    user.picture && <Avatar className={`${rootClassName}__avatar`} alt="User Avatar" src={user.picture.large} sx={{ width: 96, height: 96 }} variant="rounded" />
                }
                title={
                    <div className={`${rootClassName}__header-text`}>
                        { user.location && ( 
                            <div className={`${rootClassName}__location`}>
                                    <Avatar className={`${rootClassName}__location-flag`} variant="rounded">{user.nat}</Avatar>
                                    <Typography className={`${rootClassName}__location-country`}>{user.location.country}</Typography>
                            </div>
                        )}
                        <Typography className={`${rootClassName}__name`}>{`${user.name.title} ${user.name.first} ${user.name.last}`}</Typography>
                    </div>
                }
                subheader={
                    <Typography className={`${rootClassName}__subheader`}>
                        { user.gender && <span>{ user.gender === 'male' ? (<MaleOutlinedIcon color="primary"/>) : (<FemaleOutlinedIcon color="secondary"/>)}</span> }
                        { user.age && <span>{user.age} years old</span> }
                    </Typography>
                }
            />
            <CardContent>
                <div className={`${rootClassName}__content`}>
                    { user.email && <Typography className={`${rootClassName}__content-row`}><EmailRoundedIcon />{user.email}</Typography> }
                    { user.phone && <Typography className={`${rootClassName}__content-row`}><LocalPhoneRoundedIcon />{user.phone}</Typography> }
                    { user.registered?.age && <Typography className={`${rootClassName}__content-bottom-info ${rootClassName}__content-row`}><b>Member since:</b>{user.registered.age} yrs</Typography> }
                </div>
            </CardContent>
        </Card>
    )
}