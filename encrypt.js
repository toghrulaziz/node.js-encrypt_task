const bcrypt = require('bcrypt');
const saltRounds = 10;

const encryptString = async (myPlaintextPassword) => {
    try {
        const hash = await bcrypt.hash(myPlaintextPassword.word, saltRounds);
        return hash; 
    } catch (error) {
        console.log(error);
    }
}

const compareString = async (originalString, hash) => {
    try {
        const result = await bcrypt.compare(originalString, hash);
        return result; 
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    encryptString,
    compareString
}