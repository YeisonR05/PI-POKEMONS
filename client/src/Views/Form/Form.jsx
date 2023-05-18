import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { validate } from "./validator.js";
import { createPokemon, getTypes } from "../../redux/actions";
import styles from "./Form.module.css";

export default function PokemonCreate() {
    const dispatch = useDispatch();
    const typesData = useSelector((state) => state.types); // traer cosas del reducer
    const [types, setTypes] = useState([]);
    const [error, setError] = useState({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      image: "",
      types: [],
    }); //objeto igual a input
    const [input, setInput] = useState({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      image: "",
      types: [],
    });
  
    useEffect(() => {
      dispatch(getTypes());
   }, [dispatch]);
  
    const handleInputChange = (e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
  
      setError(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (types.length > 2) {
        return alert("Choose only two types");
      }
      
      if (!types.length) {
        alert("Select a Type");
      } else {
        dispatch(createPokemon(input));
  
        setInput({
          name: "",
          hp: "",
          attack: "",
          defense: "",
          speed: "",
          height: "",
          weight: "",
          image: "",
          types: [],
        });
  
        setTypes([]);
        e.target.reset();
        alert("A new Egg has Hatched!");
      }
    };
  
    const handleTypesChange = (e) => {
      if (e.target.checked) {
        setTypes([...types, e.target.value]);
        setInput({ ...input, types: [...types, e.target.value] });
      }    
    };
  
    return (
      <div className={styles.body}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.nav}>
            <h1>Create Pokemon</h1>
            <button className={styles.button}>Create</button>
            <Link to="/home">
              <button className={styles.button}>Back</button>
            </Link>
          </div>
  
          <div className={styles.statsAndTypes}>
            <div className={styles.stats}>
              <h3>Stats</h3>
  
              <div className={styles.centralize}>
                <div className={styles.inputBlock}>
                  <input
                    type="text"
                    name="name"
                    id="input-text"
                    required
                    spellCheck="false"
                    value={input.name}
                    onChange={handleInputChange}
                  />
  
                  {error.name && <p>{error.name}</p>}
  
                  <span className={styles.centralize}>Name</span>
                </div>
              </div>
  
              <div className={styles.centralize}>
                <div className={styles.inputBlock}>
                  <input
                    type="number"
                    name="hp"
                    id="input-text"
                    required
                    spellCheck="false"
                    value={input.hp}
                    onChange={handleInputChange}
                  />
                  <span className={styles.placeholder}>Health Points </span>
                </div>
              </div>
  
              <div className={styles.centralize}>
                <div className={styles.inputBlock}>
                  <input
                    type="number"
                    name="attack"
                    id="input-text"
                    required
                    spellCheck="false"
                    value={input.attack}
                    onChange={handleInputChange}
                  />
                  <span className={styles.placeholder}>Attack</span>
                </div>
              </div>
  
              <div className={styles.centralize}>
                <div className={styles.inputBlock}>
                  <input
                    type="number"
                    name="defense"
                    id="input-text"
                    required
                    spellCheck="false"
                    value={input.defense}
                    onChange={handleInputChange}
                  />
                  <span className={styles.placeholder}>Defense</span>
                </div>
              </div>
  
              <div className={styles.centralize}>
                <div className={styles.inputBlock}>
                  <input
                    type="number"
                    name="speed"
                    id="input-text"
                    required
                    spellCheck="false"
                    value={input.speed}
                    onChange={handleInputChange}
                  />
                  <span className={styles.placeholder}>Speed</span>
                </div>
              </div>
  
              <div className={styles.centralize}>
                <div className={styles.inputBlock}>
                  <input
                    type="number"
                    name="height"
                    id="input-text"
                    required
                    spellCheck="false"
                    value={input.height}
                    onChange={handleInputChange}
                  />
                  <span className={styles.placeholder}>Height</span>
                </div>
              </div>
  
              <div className={styles.centralize}>
                <div className={styles.inputBlock}>
                  <input
                    type="number"
                    name="weight"
                    id="input-text"
                    required
                    spellCheck="false"
                    value={input.weight}
                    onChange={handleInputChange}
                  />
                  <span className={styles.placeholder}>Weight</span>
                </div>
              </div>
  
              <div className={styles.centralize}>
                <div className={styles.inputBlock}>
                  <input
                    type="text"
                    name="image"
                    id="input-text"
                    required
                    spellCheck="false"
                    value={input.image}
                    onChange={handleInputChange}
                  />
                  {error.image && <p>{error.image}</p>}
                  <span className={styles.placeholder}>Image Link: </span>
                </div>
              </div>
            </div>
  
            <div className={styles.types}>
              <h3>Types</h3>
              <div className={styles.typesOrder}>
                {typesData.map((e) => (
                  <div className={styles.container}>
                    <ul className={styles.ksCboxtags}>
                      <li>
                        <input
                          onChange={handleTypesChange}
                          type="checkbox"
                          id={`checkbox${e.id}`}
                          value={e.name}
                        />
                        <label for={`checkbox${e.id}`}>{e.name}</label>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }