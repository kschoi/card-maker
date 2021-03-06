import React, { useRef, useState } from 'react';
import { uid } from 'uid';
import Button from '../button/Button';
import style from './card_add_form.module.css';

const CardAddForm = ({ FileInput, onAdd }) => {
  const formRef = useRef();
  const nameRef = useRef();
  const companyRef = useRef();
  const themeRef = useRef();
  const titleRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const [file, setFile] = useState({ fileName: null, fileURL: null });

  const onSubmit = (event) => {
    event.preventDefault();
    const card = {
      id: uid(),
      name: nameRef.current.value || '',
      company: companyRef.current.value || '',
      theme: themeRef.current.value,
      title: titleRef.current.value || '',
      email: emailRef.current.value || '',
      message: messageRef.current.value || '',
      fileurl: file.fileURL || null,
      filename: file.fileName || null,
    };
    formRef.current.reset();
    setFile({ fileName: null, fileURL: null });
    onAdd(card);
  };

  const onHandleUpload = (fileInfo) => {
    setFile({ fileName: fileInfo.name, fileURL: fileInfo.url });
  };

  return (
    <form ref={formRef} className={style.form}>
      <input
        ref={nameRef}
        className={style.input}
        type='text'
        placeholder='Name'
        name='name'
      />
      <input
        ref={companyRef}
        className={style.input}
        placeholder='Company'
        name='company'
      />
      <select ref={themeRef} name='theme' className={style.select}>
        <option value='dark'>Dark</option>
        <option value='light'>Light</option>
        <option value='colorful'>Colorful</option>
      </select>
      <input
        ref={titleRef}
        className={style.input}
        placeholder='title'
        name='title'
      />
      <input
        ref={emailRef}
        className={style.input}
        placeholder='email'
        name='email'
      />
      <textarea
        ref={messageRef}
        name='message'
        className={style.textarea}
        placeholder='message'
      ></textarea>
      <div className={style.fileInput}>
        <FileInput onUpload={onHandleUpload} fileName={file.fileName} />
        {/* <ImageFileInput onUpload={onHandleUpload} /> */}
      </div>
      <Button name='Add' onClick={onSubmit} />
    </form>
  );
};

export default CardAddForm;
