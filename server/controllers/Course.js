const Course=require("../models/Course");
const Category=require("../models/Category");
const Tag=require("../models/tags");
const User=require("../models/User");
const {uploadImageToCloudinary}=require("../utils/imageUploader");

exports.createCourse=async(req,res)=>
{
    try
    {
        const {courseName,courseDescription,whatYouWillLearn,price,tag}=req.body;
        const thumbnail=req.files.thumbnailImage;

        if(!courseName ||!courseDescription ||!whatYouWillLearn || !price || !tag || !thumbnail)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"All fields are required",
                }
            );
        }
        const userId=req.user.id;
        const instructorDetails=await User.findById(userId);
        console.log("Instructor Details", instructorDetails);

        if(!instructorDetails)
        {
            return res.status(404).json(
                {
                    success:false,
                    message:"Instructor Details not found",
                }
            );
        }
        const tagDetails=await Tag.findById(tag);
        if(!tagDetails)
        {
            return res.status(404).json(
                {
                    success:false,
                    message:"Tag Details Not Found",
                }
            );
        }
        const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
        
         const newCourse=await Course.create(
            {
                courseName,
                courseDescription,
                instructor:instructor._id,
                whatYouWillLearn:whatYouWillLearn,
                price,
                tag:tagDetails._id,
                thumbnail:thumbnailImage.secure_url,
            }
         ) 

         await User.findByIdAndUpdate(
            {
                _id: instructorDetails._id,

            },
            {
                $push:
                {
                    courses:newCourse._id,
                }
            },
            {
                new:true
            },
         );

         return res.status(200).json(
            {
                success:true,
                message:"Course Created Successfully",
                data:newCourse,
            }
         )


    }
    catch(error)
    {
       console.error(error);
       return res.status(500).json(
        {
            success:false,
            message:"Failed to create Course",
            error: error.message,
        }
       )

    }
};

exports.showAllCourses=async(req,res)=>
{
    

        try
        {
            const allCourses=await Course.find({},{}).populate("instructor").exec(); 

            return res.status(200).json(
                {
                  success:true,
                  message:"Data for all Courses fetched Successfully",
                  data:allCourses,
                }
            )
        }

    
    catch(error)
    {
        
            console.log(error);
            return res.status(500).json(
                {
                    success:true,
                    message:"Cannot Fetch Course Data",
                    error:error.message,

                }
            )

        
    }
}


exports.getCourseDetails=async(req,res)=>
{
    try
    {
        const {courseId}=req.body;

        const courseDetails=await Course.find(
            {_id:courseId})
            .populate(
                {
                path:"instructor",
                populate:
                 {
                    path:"additonalDetails",
                 },
                }
            )
            .populate("category")
            .populate("ratingAndreviews")
            .populate(
                {
                    path:"courseContent",
                    populate:
                    {
                        path:"subSection",
                    }
                })
                 .exec();

            if(!courseDetails)
            {
                return res.status(400).json(
                    {
                        success:false,
                        message:`Could not find the course with ${courseId}`,
                    }
                );
            }

            return res.status(200).json(
                {
                    success:true,
                    message:"Course Details has been fetched Successfully",
                    data:courseDetails,
                }
            )}
    catch(error)
    {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:error.message,
            }
        )

    }
}

