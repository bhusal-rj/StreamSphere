//we are assuming that the file is uploaded in our own server 
//from that file path we provide that directory to the function then 
//that function uploads the file to cloudinary
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


//Configuration gives the permission to upload the file how,where etc
cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });


// Upload an image
    // const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
    //     public_id: "shoes"
    // }).catch((error)=>{console.log(error)});
    
    // console.log(uploadResult);

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        //upload the file on cloudinary server
        const response=await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        //file has been uploaded successfully
        console.log("file is uploaded on cloudinary",response.url);
        return response
    } catch (error) {
        fs.unlink(localFilePath)//remove the locally saved temporary file as the upload 
        // operation got faild
        return null;    
    }
}

export {uploadOnCloudinary}
