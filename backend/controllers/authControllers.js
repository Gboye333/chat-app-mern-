import User from "../model/user.js";
import bcryptjs from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signupUser = async (req,res) => {
    try {
        const {fullName,userName,password,confirmPassword,gender}= req.body;
        if(password !== confirmPassword){
            return res.status.json("password does not match"); 
        }

    const user = await User.findOne({userName});

    if (user){
        return res.status(500).json("Choose a new username");
    }
         // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        // https://avatar-placeholder.iran,liara.run/

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = new User({
        fullName,
        userName,
        password: hashedPassword,
        gender,
        profilePicture: gender === "male" ? boyProfilePic : girlProfilePic
        })
        
        if(newUser) {
        // Generate jwt token
        generateTokenAndSetCookie(newUser._id,res)
        await newUser.save();

        res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        gender: newUser.gender,
        profilePicture: newUser.profilePicture
        });
        } else{
        res.status(400).json({error: "invalid data"})
        }
        
    } catch (error) {
      console.log("Error in signup controller", error.message)
      return res.status(500).json({
     error: "internal server error",
      })
    }
    
}

export const loginUser = async (req,res) => {
  try {
    const {userName,password} = req.body;
    const user = await User.findOne({userName})
    const isPasswordCorrect = await bcryptjs.compare(password, user?.password || ""); 
    if(!user || !isPasswordCorrect){
        return res.status(400).json({Error: "invalid user or password , check again!!"});
    }

   generateTokenAndSetCookie(user._id,res);
   res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    userName: user.userName,
    profilePicture: user.profilePicture
   });

  } catch (error) {
    console.log("Error in sign in controller", error.message);
    res.status(500).json({error: "internal server error"});
  }
}

export const logoutUser = async (req,res) => {
    try {
        res.cookie("jwt","", {maxAge:0})
        res.status(200).json({message: "logout is successful"})
    } catch (error) {
        console.log("Error in sign out controller", error.message)
        return res.status(400).json({error: "internal server error"})
    }
}

