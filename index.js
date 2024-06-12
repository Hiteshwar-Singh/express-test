import express from 'express'
 
const app = express()

const port = 3000

app.use(express.json())

let teaData = []
let nextId = 1

// ADD TEAS
app.post('/teas', (req, res)=>{
    
    const {name, price} = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})
// GET ALL TEAS 
app.get('/teas',(req, res)=>{
  res.status(200).send(teaData)  
})



// GET TEA BY ID


app.get('/teas/:id',(req, res)=>{
    const teaId = teaData.find((tea)=>tea.id === parseInt(req.params.id))
            res.status(200).send(teaId)
    
        if(!teaId){
            res.status(404).send("tea not found")
        }
    })



// DELETE A TEA 
app.delete('/teas/:id' ,(req, res)=>{
    const teaIndex = teaData.findIndex((e)=> e.id === parseInt(req.params.id))
    if(teaIndex < 0){
       return res.status(404).send("tea not found")
    }
    else{
        teaData.splice(teaIndex, 1)
        return res.status(200).send("deleted")
    }
})

//  UPDATE A TEA

app.put('/teas/:id' , (req, res)=>{
    const tea = teaData.find((t)=> t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("tea not found")
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})


app.listen(port, ()=>{
    console.log(`Server is running a port: ${port}`);
})