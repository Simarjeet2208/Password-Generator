import { useEffect, useRef } from "react";
import { useCallback } from "react";
import { useState } from "react"

function App() {

  let [length, setLength] = useState(7);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false)
  let [capitalAllowed, setCapitalAllowed] = useState(false)
  let [password, setPassword] = useState("")
  // let [prev, setPrev] = useState(true)
  const passwordRef = useRef(null);

  let passwordGenerator = useCallback(()=>{

    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+[];,./{}|:<>?"
    if (capitalAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }

    setPassword(pass);

  },[length, numberAllowed, charAllowed, capitalAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])


  return (
   <div className="w-full h-screen bg-gray-800 py-8">
      <div className="max-w-xl mx-auto border-l-yellow-200 border shadow-md rounded-lg px-7 py-10 bg-gray-800 text-orange-500">
    
      <div className="text-center text-4xl text-bold">
        <h1>Password Generator</h1>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-5 rounded-xl overflow-hidden">
        <input
        type="text"
        value={password}
        readOnly 
        ref={passwordRef}
        className="w-full p-1 my-5 rounded-xl"/>
        <button className="p-1 px-5 my-5 mx-10 sm:m-auto bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-xl"
          onClick={copyPasswordToClipboard}
          
        >COPY</button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2">
          <input
          type="range"
          min={6}
          max={20}
          value={length}
          className="cursor-pointer"
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>length: {length}</label>
        </div>

        <div className="flex gap-2">
          <input
          type="checkbox"
          defaultChecked = {capitalAllowed}
          id="checkCapital"
          onChange={()=>{
            setCapitalAllowed((prev)=>!prev)
          }} />
          <label htmlFor="checkCapital">Capital Letter</label>
        </div>

        <div className="flex gap-2">
          <input
          type="checkbox"
          defaultChecked = {numberAllowed}
          id="checkNumber"
          onChange={()=>{
            setNumberAllowed((prev)=>!prev)
          }} />
          <label htmlFor="checkNumber">Number</label>
        </div>

        <div className="flex gap-2">
          <input
          type="checkbox"
          defaultChecked = {charAllowed}
          id="checkChar"
          onChange={()=>{
            setCharAllowed((prev)=>!prev)
          }} />
          <label htmlFor="checkChar">Character</label>
        </div>
      </div>

    </div>
   </div>

  )
}

export default App
