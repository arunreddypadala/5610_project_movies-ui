import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {updateProfile} from "../store/profile-reducer.js"
import {Link} from "react-router-dom";

const EditProfileComponentList = (
    {profile}
) => {
    const [firstName, setfirstName] = useState(profile.firstName)
    const [lastName, setlastName] = useState(profile.lastName)
    const [bio, setBio] = useState(profile.bio)
    const [location, setlocation] = useState(profile.location)
    const [website, setwebsite] = useState(profile.website)
    const [dob, setdob] = useState(profile.dob)
    const dispatch = useDispatch();
    const updateUserProfile = () => {
        dispatch(updateProfile({
                                   ...profile,
                                   firstName:firstName,
                                   lastName: lastName,
                                   bio: bio,
                                   location: location,
                                   website: website,
                                   dob:dob
                               }));
    }

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `../profile`;
        navigate(path);
    }


    return (<div>


            <div className="float-right">

                <Link to="/profile" >
                    <button className="rounded-pill btn btn-primary float-end mb-2  me-1 fw-bold text-white">Save</button>
                </Link>
            </div>

            <div >

                <button className="btn col-1"
                        onClick={(e) => routeChange()}><i className="bi bi-x-lg"></i>
                </button>

                <h4>Edit profile</h4>
            </div>

            <div className="mt-2 pt-0 pb-5 position-relative ">

                <img  alt="" className="w-100 pt-2 border-secondary rounded" src={profile.bannerimage} height = {300}/>

                <div className=" pt-5 ps-4 position-absolute top-50 h-100 ">
                    <img   alt="profile" className="float-left float-start  rounded-circle" src={`/images/${profile.profilepic}`} height ={100} width={100} />
                </div>

            </div>

            <div className ="position-relative mt-4">
                <span className ="pt-1 h6 position-absolute ps-2 text-secondary " >First Name</span>
                <input
                    defaultValue={profile.firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    className="form-control ps-2 pt-4"
                />
            </div>


            <div className ="position-relative mt-4">
                <span className ="pt-1 h6 position-absolute ps-2 text-secondary " >Bio</span>
                <input
                    defaultValue={profile.bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="form-control ps-2 pt-4"
                />
            </div>

            <div className ="position-relative mt-4">
                <span className ="pt-1 h6 position-absolute ps-2 text-secondary " >Location</span>
                <input
                    defaultValue={profile.location}
                    onChange={(e) => setlocation(e.target.value)}
                    className="form-control ps-2 pt-4"
                />
            </div>


            <div className ="position-relative mt-4">
                <span className ="pt-1 h6 position-absolute ps-2 text-secondary " >Date of Join</span>
                <input
                    defaultValue="2005-05-05"
                    onChange={(e) => setdob(e.target.value)}
                    className="form-control ps-2 pt-4"
                    type = "date"/>
            </div>

        </div>
    );
};
export default EditProfileComponentList;