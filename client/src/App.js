import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';


function App() {

  const [friends, setFriends] = useState([])
  const [name, setName] = useState("")
  const [age, setAge] = useState("")

  useEffect(() => {
    Axios.get('http://localhost:3001/friends/fetch').then((response) => {
      setFriends(response.data)
    })
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFriend = {
      name,
      age: Number(age)
    }

    Axios.post('http://localhost:3001/friend/add', newFriend).then((response) => {
      setName("")
      setAge("")
    })
  }

  const deleteFriend = (id) => {
    Axios.delete(`http://localhost:3001/friend/delete/${id}`)
  }

  const updateFriend = async (id) => {
    const updatedName = prompt('Please enter a new name')
    const updatedAge = prompt('Please enter a new age')

    if (updatedName && updatedAge) {
      await Axios.put('http://localhost:3001/friend/update', { _id: id, name: updatedName, age: updatedAge })
    }
  }

  return (
    <div className="App mt-5 mx-auto border px-4 py-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label"><b>Name:</b></label>
          <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label"><b>Age:</b></label>
          <input type="number" className="form-control" id="age" value={age} onChange={e => setAge(e.target.value)} />
        </div>

        <div className="d-grid"><button type="submit" className="btn btn-warning">Submit</button></div>
      </form>
      <hr />
      <ul className="friends list-group">
        {friends.map(friend => {
          return <li key={friend._id} className="list-group-item">{friend.name} - {friend.age}
            <i title="delete" className="bi bi-trash" onClick={deleteFriend.bind(this, friend._id)}></i>
            <i title="update" className="bi bi-pencil-square" onClick={() => updateFriend(friend._id)}></i>
          </li>
        }
        )}
      </ul>
    </div>
  );
}

export default App;
