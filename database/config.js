const mongoose = require('mongoose');


const dbconection = async () => {
    try {
        await mongoose.connect( process.env.DB_CONNECTION, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });   
        console.log('DB Online')     
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de inicializar la DB')
        
    }
}

module.exports = {
    dbconection
}