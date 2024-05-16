import { asyncHandler } from "../utils/asyncHandler.js";
import { user } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation -not empty
  //check if user already exists:using username and email
  //check for images,check for avatar
  //upload them to cloudinary,avatar
  //create user object-create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return res
  const { username, email, password, fullname } = req.body;

  if (
    [fullname, email, username, password].some((Item) => Item?.trim() === "")
  ) {
    return res.status(400).json({ error: "Enter the all required fields" });
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    return res.status(404).json({ error: "avatar file has to be upload" });
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath); //return the url of clodinary where it is stored
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  //as avatar is required field as we have already declared in the model of database schema it is set
  //in the database that it has to be mandatory to upload the file path
  // of avatar but it is not require to upload the local file path of
  // coverImage as it is not required to upload in data modeling.
  if (!avatar) {
    return res.status(404).json({ error: "Avatar file is required" });
  }

  const User = await user.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await user
    .findById(user._id)
    .select("-password -refreshToken");

  if (!createdUser) {
    return res
      .status(500)
      .json({ error: "Something went wrong while registering the user" });
  }

  return res.status(201).json(createdUser);
});