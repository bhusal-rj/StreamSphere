import {asyncHandler} from '../utils/asyncHandler.js';
import { user } from '../models/user.models.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
export const registerUser=asyncHandler( async(req,res)=>{
      // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const {fullName, email, username, password } = req.body
    //console.log("email: ", email);

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        res.status(200).json({error:"All fields are required"})
    }

    const existedUser = await user.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        res.statuse(409).json({error:"User with email or username already exists"})
    }
    //console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    // let coverImageLocalPath;
    // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    //     coverImageLocalPath = req.files.coverImage[0].path
    // }
    

    if (!avatarLocalPath) {
        res.status(400).json({error:"Avatar file is required man"})
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        res.status(400).json({error:"Avatar file is required"})
    }
   

    const User = await user.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await user.findById(User._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        res.status(400).json("Something went wrong while registering the user")
    }

    return res.status(201).json(
        res.status(300).json({done:"yea"})
    )

} )


