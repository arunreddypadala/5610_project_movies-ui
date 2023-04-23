import React from "react";
import EditProfileComponentList from "./edit-profile-component-list";
import {useSelector} from "react-redux";

const EditProfileComponent = () => {
    const editprofileArray = useSelector(state => state.profile)
    return (
        <div className="list-group">
            {
                editprofileArray.map((profile,_id) =>
                                         <EditProfileComponentList
                                             key={profile._id} profile={profile}/>
                )
            }
        </div>
    );
};
export default EditProfileComponent;