const { User, Show } = require('../models');
const {Router} = require('express');
const {checkShowExistsByShowName, checkShowExistsById, checkUserExistsById, checkUserExistsByUsername} = require('./middleware');
const userRouter = Router();


//get all users
userRouter.get('/allusers', async (req,res)=>{
    try {
        const users = await User.findAll();
        res.status(200).send({users})
    } catch {
        res.status(500).send("sorry, couldn't complete this request :(")
    }
})

//get specific user by providing pk
userRouter.get('/:id', checkUserExistsById, async (req,res) => {
    res.status(200).send({user: req.user})
})

//get specific user by providing username(i.e email)
userRouter.get('/:username', checkUserExistsByUsername, async (req,res)=>{
    res.status(200).send({user: req.user});
})

//get shows watched by specific user by providing pk of user
userRouter.get('/:id',checkUserExistsById, async (req,res) =>{
    const usersShows = await req.user.getShows();
    res.status(200).send(`${req.user.username}'s shows: ${usersShows}`);
})

//update by adding show to user
//check if show in Shows, if not send message to add show first
userRouter.put('/:id',checkUserExistsById, async (req,res) => {
            const userWithShows = await req.user.addShow(req.body);
            res.status(200).send({userWithShows})
})

module.exports = {userRouter};