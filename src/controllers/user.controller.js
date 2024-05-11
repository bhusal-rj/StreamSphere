import {asyncHandler} from '../utils/asyncHandler.js';

export const registerUser=asyncHandler( async(req,res)=>{
    res.status(400).json(
        {
            message:'ok'
        }
    )
} )

