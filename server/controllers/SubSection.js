const SubSection=require("../models/SubSection");
const Section =require("../models/Section");
const {uploadImageToCloudinary} =require("../utils/imageUploader");

exports.createSubSection=async(req,res)=>
{
    try
    {
       const {sectionId,title,timeDuration,description}= req.body;
       const video=req.files.videoFiles;
       if(!sectionId|| !title || !timeDuration || !description || !video)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"All fields are required",
                }
            );
        } 
        const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        const subSectionDetails=await SubSection.create(
            {
                title:title,
                timeDuration:timeDuration,
                description:description,
                videoUrl:uploadDetails.secure_url,
            }
        )
        const updatedSection=await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $push:{subSection:subSectionDetails._id,}

            },
            {new:true});

            return res.status(200).json(
                {
                   success:true,
                   message:"Sub Section created Successfully",
                }
            );     
    }
    catch(error)
    {
        return res.status(500).json(
            {
                success:false,
                message:"Unable to Create the section please try again later",
                
            }
        );
    }
}