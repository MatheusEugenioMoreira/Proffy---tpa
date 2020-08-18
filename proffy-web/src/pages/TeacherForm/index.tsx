import React, { useState, FormEvent } from 'react';
import {  useHistory  } from 'react-router-dom'

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'
import api from '../../Services/api';

function TeacherForm() {
    const history = useHistory()

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')
    const [cep, setCep] = useState('')
    const [end, setEnd] = useState('')
    const [num, setNum] = useState('')
    const [comp, setComp] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ])

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ])

        scheduleItems.push()
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem
        })

        setScheduleItems(updatedScheduleItems)
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault()

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            cep,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!!')

            history.push('/')
        }).catch(()=> {
            alert('Erro no cadastro!!')
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo, é preencher esse
                            formulário de inscrição."
            />

            <main>
                <form onSubmit= {handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <Input
                            name="whatsapp"
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />                     
                        <Input
                            name="cep"
                            label="cep"
                            value={cep}
                            onChange={(e) => { setCep(e.target.value) }}
                        />
                        <Input
                            name="end"
                            label="Endereço"
                            value={end}
                            onChange={(e) => { setEnd(e.target.value) }}
                        />
                        <Input
                            name="num"
                            label="Número"
                            value={num}
                            onChange={(e) => { setNum(e.target.value) }}
                        />
                        <Input
                            name="comp"
                            label="Complemento"
                            value={comp}
                            onChange={(e) => { setComp(e.target.value) }}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
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
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem} >
                                + Novo Horário
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={ e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                                        name="from" 
                                        label="Das" 
                                        type="time" 
                                        value={scheduleItem.from}
                                        onChange={ e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input 
                                        name="to" 
                                        label="Até" 
                                        type="time" 
                                        value={scheduleItem.to}
                                        onChange={ e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;