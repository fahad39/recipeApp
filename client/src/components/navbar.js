import React from 'react'
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div className='navbar'>
        <Link to="/">Home</Link>
        <Link to="/createRecipe">Create Recipe</Link>
        <Link to="/savedRecipe">Saved Recipie</Link>
        <Link to="/auth">Login / Register</Link>
    </div>
  )
}

export default Navbar