import './App.css';
import {useState, useEffect} from 'react';
import {Button, InputLabel,Input,FormControl} from '@material-ui/core'
import Message from './Message';
import db from './Config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send'
import {IconButton} from '@material-ui/core'

function App() {

  // Making a state for the input send message area
  const [input, setInput] = useState('');

  // To store the messages
  const [messages,setMessages]=useState([]);

  // To store the user
  const [username,setUserName] = useState('');

    // 
    useEffect(()=>{
      // App component loads
      // All the data will be stored in one sapshot onsnapshot is taking the pic of the databse
      // So whenever there is a change in database it will take a snap
      db.collection('messages')
      .orderBy('timestamp','desc')
      .onSnapshot(snapshot=>{
        setMessages(snapshot.docs.map(doc=>({id:doc.id, message: doc.data()})))
      })
    },[])

  // Run code based on a given condition
  useEffect(()=>{
    setUserName(prompt('Please enter your name:'))
    
    //  It the  [] is blank, means no condition then it will only run once

    // It tells us that every time input changes use effect will run
  // },[input]) // condition
  },[]) // condition

  // console.log(input);
  // console.log(messages)

  const sendMessage = (event) =>{
    event.preventDefault();
    // All the logic to send message goes here 
    // Ex :- setMessage = ["Hello", "How"]
    // and then we give an input like ("Rahul")
    // So we want it to be like setMessage = ["Hello", "How"] + input ("Rahul")
    // That's what we are doing keeping the old messages and addind new input to the messages
    // setMessages([...messages,input])

    // Pushing the data into databse
    db.collection('messages').add({
      message:input,
      username:username,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })

    // Now as we have changed the structure so 
    // setMessages([...messages,{username:username, text:input}])

    // After he send message we want input field to be cleared 
    setInput('')
  }

  return (
    <div className="App">
      <img src="./Assets/Logo/logo.svg"/>
      <h1> Hello Rahul </h1>
      <h2>Welcome {username}</h2> 
        <form className = "app_form">
          <FormControl className="app_formControl">
              <Input className="app_formInput" placeholder='Enter a message...' value={input} onChange={event=>setInput(event.target.value)}/>
                <IconButton className ="app_formIconButton" disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>
                  <SendIcon />
                </IconButton>
          </FormControl>
        </form>

      {/* Showing messages */}
      <FlipMove>
        {
          messages.map(({id, message})=>(
            <Message key={id} username ={username} message={message}/>
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
