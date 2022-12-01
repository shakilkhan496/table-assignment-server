const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server is listening');
})



//mongodb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.83izqje.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run() {
    try {
        const tableDataCollection = client.db("TableAssignMent").collection("users");

        //mongodb functionality
        app.get('/users', async (req, res) => {
            const query = {};
            console.log(req.query.user)
            const user = req.query.user === 'asc' ? 1 : -1;
            const city = req.query.city === 'asc' ? 1 : -1;
            const email = req.query.city === 'asc' ? 1 : -1;
            const joiningDate = req.query.city === 'asc' ? 1 : -1;
            const role = req.query.city === 'asc' ? 1 : -1;
            const users = await tableDataCollection.find(query).sort({ person: user, city: city, email: email, joiningDate: joiningDate, role: role }).toArray();
            res.send(users);
        })

    }
    finally {
        // close the
    }

}

run().catch(console.dir);





app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})