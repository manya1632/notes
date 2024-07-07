import React from 'react'
import Home from './pages/Home'
import Signin from './pages/Login'
import Signup from './pages/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const routes = (
  <Router>
    <Routes>
      <Route path="/" exact element={<Home></Home>}></Route>
      <Route path="/register" exact element={<Signup/>}></Route>
      <Route path="/login" exact element={<Signin/>}></Route>
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
