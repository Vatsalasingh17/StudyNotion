const User=require("../models/User");

const mailSender=require("../utils/mailSender");

const bcrypt=require("bcrypt");

exports.resetPasswordToken=async(req,res)=>
{
    try
    {
        const email=req.body.email;
    const user=await user.findOne({email:email});
    if(!user)
    {
        return res.json(
            {
                success:false,
                message:"Your Email is not Registered with us"
            }
        )
    }

    const token=crypto.randomUUID();

    const updateDetails=await User.findOneAndUpdate(
            {email:email},
            {
            token:token,
            resetPasswordExpires: Date.now()+ 5*60*1000;
            },
            {new: true}
        
    );
    const url=`https:// localhost:3000/update-password/${token}`;

    await mailSender(email,
        "Password Reset Link",
        `Password Reset Link: ${url}`
    );

    return res.json(
        {
            success:true,
            message:"Email sent Successfully,please check email and change the password",
        }
    );
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"Something went wrong while changing the password please try again later"
            }
        )
    }
}

exports.resetPassword=async(req,res)=>
{
    try
    {
        const {password,confirmPassword,token}=req.body;
    if(password!==confirmPassword)
    {
        return res.json(
            {
                success:false,
                message:"Password did not matched",
            }
        );
    }
    const userDetails=await User.findOne({token:token});

    if(!userDetails)
    {
        return res.json(
            {
                success:false,
                message:"Token is invalid",
            }
        );
    }

    if(!userDetails.resetPasswordExpires<Date.now())
    {
        return res.json(
            {
                success:false,
                message:"Token is expired, Please regenerate your token",
            }
        );
    }

    const hashedPassword=await bcrypt.hash(password,10);

    await  User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true},
    );

    return res.status(200).json(
        {
            success:true,
            message:"Password Updated Successfully"
        }
    )

    }

    catch(error)
    {
        console.log(error);
        return res.status(500),json(
            {
                success:false,
                message:"Password Updation Failed"
            }
        );
    }


     
}