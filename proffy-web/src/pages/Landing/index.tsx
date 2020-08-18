import React, { useState, useEffect } from 'react';
import {  Link  } from 'react-router-dom';
import api from '../../Services/api';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/3411110.svg';

import StudyIcons from '../../assets/images/icons/study.svg';
import giveClassesIcons  from '../../assets/images/icons/give-classes.svg';

import './styles.css'

function Landing() {
    const [totalConnections, setTotalConnections] = useState(0)

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data

            setTotalConnections(total)
        })
    }, [])
    
    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua plataforma de ensino técnico.</h2>
                </div>

                <img 
                src={landingImg} alt="Plataforma de estudos"
                className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={StudyIcons} alt="Estudar"/>
                        Escolher aula
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcons} alt="Dar aulas"/>
                        Dar aulas
                    </Link>
                </div>

                <span className="total-connections">
                     Total de {totalConnections} conexões já realizadas 
                </span>  
            </div>
        </div>
    )
}

export default Landing;