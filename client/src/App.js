import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { UserContext } from './UserContext';
import { useEffect } from 'react';
import Chat from './components/chat/Chat';
import Home from './components/home/Home';
import Login from './components/auth/login/Login';
import Signup from './components/auth/signup/Signup';


const getlocal = () => {
  let login = localStorage.getItem('loginData');
  console.log(JSON.parse(login));

  if (login) {
    return JSON.parse(login);
  }
}



function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const verifyUser = async () => {

      try {
        const res = await fetch('http://localhost:5000/verifyuser', {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error)
      }


     
      if(getlocal())
      {
        console.log(getlocal());
        setUser(getlocal())
      }

    }
    verifyUser()


  }, [])
  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/chat/:room_id/:room_name" component={Chat} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
