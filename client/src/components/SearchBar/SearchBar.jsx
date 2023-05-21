import { useState } from "react";
import style from "./SearchBar.module.css"
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../../redux/actions";

export default function SearchBar() {
   const dispatch = useDispatch()
   const [name, setName] = useState('')

   function handleInputChange (e) {
      e.preventDefault()
      setName(e.target.value)
  }

  function handleSubmit (e) {
   if(name.trim) {
      dispatch(getNamePokemon(name));
      setName("");
   }
}

return ( 
   <div>
       <input
           type = 'text'
           placeholder="Buscar pokemon"
           onChange={(e)=> handleInputChange(e)}
       />
       <button onClick={(e)=> handleSubmit(e)} className={style.button}>Buscar </button>
   </div>
)

};