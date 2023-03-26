import React from 'react'

const CreateRecipe = () => {
  return (
    <div className="create-recipe">
      <h2>CreateRecipe</h2>
      <form>
        <label htmlFor='name'>Name</label>
        <input type="text" id="name" />
        <label htmlFor='description'>Description</label>
        <input type="text" id="description" />
        <label htmlFor='ingredients'>Ingredients</label>
        
        <label htmlFor='instructions'>Instructions</label>
        <input type="text" id="instructions" />
        <label htmlFor='imageUrl'>Image URL</label>
        <input type="text" id="imageUrl" name="imageUrl"/>
        <label htmlFor='cookingTime'>Cooking Time in mins</label>
        <input type="number" id="cookingTime" name="cookingTime"/>
      </form>
    </div>
  )
}

export default CreateRecipe;