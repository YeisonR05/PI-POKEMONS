import React from "react";
import { Link } from "react-router-dom";
import style from "./landingPage.module.css";

const Landing = () => {
    return (
        <>
            <div className={style.flexContainer}>
                <div className={style.firstContainer}>
                    <div className={style.hContainer}>
                        <h1 className={style.title}>MUNDO DE LOS POKEMONS!!!</h1>
                        <h3 className={style.text}> AQUÍ VA UNA DESPRICIÓN DE LA LANDING, <br />
                            Además podemos crear Pokemons </h3>
                    </div>
                    <Link to="/pokemons">
                        <button className={style.button}>Entrar al Pokemons</button>

                    </Link>
                </div>

                
            </div>
        </>
    )
};

export default Landing;