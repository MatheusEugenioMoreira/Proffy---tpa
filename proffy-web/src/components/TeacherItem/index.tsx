/* eslint-disable react/jsx-no-target-blank */
import React from 'react';

import './style.css';

import WhatsIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../Services/api';

export interface Teacher {
        id: number
        avatar: string
        bio: string
        cost: number
        name: string
        subject: string
        whatsapp: string
        cep: number
        rua: string
        numero: number
        complemento: number
    }

interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem:React.FC<TeacherItemProps> = ({ teacher }) => {
    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id
        })
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>
                        {teacher.name}
                    </strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>

            <footer>
                <p>
                    Preço/hora
                            <strong>R$ {teacher.cost}</strong>
                </p>
                <a target="_blank" onClick={createNewConnection} href={` https://wa.me/${teacher.whatsapp}`}>
                    <img src={WhatsIcon} alt="Whatsapp" />
                            Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;