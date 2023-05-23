import React from 'react'
import {IoIosArrowBack} from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import {v4 as uuid} from 'uuid'
import useCreateDate from '../components/useCreateDate';
import { useTranslation} from 'react-i18next';
const locales = {
  en: { title: 'Eng' },
  es: { title: 'Esp' },
  gr: { title: 'Ελ' },
};
const CreateNote = ({setNotes}) => {
  const { t, i18n } = useTranslation();
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const date = useCreateDate();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(title && details){
      const note = {id: uuid(), title, details,date}
      setNotes(prevNotes => [note, ...prevNotes])

      //redirect to Home page
      navigate('/')
    }


  }
  return (
    <section>
      <ul id='list__lang'>
        {Object.keys(locales).map((locale) => (
          <li key={locale}><button className='lang' style={{ fontWeight: i18n.resolvedLanguage === locale ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(locale)}>
            {locales[locale].title}
          </button></li>
        ))}
        </ul>
      <header className='create-note__header'>
        <Link to="/" className='btn'><IoIosArrowBack/></Link>
        <button className='btn lg primary' onClick={handleSubmit}>{t('main.save')}</button>
      </header>
      <form className='create-note__form' onSubmit={handleSubmit}>
        <input type="text" placeholder={t('main.title')} value={title} onChange={(e) => setTitle(e.target.value)} autoFocus/>
        <textarea rows="28" placeholder={t('main.details')} value={details} onChange={(e) => setDetails(e.target.value)}> </textarea>
      </form>
    </section>
  )
}

export default CreateNote
