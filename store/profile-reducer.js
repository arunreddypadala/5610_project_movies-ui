import { createSlice } from "@reduxjs/toolkit";

let profile =
    [{
        _id: '123',
        firstName: 'test1234@gmail.com',
        lastName: 'Padala',
        bannerimage: "../images/banner.jpeg",
        profilepic: 'relativity_space.png',
        handle: '@arunpadala',
        bio: 'Student, Software Engineer, AI, Space, and renewable enthusiast.\n'
             + ' Movie Enthusiast.\n',
        location:'Boston, MA',
        dob:'05/11/1998',
        dateJoined:'05 May 2005',
        followers:'150',
        following:'150',
        nooftuits: '6221',
        website: 'arunpadala@tuiter.com'
    }];

const profileSlice = createSlice({
                                     name: "profile",
                                     initialState: profile,
                                     reducers: {
                                         updateProfile(state, action) {
                                             return action.payload;
                                         },
                                     }
                                 });

export const {updateProfile} = profileSlice.actions;
export default profileSlice.reducer;