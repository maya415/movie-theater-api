const { User, Show } = require('../models');
const {Router} = require('express');
const userRouter = Router();

//---------------middleware---------------

function checkShowExists (showName) {
    Show.count({ where: { title: showName } })
    .then(count => {
      return (count =1 ) ? true : false
    });
  }
  
function checkUserExists (username) {
    User.count({ where: { username: username } })
    .then(count => {
      return (count =1 ) ? true : false
    });
  }

//---------------middleware---------------

//get all users
userRouter.get('/allusers', async (req,res)=>{
    const users = await User.findAll();
    res.status(200).send({users})
})

//get specific user by providing pk
userRouter.get('/:id', async (req,res) => {

    try {
        const user = await User.findByPk(req.params.id);
        res.status(200).send({user})
    } catch {
        res.status(500).send("sorry, couldn't complete this request :(")
        
    }
})

//get specific user by providing username(i.e email)
userRouter.get('/:username', async (req,res)=>{

    try {
        const user = await User.findOne({where: {
            username: req.params.username
        }});
        res.status(200).send({user});
    } catch {
        res.status(500).send("sorry, couldn't complete this request :(")
        
    }
})

//get shows watched by specific user by providing pk of user
userRouter.get('/:id', async (req,res) =>{
    try {
        const user =await User.findByPk(req.params.id);
        const usersShows = await user.getShows();
        res.status(200).send(`${user.username}'s shows: ${usersShows}`)
        
    } catch {
        res.status(500).send("sorry, couldn't complete this request :(")
        
    }
})

//update by adding show to user
//check if show in Shows, if not send message to add show first
userRouter.put('/:userid/:showName', async (req,res) => {
    if (checkShowExists(req.params.showName) && checkUserExists(req.params.userid)){
        try {
            const show = await User.findOne({where: {
                title: req.params.showName
            }});
            const user = await User.findOne({where: {
                username: req.params.id
            }});
            await user.addShow(show);
            res.status(200).send({user})

            
        } catch {
            res.status(500).send("we've encountered an issue :(")
            
        }

    } else if (!checkShowExists(req.params.showName)){
        res.status(500).setDefaultEncoding("this show doesn't currently exist in our database. please add it to the database")
    } else {
        res.status(500).setDefaultEncoding("this show doesn't currently exist in our database. please add it to the database")
    }
})
