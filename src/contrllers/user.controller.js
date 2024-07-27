import { asyncHandler } from "../utils/asynHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { response } from "express";

const registerUser = asyncHandler(async(req,res) => {
    const {username , email, fullName} = req.body
     console.log('email :', email)

     if([username, email, fullName].some((fields) =>
        fields?.trim === ""
    )){
        throw new ApiError(400, "All Fields are required..")
    }

    const existedUser = User.findOne({
        $or : [{ username }, { email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email and Username already exist !!")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path
   
    if(!avatarLocalPath){
        throw new ApiError(409, "Avatar File is Required !!")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(409, "Avatar File is Required !!")
    }

    const user = User.create({
        fullName,
        email,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        username : username.toLowercase()
    })

    const createdUser = User.findById(user._id).select(" -password -refreshToken")

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user !!")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully !!")
    )

})


export {registerUser}