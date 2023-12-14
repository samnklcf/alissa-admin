import { useState } from "react"
import React from 'react'


export default function SpeechToText() {

  const [result, setResult] = useState("")
  const [Stop, setStop] = useState(false)
  let [copy, SetCopy] = useState(false);



  let recognition = null;
  
  function stopRecognition() {
    setStop(true)
  }
  
  function startRecognition() {
    setResult("")

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'fr-FR';
  
    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      console.log(result);
      setResult(result)
      // Utiliser la variable "result" pour effectuer une action avec la parole reconnue
    };
  
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
    };
  
    recognition.start();
    
    if(Stop) {
      recognition.stop()
    }
  }
  
 
  const handleCopyClick = () => {
    navigator.clipboard.writeText(result);
    SetCopy(true);
    setTimeout(() => {
      SetCopy(false);
    }, 2000);
  };
 
  

  return (
    <div>
      <div>{result}</div>
      <button onClick={startRecognition} className="btn btn-primary">
         Enregistrer
      </button>
      {" "}
      {/* <button onClick={stopRecognition} className="btn btn-danger">
         Stop
      </button> */}
      <div className="modal-footer">
                          {copy ? (
                            <button className="btn btn-outline-success">
                              Copié !<i className="bi bi-check-all"></i>
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary"
                              onClick={handleCopyClick}
                            >
                              Copier
                              <i className="bx bxs-copy"></i>
                            </button>
                          )}
                          
                          {/* <button type="button" className="btn btn-primary">
                            Save changes
                          </button> */}
                        </div>
    </div>
  );
  
}
