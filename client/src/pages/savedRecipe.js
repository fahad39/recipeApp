import React,{useState,useEffect} from 'react'
import api from "../api/configAxios"
import { useGetUserID } from '../hook/useGetUserID'

const SavedRecipe = () => {
  const userID=useGetUserID()
  const [savedRecipes, setSavedRecipes] = useState([])

  useEffect(() => {
    
    const fetchSavedRecipes=async()=>{
      try {
        const response=await api.get(`recipes/savedRecipes/${userID}`)
        setSavedRecipes(response.data.savedRecipes)
      } catch (error) {
        console.error(error)
      }

    }
    fetchSavedRecipes()
  
  }, [])
  



  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe)=>{
          return <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              
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

export default SavedRecipe;