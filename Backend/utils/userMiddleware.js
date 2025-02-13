import jwt from "jsonwebtoken"


const userMiddleWare=(req,res,next)=>{
    const authheadr=req.headers.authorization;
    if(!authheadr || !authheadr.startsWith("Bearer")){
        return res.status(401).send({error:"token not provided"})
    }

    const token=authheadr.split(" ")[1]
    try {
        const decoded=jwt.verify(token,process.env. JWT_SECRET)
        req.userId=decoded.userId
        next()
    } catch (error) { 
        console.log(error)
        return res.status(401).send({error:"invalid token or expired token"+error})
    }
}

export default userMiddleWare