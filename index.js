const express = require('express');
const app = express()
const port = 8080
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')


app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use(cors());
app.use(express.json())

const users = [
    { id: 1, name: 'ayesha', email: 'ayesha@gmail.com' },
    { id: 2, name: 'maisha', email: 'maisha@gmail.com' },
    { id: 3, name: 'raisa', email: 'raisa@gmail.com' }
]


const uri = "mongodb+srv://dbuser01:aBjRUtkckzvYYnG2@cluster0.6v5oj5d.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {

        const userCollection = client.db('simpleNode').collection('users')


        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users)
        })


        app.post('/users', async (req, res) => {
            const user = req.body
            const result = await userCollection.insertOne(user)
            user.id = result.insertedId;
            res.send(user)
        })

    }
    finally {

    }
}
run().catch(err => console.log(err))





app.post('/users', (req, res) => {
    console.log('posted')
    const user = req.body;
    user.id = users.length + 1;
    users.push(user)
    res.send(user)
})
// app.get('/users', (req, res) => {
//     if (req.query.name) {
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0)
//         res.send(filtered)

//     }
//     else {
//         res.send(users)
//     }


// })



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})