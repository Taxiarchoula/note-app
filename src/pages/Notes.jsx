import React, { useState, useEffect } from 'react'
import {CiSearch} from 'react-icons/ci';
import {MdClose } from 'react-icons/md'
import {Link} from "react-router-dom"
import {BsPlusLg} from "react-icons/bs"
import {TbMoodSadSquint} from "react-icons/tb"
import NoteItem from '../components/NoteItem';
import { useTranslation} from 'react-i18next';
const locales = {
  en: { title: 'Eng' },
  es: { title: 'Esp' },
  gr: { title: 'Ελ' },
};
const Notes = ({notes}) => {
  const { t, i18n } = useTranslation();
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState('')
  const [filteredNotes, setFilteredNotes] = useState(notes)

  const handleSearch = () => {
    setFilteredNotes(notes.filter(note => {
      if(note.title.toLowerCase().match(text.toLocaleLowerCase())){
        return note;
      }
    }))
  }
  useEffect(handleSearch, [text])

  return (
    <section>
         <ul id='list__lang'>
        {Object.keys(locales).map((locale) => (
          <li key={locale}><button className='lang' style={{ fontWeight: i18n.resolvedLanguage === locale ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(locale)}>
            {locales[locale].title}
          </button></li>
        ))}
        </ul>
        <header className='notes__header'>
          {!showSearch && <h2>{t('main.header')}</h2>}
          {showSearch && <input type='text'  value={text} onChange={(e) => {setText(e.target.value);
          handleSearch();}}  autoFocus placeholder={t('main.search')}/>}
            <button className='btn' onClick={() => setShowSearch(prevState => !prevState)}> 
            {showSearch ? <MdClose/> : <CiSearch/>}</button>
        </header>
      <div className='notes__container'>
        {filteredNotes.length == 0 && <p className='empty__notes'>{t('main.notfound')}  <TbMoodSadSquint /></p>}
        {
            filteredNotes.map(note => <NoteItem key={note.id} note={note} />)
        }
      </div>
      <Link to="/create-note" className='btn add__btn'><BsPlusLg/></Link>
    </section>
  )
}

export default Notes

