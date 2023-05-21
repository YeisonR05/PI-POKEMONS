import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
    return (
        <>
            <div className={style.body}>
                <div>
                <Link to="/home">
                        <button className={style.button}>GO TO POKEMONS</button>
                </Link>
                </div>  
            </div> 
        </>
    )
};

export default Landing;