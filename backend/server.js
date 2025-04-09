import express from 'express';
import cors from 'cors'
import router from './routes/rootroute.js';
import { PORT } from './secrets.js';

const app = express()


//MIDDLEWARES
app.use(cors())
app.use(express.json()) //middleware, allows passing of json


//ROUTES
app.use('/api', router)
//ERROR HANDLER
app.use((err, req, res, next) => {
    err.statuCode = err.statuCode || 500
    err.status = err.status || 'error'

    res.status(err.statuCode).json({
        status: err.status,
        message: err.message
    })
})


app.get('/', (req, res) => {
    res.json({message: "Server is running"})
})

app.listen(PORT, () => {
    console.log(`\nServer is running`)
});


