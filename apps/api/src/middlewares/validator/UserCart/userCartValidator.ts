// import { Request, Response, NextFunction } from "express";
// import { prisma } from "@/lib/PrismaClient";

// export const authenticUser = async (req: Request, res: Response, next: NextFunction) => {
//     const userId = req.header('uid')

//     if(userId){
//         const user = await prisma.user.findFirst({
//             where: {
//                 uid: userId
//             }
//         })
//         if(user) {
//             req.user = user
//             return next()
//         }
//     }

//     res.status(401).json({
//         error: 'Unauthorized'
//     })
// }