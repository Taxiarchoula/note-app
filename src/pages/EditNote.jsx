import React, { useState } from 'react'
import {IoIosArrowBack} from 'react-icons/io'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom'
import useCreateDate from '../components/useCreateDate'
import { useTranslation} from 'react-i18next';
const locales = {
  en: { title: 'Eng' },
  es: { title: 'Esp' },
  gr: { title: 'Ελ' },
};
const EditNote = ({notes, setNotes}) => {
  const { t, i18n } = useTranslation();
  const {id} = useParams();
  const note = notes.find((item) => item.id == id);
  const [title, setTitle] = useState(note.title)
  const [details, setDetails] = useState(note.details)
  const navigate = useNavigate();
  const date = useCreateDate();
  const handleForm = (e) => {
    e.preventDefault();

    if(title && details){
      const newNote = {...note, title,details,date}

      const newNotes = notes.map(item => {
        if(item.id == id){
          item = newNote;
        }
        return item;
      })

      setNotes(newNotes);
    }
    //redirect to home page 
    navigate('/')
  }

  const handleDelete = () => {
    if(window.confirm(t('main.confDel'))) {
      const newNotes = notes.filter(item => item.id != id);

      setNotes(newNotes);
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
          <button className='btn lg primary'onClick={handleForm}>{t('main.save')}</button>
          <button className='btn danger' onClick={handleDelete}><RiDeleteBin6Line/></button>
        </header>
        <form className='create-note__form' onSubmit={handleForm}>
          <input type="text" placeholder={t('main.title')} value={title} onChange={(e) => setTitle(e.target.value)}autoFocus/>
          <textarea rows="28" placeholder={t('main.details')}  value={details} onChange={(e) => setDetails(e.target.value)}></textarea>
        </form>
      </section>
    )
}

export default EditNote
