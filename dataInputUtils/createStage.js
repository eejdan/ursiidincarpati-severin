if(require.main === module) {
    require('dotenv').config();
}
const crypto = require('crypto');
const readline = require('node:readline').createInterface({
    input: stdin,
    output: stdout
})
const Firm = require('../models/Firm');
const PracticeStage = require('../models/PracticeStage');

function main() {
    readline.question('Nume Firma: ', firm => {
        readline.question('tech:', tech => {
            readline.question('titlu practica:', title => {
                readline.question('desc: ', desc => {
                    readline.question('weeks number:', weeks => {
                        readline.question('work hours ore/zi zi/saptamana: ', async work => {
                            var afirm = await Firm.findOne({displayName: firm}).exec();
                            let stage = new PracticeStage({
                                firm: afirm._id,
                                techUsed: tech,
                                title: title,
                                desc: desc,
                                dateStart: Date.now(),
                                weeks: weeks,
                                workHours: work,
                                registrationEnded: false

                            })
                            await stage.save();
                            console.log('facut');
                        })
                    })
                })
            })
        })
    })
}