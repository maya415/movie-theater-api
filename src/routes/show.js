const { User, Show } = require('../models');
const {Router} = require('express');
const {checkShowExistsByShowName, checkShowExistsById, checkUserExistsById, checkUserExistsByUsername} = require('./middleware');
const showRouter = Router();

//get all shows
showRouter.get('/allshows', async (req,res)=>{
    try {
        const shows = await Show.findAll();
        res.status(200).send({shows})
    } catch {
        res.status(500).send("sorry, couldn't complete this request :(")
    }
})

//get specific show by id
showRouter.get('/:id', checkShowExistsById, async (req,res) => {
    res.status(200).send({show: req.show})
})

//get specific show by showname
showRouter.get('/:showName', checkShowExistsByShowName, async (req,res) => {
    res.status(200).send({show: req.show})
})

//get shows by genre
showRouter.get('/:genre', async (req,res)=>{
    try {
        const shows = await Show.findAll({where: {
            genre: req.params.genre
        }})
        res.status(200).send({shows})
        
    } catch {
        res.status(500).send("sorry, couldn't complete this request :(")
    }

})

//update rating by showname
showRouter.put('/:showName/:rating',checkShowExistsByShowName, async (req,res) =>{
    try {
        const updated = await req.show.update({where: {
            rating: req.params.rating
        }})
        res.status(200).send({updated})
        
    } catch {
        res.status(500).send("sorry, couldn't complete this update :(")
    }
})

//update rating by show id
showRouter.put('/:id/:rating',checkShowExistsById, async (req,res) =>{
    try {
        const updated = await req.show.update({where: {
            rating: req.params.rating
        }})
        res.status(200).send({updated})
        
    } catch {
        res.status(500).send("sorry, couldn't complete this update :(")
    }
});

//update status by showname
showRouter.put('/:showName/:status',checkShowExistsByShowName, async (req,res) =>{
    try {
        const updated = await req.show.update({where: {
            status: req.params.status
        }})
        res.status(200).send({updated})
        
    } catch {
        res.status(500).send("sorry, couldn't complete this update :(")
    }
});

//update status by show id
showRouter.put('/:id/:rating',checkShowExistsById, async (req,res) =>{
    try {
        const updated = await req.show.update({where: {
            status: req.params.status
        }})
        res.status(200).send({updated})
        
    } catch {
        res.status(500).send("sorry, couldn't complete this update :(")
    }
});

//delete show by showname
showRouter.delete('/:showName'. checkShowExistsByShowName, async(req,res)=>{
    await req.show.destroy();
    res.status(200).send({show: req.show});
});

//delete show by show id
showRouter.delete('/:id'. checkShowExistsById, async(req,res)=>{
    await req.show.destroy();
    res.status(200).send({show: req.show});
});

module.exports = {showRouter};