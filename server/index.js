const express = require('express')
const app = express();
const PORT = 3001;
const mongoose = require('mongoose');
const FriendModel = require('./models/friends');
const cors = require('cors');

app.use(express.json())
app.use(cors())

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://user123:Password123@cluster0.aqwhqic.mongodb.net/mern-crud-db-2?retryWrites=true&w=majority', { useNewUrlParser: true })

// Create
app.post('/friend/add', (req, res) => {
    const newFriend = new FriendModel(req.body);
    newFriend.save();
    res.send(`${newFriend.name} with the age of ${newFriend.age} added`)
})

// Read
app.get('/friends/fetch', (req, res) => {
    FriendModel.find({}, (err, friends) => {
        if (err) {
            console.log(err)
        } else {
            res.json(friends)
        }
    })
})

// Update
app.put('/friend/update', async (req, res) => {
    const _id = req.body._id;
    await FriendModel.findOneAndUpdate({ _id }, req.body)
})

// Delete
app.delete('/friend/delete/:id', async (req, res) => {
    const id = req.params.id;
    await FriendModel.deleteOne({ _id: id })
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})