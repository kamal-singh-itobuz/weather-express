import express from 'express';
import {data} from './data.js';

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.status(200).send({data: JSON.stringify(data), message: "Whole Data", status: 200});
});

app.get('/:location', (req, res) => {
    const cityName = req.params.location;
    const cityData = data.find(ele => ele['name'] === cityName);
    if(cityData) res.send({data: JSON.stringify(cityData), message: "Okay", status: 200});
    else res.send({message: "Opps! Data not found!", status: 404, data: null});
});


app.listen(PORT, () => console.log(`Server is listening on the port ${PORT}`));