const { User, Show } = require("../models");

//check show exists by showName
async function checkShowExistsByShowName (req,res,next) {
  req.show = await Show.findOne({where: {
    title: req.params.showName
  }});

  if (!req.show) {
    return res.status(500).send("this shows  doesn't exist :( please add it to our database first")
  }
  next();
}
//check show exits by id
async function checkShowExistsById(req,res,next){
  req.show = await Show.findOne({ where: { title: req.params.showName } });
  if (!req.show){
    return res.status(500).send("this show doesn't exist:( please add the user to our database first");
  }
  next();

}


//check user exits by id
async function checkUserExistsById(req,res,next){
  req.user = await User.findOne({ where: { username: req.params.username } });
  if (!req.user){
    return res.status(500).send("this user doesn't exist:( please add the user to our database first");
  }
  next();

}

//check user exits by username
async function checkUserExistsByUsername(req,res,next){
  req.user = await User.findByPk(req.params.id)
  if (!req.user){
    return res.status(500).send("this user doesn't exist:( please add the user to our database first");
  }
  next();

}


module.exports = {checkShowExistsByShowName, checkShowExistsById, checkUserExistsById, checkUserExistsByUsername};

