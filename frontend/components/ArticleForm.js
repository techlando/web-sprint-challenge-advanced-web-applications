import React, { useEffect, useState } from 'react'
import PT from 'prop-types'
import axios from "axios";

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  // const [values, setValues] = useState(initialFormValues)
  // ✨ where are my props? Destructure them here

  const {  values, setValues, articleToEdit, setArticleToEdit, currentArticleId, postArticle, updateArticle } = props
  


  useEffect(() => {
    
    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.
  })

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
  if(articleToEdit === true ){
    
    updateArticle(currentArticleId, values)
    
  } else {
     postArticle(values)
      setValues(initialFormValues);
    
  }
    evt.preventDefault()
   
   
      

   
  }

  const cancelEdit = (e) => {
    e.preventDefault()
    setValues(initialFormValues)
    setArticleToEdit(false)
  }


  const isDisabled = (values) => {
    // ✨ implement
    // Make sure the inputs have some values
    if(values.title >1 && values.text >1 ) {
      return true 
    } else {
      return  false
    }
  }

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function

  <div> 
    <form id="form" onSubmit={onSubmit}>
       {articleToEdit ? 
         <h2>Edit Article</h2> : <h2>Create Article</h2>
       }
      
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      

      {!articleToEdit ? <div className="button-group"> 
       <button  disabled={!values.text } id="submitArticle">Submit</button> </div>
     
      :
      <div className="button-group"> 
       <button  disabled={!values.text } id="submitArticle">Submit</button>
       <button onClick={cancelEdit}>Cancel edit</button> 
       </div> }
        
        
      
    </form>
  </div>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
