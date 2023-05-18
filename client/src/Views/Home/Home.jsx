import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getPokemons, filterByType, orderByName, filterByState } from "../../redux/actions"
import Card from "../../components/Card/Card";
import Paginated from "../../components/Paginated/Paginated";
import { Link } from "react-router-dom";
import styles from "../Home/Home.module.css"; 
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Home(){
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemon);
  const allTypes = useSelector((state) => state.types)
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(12);
  const indexOfLast = currentPage * pokemonPerPage;
  const indexOfFirst = indexOfLast - pokemonPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirst, indexOfLast);
  const [order, setOrder] = useState('');

  const rechargePokemon = () => {
    dispatch(getPokemons());
    setCurrentPage(1);
};
const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
};

useEffect(() => {
   rechargePokemon();
}, []);

const handleSort = (e) =>{
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
};

const filterType = (e) => {
    dispatch(filterByType(e.target.value))
};

const filterState = (e) => {
    dispatch(filterByState(e.target.value));
};

return (
    <div className={styles.body}>

        <div className={styles.nav}>
            <h2 className={styles.title}></h2>

            <button onClick={rechargePokemon} className={styles.button}>Recharge</button>

            <select onChange={(e) => handleSort(e) } className={styles.button}>
                <option value= 'none'>Order</option>
                <option value= 'stronger'>Stronger</option>
                <option value= 'weakness'>Weakness</option>
                <option value = 'asc'>A-Z</option>
                <option value = 'des'>Z-A</option>
                </select>

        <select onChange={filterType} className={styles.button}>
            <option value="all">All types</option>
            {allTypes.map((t) => (
            <option key={t.name} value={t.name}>{t.name}</option>
            ))}
        </select>

        <select onChange={filterState} className={styles.button}>
            <option value='none'>By State</option>
            <option value='true'>Created</option>
            <option value='false'>Existent</option>
        </select>

        <Link to='/create'><button className={styles.button}>Create Pokemon</button></Link>

        <SearchBar />

        </div>
    <div className={styles.cards}>
        {   currentPokemons?.map((e) => {
            return (
                <Card 
                name={e.name} 
                type={e.types.slice(0, 2)} 
                images={e.image} 
                id={e.id} key={e.id} 
                className={styles.cards}/>
            )
        })
        }
    </div>
    {            allPokemons.length === 0 && (
            <img  className={styles.loadingPokemons}/>
        )  }

        
        <Paginated
        pokemonPerPage={pokemonPerPage}
        allPokemons={allPokemons.length}
        paginated={paginated}
        />
    </div>
);

};