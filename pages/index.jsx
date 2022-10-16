import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {

  const [input, setinput] = useState('');
  const [output, setoutput] = useState('');

  const pinApi = async () => {
    let res = await axios.post('api/run-model', { prompt: input.trim() });
    console.log(res);
    setoutput(res.data.output.trim().replaceAll('.\n\n',''));
  }

  return (
    <div className={styles.container}>
      <img className={styles.logo} src="./undefined_AI.png" alt="" />
      <div className={styles.modelFrame}>
        <span className={styles.inputCon}>
          <label htmlFor="">
            <h1>Input</h1>
            <span className={styles.preset}>preset: Default</span>
          </label>
          <span className={styles.inputWithBtn}>
            <input value={input} onChange={(e) => { setinput(e.target.value) }} placeholder='Write a summary about....' type="text" />
            <button onClick={() => { pinApi() }}>Generate</button>
          </span>
        </span>
        <span className={styles.inputCon}>
          <label htmlFor="">
            <h1>Output</h1>
          </label>
          <textarea value={output} placeholder='Your output goes here....' name="" id="" cols="30" rows="10"></textarea>
        </span>
      </div>
      <a className={styles.footer} href="https://openai.com/api/">Powered by Open AI</a>
    </div>
  )
}
