//this will create the associations using rnadom numbers:

const { User, Show } = require("../models");


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};

async function main (){
    const showCount = await Show.count();
    const userCount = await User.count();

    for (let pk = 1; pk<=userCount; pk++){
        const currentUser = await User.findByPk(pk);
        const showsPeruser = getRandomIntInclusive(0, showCount);
        for (let show = 1; show <=showsPeruser; show++) {
            const showPk = getRandomIntInclusive(0, showCount);
            await currentUser.addShow(await Show.findByPk(showPk));
        }
    }
}

main();



