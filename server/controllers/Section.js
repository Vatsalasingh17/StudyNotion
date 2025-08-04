const Section=require("../models/Section");
const Course=require("../models/Course");

exports.createSection=async(req,res)=>
{
    // data fetch
    try
    {
        const{sectionName,courseId}=req.body;
    // data validation
    if(!sectionName || !courseId)
    {
        return res.status(400).json(
            {
                success:false,
                message:"Missing Properties",
            }
        )
    }

    // create section
    const newSection=await Section.create({sectionName});

    // update the course with section objectId
    const updatedCourse=await Course.findByIdAndUpdate(
        courseId,
        {
            $push:
            {
                courseContent:newSection._id,
            }
        },
        {new:true},

    )

    return res.status(200).json(
        {
            success:true,
            message:"Section Created Successfully",
            updatedCourseDetails,
        }
    )


 }
   catch(error)
   {

    return res.status(500).json(
        {
            success:false,
            message:"Unable to create section please try again later",
            error:error.message, 
        }
    )


   }
}

exports.updateSection=async(req,res)=>
{
     try
     {
        const{sectionName,sectionId}=req.body;

     

     if(!sectionName || !sectionId)
     {
        return res.status(400).json(
            {
                success:false,
                message:"Missing Properties",
            }
        );
     }

     const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

     return res.status(200).json(
        {
            success:true,
            message:"Section Updated Successfully",
        }
     )
    }
    catch(error)
    {
        return res.status(500).json(
            {
                success:false,
                message:"Unable to update the section name please try again later",
                error:error.message,
            }
        )
    }
};

exports.deleteSection=async(res,req)=>
{
    try
    {
       const {sectionId}=req.params
       await Section.findByIdAndDelete(sectionId);
       
       return res.status(200).json(
        {
            success:true,
            message:"Section Deleted Successfully",
        }
       );

    }
    catch(error)
    {
        return res.status(500).json(
            {
                success:false,
                message:"Unable to delete the section"
            }
        )
    }
}



