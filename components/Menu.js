import React from "react";
import Link from "next/link";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import SpeechToText from "@/components/SpeechToText";




function Menu() {

 
  

  const [content, setContent] = useState(localStorage.getItem("755848fzuefyedhsdj123dzreu__fezufuirg")  ? JSON.parse(localStorage.getItem("755848fzuefyedhsdj123dzreu__fezufuirg")) : '<p><strong>Ajouter du texte</strong></p>');

  const handleEditorChange = (content, editor) => {
    setContent(content);
    localStorage.setItem("755848fzuefyedhsdj123dzreu__fezufuirg", JSON.stringify(content))

  };



  return (
    <div>
      
      {/* End F.A.Q Page Nav */}
      

      <li className="nav-item">
        <Link className="nav-link collapsed" href="/">
          <i className="bi bi-envelope bleuSombre" />
          <span>Documents</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link collapsed" href="/corrections">
          <i className="bi bi-dash-circle rouge" />
          <span>Corrections</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link collapsed" href="https://alissa-ia.netlify.app">
          <i className="bi bi-question vert" />
          <span>Tutoriel</span>
        </Link>
      </li>

      <br />

      <>
        <button
          type="button"
          className="btn btn-outline-danger"
          data-bs-toggle="modal"
          data-bs-target="#disablebackdrop"
        >
          <i className="bx bxs-edit" />
          <span>Enregistrement vocale</span>
        </button>
        <div
          className="modal fade"
          id="disablebackdrop"
          tabIndex={-1}
          data-bs-backdrop="false"
        >
          <br />
          <br />
         
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
              
                <h5 className="modal-title">Appuyer sur enregistrer pour démarrer <br /><b><i className="text-success petit">Enregistrement vocal</i></b></h5>
                
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              
              <div className="modal-body">
                <br />
                a
              <SpeechToText />
              </div>

              <div className="modal-footer">
              
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fermer
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Menu;
