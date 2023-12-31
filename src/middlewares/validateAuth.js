import { db } from "../database/database.connection.js";

export async function validateAuth(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(!token) return res.sendStatus(401);

    try{
        const user = await db.collection('sessions').findOne({token});

        if(!user) return res.sendStatus(404);

        res.locals.user = user;
        
        next()
    }catch(err){
        res.status(500).send(err.message)
    }
}