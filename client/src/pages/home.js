import React,{useState,useEffect} from 'react'
import api from "../api/configAxios"
import { useGetUserID } from '../hook/useGetUserID'
import {useCookies} from "react-cookie"

const Home = () => {
  const userID=useGetUserID()
  const [recipes, setRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const [cookies, _]=useCookies(["access_token"])

  useEffect(() => {
    const fetchRecipes=async()=>{
      try {
        const response=await api.get("recipes")
        setRecipes(response.data)
      } catch (error) {
        console.error(error)
      }

    }
    const fetchSavedRecipes=async()=>{
      try {
        const response=await api.get(`recipes/savedRecipes/ids/${userID}`)
        setSavedRecipes(response.data.savedRecipes)
      } catch (error) {
        console.error(error)
      }

    }
    fetchRecipes()

      fetchSavedRecipes()
    
  
  }, [])
  
  const saveRecipe=async(recipeID)=>{
    try {
        const response=await api.put("recipes",{recipeID, userID})
        
        setSavedRecipes(response.data.savedRecipes)
    } catch (error) {
        console.error(error)
    }
  }


  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe)=>{
          return <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              {savedRecipes?.includes(recipe._id) ?<button> Saved </button> :<button onClick={()=>saveRecipe(recipe._id)}> Save </button> }
              
            </div>
            <div className='instructions'>
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>

          </li>
        })}
      </ul>

    </div>
  )
}

export default Home;