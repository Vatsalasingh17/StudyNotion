const Profile=require("../models/Profile");
const user=require("../models/User");

exports.updateProfile=async(req,res) =>
{
    try
    {
        //get data
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;

        //get user id
        const id=req.user.id;

        // verification

        if(!contactNumber || !gender || !id)
        {
            return res.status(400).json(
                {
                    success:true,
                    message:"All fields are required",
                }
            );
        }
        // find profile
        const userDetails =await User.findById(id);
        const profileId=userDetails.additionalDetails;
        const profileDetails=await Profile.findById(profileId);
         

        //update profile

        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about,
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber;
        await profileDetails.save();

        //return response
        return res.status(200).json(
            {
                success:true,
                message:"Profile updated Successfully",
                profileDetails

            }
        )
        
    }
    catch(error)
    {
        return res.status(500).json(
            {
                success:false,
                message:"Failed to Update the Profile Please try again Later",
                error:error.message,
            }
        );
    }
}

exports.deleteAccount=async(req,res)=>
{
    try
    {
       const id=req.user.id;
       const userDetails=await User.findById(id);
       
       if(!userDetails)
       {
        return res.status(404).json(
            {
                success:false,
                message:"User Not Found",
            }
        );
       }
       // delete profile
       await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
       // delete user
       await User.findByIdAndDelete(
        {
            _id:id
        }
       );

       return res.status(200).json(
        {
            success:true,
            message:"User Deleted Successfully",
        }
       );
        

    }
    catch(error)
    {
       return res.status(500).json(
        {
            success:false,
            message:"User cannot be deleted",
        }
       ); 
    }
};

exports.fetAllUserDetails=async(req,res)=>
{
    try
    {
        const id=req.user.id
        const userDetails= await User.findById(id).populate("additionalDetails").exec();
        return res.status(200).json(
            {
                success:true,
                message:"User Data Fetched Successfully"
            }
        )

    }
    catch(error)
    {
        return res.status(500).json(
            {
                success:false,
                message:"User Data Cannot be fetched"
            } 
        )
    }
}

  

