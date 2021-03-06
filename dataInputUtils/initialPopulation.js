if (require.main === module) {
    require('dotenv').config();
}

const { stdin, stdout } = require('process');




const mongoose = require('mongoose');
const Firm = require('../models/Firm');
const Reprezentant = require('../models/Reprezentant');





const crypto = require('crypto');
const readline = require('node:readline').createInterface({
    input: stdin,
    output: stdout
})
async function init() {
    await mongoose.connect('mongodb+srv://GheneaCostin:zDA9HtodqWJWvFCf@cluster0.ja2st.mongodb.net/practiker?retryWrites=true&w=majority')
    for (let i = 1; i <= 5; i++) {
        readline.question('Nume Firma: ', firm => {
            readline.question('Adresa: ', address => {
                readline.question('Area: ', area => {
                    readline.question('Desc: ', desc => {
                        readline.question('Username: ', username => {
                            readline.question('Parola:', async parola => {
                                let firm = new Firm({
                                    displayName: firm,
                                    desc: desc,
                                    area: area,
                                    adresa: address
                                })
                                await firm.save();
                                let hsh = crypto.createHash('sha256')
                                let rep = new Reprezentant({
                                    firm: doc._id,
                                    username: username,
                                    password: hsh.update(parola).digest('hex')
                                });
                                await rep.save();
                            })
                        })
                    })
                })
            })
        })
    }
}

async function createFirm() {

}
init();