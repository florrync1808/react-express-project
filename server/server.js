const PORT = 8000;
const express = require('express')
const cors = require('cors')
const http = require('http');
const https = require('https');

const app = express()
app.use(cors());

// app.post("/search", (req,res) => {

// })

app.get("/api", (req, response) => {
    console.log(req.query.query.length)

    if (req.query.query.length > 1) {

        https.get('https://restcountries.com/v3.1/name/' + req.query.query, res => {
            let data = [];
            console.log('Status Code:', res.statusCode);

            if (res.statusCode == 200) {
                res.on('data', chunk => {
                    data.push(chunk);
                });
                res.on('end', () => {
                    console.log('Response ended: ');
                    countries = JSON.parse(Buffer.concat(data).toString());
                    // console.log(countries)
                    responseData = []
                    key = 0
                    for (country of countries) {
                        console.log(`Got common name with id: ${country.name.common}, official name: ${country.name.official}`);
                        responseData.push([key, country.name.common, country.capital, country.region, country.timezones]) 
                        key++
                    }
                    response.json({ "countries": responseData })
                    // http://localhost:8000/api?query=mala
                    // {"countries":[[0,["Guatemala City"],"Americas","Central America"],[1,["Lilongwe"],"Africa","Eastern Africa"],[2,["Kuala Lumpur"],"Asia","South-Eastern Asia"]]}
                });
            } else {
                response.json({ "countries": [] })
            }
        }).on('error', err => {
            console.log('Error: ', err.message);
            response.json({ "error": ['Something wrong happended!'] })
        });
    } else {
        response.json({ "info": ['Need more query!'], "info2": ['2Need more query!'] })
    }

})

app.listen(PORT, () => {
    console.log('Port 8000 - Server started.')
});