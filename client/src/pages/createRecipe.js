import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../api/configAxios"
import { useGetUserID } from '../hook/useGetUserID'

const CreateRecipe = () => {
  const userID=useGetUserID()
  const navigate=useNavigate()
  const [recipe, setRecipe] = useState({
    name:"",
    ingredients:[],
    instructions:"",
    imageUrl:"",
    cookingTime:0,
    userOwner:userID
  })

  
  const handleChage=(event)=>{
    const {name,value}=event.target;
    setRecipe({...recipe,[name]:value})
  }
  const handleIngredientChange=(event,index)=>{
    const {value}=event.target;
    const ingredients=recipe.ingredients;
    ingredients[index]=value
    setRecipe({...recipe,ingredients:ingredients})
  }

  const addIngredient=(event)=>{
    setRecipe({...recipe,ingredients:[...recipe.ingredients,""]})
  }

  const onSubmit=async(event)=>{
    event.preventDefault()
    try {
      await api.post("recipes",recipe)
      alert("recipe created")
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="create-recipe">
      <h2>CreateRecipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>Name</label>
        <input type="text" id="name" name="name" onChange={handleChage} />
       
        <label htmlFor='ingredients'>Ingredients</label>
        {recipe.ingredients.map((ingredient,index)=><input key={index} type="text" id="ingredients" name="ingredients" value={ingredient} onChange={(event)=>handleIngredientChange(event,index)}  />)}
        <button type='button' onClick={addIngredient}>Add Ingredients</button>
        
        
        <label htmlFor='instructions'>Instructions</label>
        <textarea type="text" id="instructions" name="instructions" onChange={handleChage} />
        <label htmlFor='imageUrl'>Image URL</label>
        <input type="text" id="imageUrl" name="imageUrl" onChange={handleChage}/>
        <label htmlFor='cookingTime'>Cooking Time in mins</label>
        <input type="number" id="cookingTime" name="cookingTime" onChange={handleChage}/>

        <button type='submit'>Create Recipe</button>

      </form>
    </div>
  )
}

export default CreateRecipe;