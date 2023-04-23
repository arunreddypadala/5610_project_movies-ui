import React from "react";
import ProfileComponentList from "./profile-component-list";
import {useSelector} from "react-redux";

const ProfileComponent = () => {
    const profileArray = useSelector(state => state.profile)
    return (
        <div className="list-group">
            {
                profileArray.map(profile =>
                                     <ProfileComponentList
                                         key={profile._id} profile={profile}/>
                )
            }
        </div>
    );
};
export default ProfileComponent;