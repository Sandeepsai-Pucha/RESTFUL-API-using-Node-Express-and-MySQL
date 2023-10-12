const express = require("express")
const cors = require("cors")

const app = express()

const corsOptions = {
    origin:"http://localhost:3000"
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 3000 

app.get('/', (request, response) => {
    response.json({message:'Hello From Server'})
})

require("./app/routes/emp.routes")(app);

app.listen(PORT, (request, response) => {
    console.log(`Server Running on Port ${PORT}`)
})