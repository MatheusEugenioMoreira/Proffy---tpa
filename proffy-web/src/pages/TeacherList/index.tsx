import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';


import './styles.css';
import api from '../../Services/api';



function TeacherList() {
    const [teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    async function searchTeachers(e:FormEvent) {
        e.preventDefault()

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        setTeachers(response.data)
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                    name="subject" 
                    label="Matéria" 
                    value={subject}
                    onChange= {e => { setSubject(e.target.value)}}
                    options={[
                        { value: 'Redes e Arquitetura de Computadores', label: 'Redes e Arquitetura de Computadores' },
                        { value: 'Técnicas de Programação avançada', label: 'Técnicas de Programação avançada' },
                        { value: 'Segurança da Informação', label: 'Segurança da Informação' },
                        { value: 'Desenvolvimento Mobile', label: 'Desenvolvimento Mobile' },
                        { value: 'Desenvolvimento Web', label: 'Desenvolvimento Web' },
                        { value: 'Banco de Dados', label: 'Banco de Dados' },
                        { value: 'React Native', label: 'React Native' },
                        { value: 'JavaScript', label: 'JavaScript' },
                        { value: 'AngularJS', label: 'AngularJS' },
                        { value: 'Bootstrap', label: 'Bootstrap' },
                        { value: 'Hacking', label: 'Hacking' },
                        { value: 'ReactJS', label: 'ReactJS' },
                        { value: 'JQuery', label: 'JQuery' },
                        { value: 'NodeJS', label: 'NodeJS' },
                        { value: 'Python', label: 'Python' },
                        { value: 'HTML', label: 'HTML' },
                        { value: 'PHP', label: 'PHP' },
                        { value: 'CSS', label: 'CSS' },                                  
                    ]}
                />
                    <Select 
                    name="week_day" 
                    label="Dia da semana" 
                    value={week_day}
                    onChange= {e => { setWeekDay(e.target.value)}}
                    options={[
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-feira' },
                        { value: '2', label: 'Terça-feira' },
                        { value: '3', label: 'Quarta-feira' },
                        { value: '4', label: 'Quinta-feira' },
                        { value: '5', label: 'Sexta-feira' },
                        { value: '6', label: 'Sábado' }
                    ]}
                    /> 
                    <Input 
                        type="time" 
                        name="time" 
                        label="Hora"
                        value={time}
                        onChange= {e => { setTime(e.target.value)}}
                    />

                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) =>{
                    return <TeacherItem key={teacher.id}  teacher={teacher}/>
                })}
            </main>
        </div>
    ) 
}



export default TeacherList;