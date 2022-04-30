import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axios from "axios"


import ProtectedRoute from "./ProtectedRoute";



const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

const initialFormValues = { title: '', text: '', topic: '' }

export default function App() {
  
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  const [articleToEdit, setArticleToEdit] = useState(false)
  const [values, setValues] = useState(initialFormValues)
 

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { /* ✨ implement */ 
  const token = localStorage.getItem("token")
  
  if(!token){
    return navigate("/")
  } else {
     return navigate("articles")
  }
// navigate("/")
}
  const redirectToArticles = () => { /* ✨ implement */
navigate("articles") }

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.

   

      navigate("/")
      setMessage('Goodbye!')
      // redirectToLogin()
     
      localStorage.removeItem("token")
      
   
  }

  const login = ({ username, password }) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
    setSpinnerOn(true)
    axios.post("http://localhost:9000/api/login", {username, password })
    .then(res => {
      console.log(res)
      localStorage.setItem("token", res.data.token)
      setMessage(res.data.message)
      navigate("articles")
      
     
     
      setSpinnerOn(false)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
    setMessage("")
    setSpinnerOn(true)
    const token = localStorage.getItem("token")
    axios.get("http://localhost:9000/api/articles", {
      headers: {
        authorization: token
      }
    })
    .then(res => {
      // console.log(res)
      setArticles(res.data.articles)
      // setMessage(res.data.message)
      setSpinnerOn(false)
    })
    .catch(err => {
      console.log(err)
    })

  }


  const postArticle = ({title, text, topic }) => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
    setSpinnerOn(true)
    setMessage("")
    const token = localStorage.getItem("token")
    axios.post("http://localhost:9000/api/articles", {title, text, topic}, {
      headers: {
        authorization: token
      }
    })
    .then(res => {
      
      
      
      getArticles()
      // setValues(initialFormValues)
      setMessage(res.data.message)
      
      
    })
    .catch(err => {
      console.log(err)
    })
    
  }

  const updateArticle = ( article_id, article ) => {
    // ✨ implement
    // You got this!

    setSpinnerOn(true)
    setMessage("")
    const token = localStorage.getItem("token")
    
    axios.put(`http://localhost:9000/api/articles/${article_id}`, article, {
      headers: {
        authorization: token
      }
    })
    .then(res => {
      console.log(res)
     
      getArticles()
      setValues(initialFormValues)
      setMessage(res.data.message)
      

    })
    .catch(err => {
      console.log(err)
    })
    
  }

  const deleteArticle = article_id => {
    // ✨ implement
    const token = localStorage.getItem("token")
    axios.delete(`http://localhost:9000/api/articles/${article_id}`, {
      headers: {
        authorization:token
      }
    })
    .then(res => {
      console.log(res)
      
      getArticles()
      setMessage(res.data.message)
      
    })
    .catch(err => {
      console.log(err)
    })
    // .axios.get("http://localhost:9000/api/articles")
    // .then(res => {
    //   // console.log(res)
    //   setArticles(res.data.articles)
    //   // setMessage(res.data.message)
     
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }
  
  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <React.StrictMode>
      <Spinner />
      <Message message={message} setMessage={setMessage}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink  id="articlesScreen" to={redirectToLogin}>Articles</NavLink>
        </nav>
       
        <Routes>
          <Route path="/" element={<LoginForm login={login}/>} />

          {/* <ProtectedRoute path="articles" >
            <ArticleForm/>
            
          </ProtectedRoute> */}
          {/* <ProtectedRoute exact path="articles" component={ArticleForm} /> */}
          {/* <ProtectedRoute exact path="articles" component={Articles} /> */}
          <Route path="articles" element={
            <>
              
              <ArticleForm  setCurrentArticleId={setCurrentArticleId} currentArticleId={currentArticleId} values={values} setValues={setValues} postArticle={postArticle} currentArticle={currentArticleId} setCurrentArticleId={setCurrentArticleId} message={message} setMessage={setMessage} updateArticle={updateArticle} articles={articles} setArticles={setArticles} articleToEdit={articleToEdit} setArticleToEdit={setArticleToEdit}/>
              <Articles  setCurrentArticleId={setCurrentArticleId}currentArticleId={currentArticleId}values={values} setValues={setValues}articleToEdit={articleToEdit} setArticleToEdit={setArticleToEdit}deleteArticle={deleteArticle}postArticle={postArticle} message={message} getArticles={getArticles} setMessage={setMessage}  articles={articles} setArticles={setArticles} updateArticle={updateArticle}/>
            </>
          } />
        </Routes>
        
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </React.StrictMode>
  )
}
