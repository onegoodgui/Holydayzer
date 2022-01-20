import express from "express";
import cors from 'cors';
import { holidays } from "./holidays.js";


const app = express();
app.use(cors());

app.get('/holidays/:idDoMes',(req,res) => {
    const id = req.params.idDoMes;

    if(id !== null || id !== undefined){

        const feriadosDoMes = 
        holidays.filter((holiday) => {
            const dateArray = holiday.date.split('/');
            console.log(dateArray)
            const mes = dateArray[0];
            if(mes === id){
                return true
            }
        })

        if(feriadosDoMes.length === 0){
            res.send('Não há feriados neste mês!');
        }
        else{
            res.send(feriadosDoMes)
        }
        
        return
    }

    
    res.send(holidays);
})

app.get('/is-today-holiday',(req,res) => {
    const hoje = new Date().toLocaleDateString;
    for(let i = 0; i<holidays.length; i++){
        if(hoje === holidays[i].date){
            res.send(`Hoje é o feriado de ${holidays[i].name}`)
            return
        }
    }
    res.send('Hoje não é feriado');
})

app.listen(5000);