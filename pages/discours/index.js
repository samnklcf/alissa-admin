import Head from "next/head";
import Footer from "@/components/Footer";
import Link from "next/link";

import { useState, useRef, useEffect, useContext } from "react"; //prendre
import withAuth from "@/components/hoc/withAuth";
import Cookies from "js-cookie";
import { DataMain } from "@/components/DataMain"; //prendre
import { Editor } from "@tinymce/tinymce-react";


export default withAuth(function Fautes() {

  let [copy, SetCopy] = useState(false);

  


  let contexte = useRef();
  let date = useRef();
  let importance = useRef();
  let personalite = useRef();
  let cible = useRef();
  let ton = useRef();
  let message = useRef();

  let defaut = "Entrez le texte et cliquez sur le bouton GENERER UN CONTENU";

  const { user_name, user_token, user_refresh_token } = useContext(DataMain); //prendre
  const [sortie, setSortie] = useState(false);
  const [loader, setLoader] = useState(false);
  const [desactive, setDesactive] = useState(false);
  const [Saved, SetSaved] = useState(false);
  const [Done, SetDone] = useState(false);

  function handleChange (e) {
    setSortie(e.target.value)
  }

  const handleForm = (e) => {
    e.preventDefault();

    setLoader(true);
    setDesactive(true);
    setSortie("");
    SetSaved(false);
    SetDone(false); //prendre
    // setLoader(true)

    //console.log(updateData);
    fetch("/api/generator", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        promptSend: `
        Comporte toi un très bon rédacteur et rédige moi un discours de 10 minutes avec ses informations:
        Salutation formelle et formulles de politesse aux personnalités présentes: ${personalite.current.value},
        contexte de l'évenement: ${contexte.current.value}
        date: ${date.current.value},
        importance de l'évènement: ${importance.current.value},
     
        Messages clés: ${message.current.value},
        cible: ${cible.current.value}
        utilise un ton ${ton.current.value}

        `
      }),
    })
      .then(async (data) => {
        return data.json();
      })
      .then(async (responses) => {
        //console.log(responses);

        setSortie(responses);
        setLoader(false);
        setDesactive(false);
        SetSaved(true);
        SetDone(false);
        //   setLoader(false)
      })
      .catch((err) => {
        setSortie(`<b style="color: red;">Il y a un problème de connexion😣 📶<i>veuillez réessayer</i></b> .\nVeuillez noter que c'est la première version du programme et qu'il peut y avoir des erreurs mineures. Veuillez appuyer sur le bouton de génération
        
        `);
        setLoader(false);
        setDesactive(false);
        SetSaved(false);
        SetDone(false);
      });
  };

  async function saved() {
    const updateData = {
      contenu: sortie,
      titre: contexte.current.value,
      types: "Idées",
      genre: "BUSINESS",
    };

    if (user_token) {
      let response = await fetch(
        `https://alissadata.pythonanywhere.com/creer/2f416677-858f-796a-a221-690e5e4ae75a2f416677-858f-796a-a221-690e5e4ae75a`,
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user_token,
          },
          body: JSON.stringify(updateData),
        }
      );

      let donne = await response.json();
      if (response.ok) {
        SetSaved(donne);
        //console.log(donne);
        SetDone(true);
      } else {
        Cookies.remove("2f416677-858f-796a-a221-690e5e4ae75a-token", {
          path: "/",
        });
        Cookies.remove("2f416677-858f-796a-a221-690e5e4ae75a-Cooktoken", {
          path: "/",
        });
        window.location.reload();
        Router.push("/login");
        //console.log(response);
      }
    }
  
}




const handleCopyClick = () => {
    navigator.clipboard.writeText(content);
    SetCopy(true);
    setTimeout(() => {
      SetCopy(false);
    }, 2000);
  };
 
  
 
  


  return (
    <>
      <Head>
        <title>Générer un discours</title>
      </Head>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Générer un discours</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">Discours</li>
              <li className="breadcrumb-item">Générer un discours</li>
            </ol>
          </nav>
        </div>
        <Link type="button" className="btn btn-secondary" href={"/"}>
          Retour
        </Link>
        
        <br />
        <br />

        <section className="section">
          <div className="row">
            <div className="col-lg-5">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Veillez saisir les informations
                  </h5>

                  <form onSubmit={handleForm}>
                    <div className="row mb-3">
                      <div className="row mb-3">
                        <div className="col-sm-12">
                          <label
                            htmlFor="inputText"
                            className="col-sm-12 col-form-label"
                          >
                            Contexte de l&apos;évènement
                          </label>
                          <textarea
                          className="form-control"
                          style={{ height: 100 }}
                          rows={{ length: 100 }}
                          placeholder=""
                          ref={contexte}
                          required
                        />
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-12">
                        <label
                          htmlFor="inputText"
                          className="col-sm-12 col-form-label"
                        >
                          Date de l évènemenent
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          ref={date}
                          required
                        />
                      </div>
                     
                     
                    </div>
                    
                      {/* <span className="col-sm-12 bi-usb-micro btn btn-outline-danger mb-5" onClick={startRecognition}>&nbsp; Enregistrer</span> */}


                      <div className="row mb-3">
                      <div className="col-sm-12">
                        <label
                          htmlFor="inputText"
                          className="col-sm-12 col-form-label"
                        >
                          Importance de l évènement
                        </label>
                        <textarea
                          className="form-control"
                          style={{ height: 100 }}
                          rows={{ length: 100 }}
                          placeholder=""
                          ref={importance}
                          required
                        />
                      </div>
                     
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-12">
                        <label
                          htmlFor="inputText"
                          className="col-sm-12 col-form-label"
                        >
                           Invités d&apos;honneurs / Les Personnalisés
                        </label>
                        <textarea
                          className="form-control"
                          style={{ height: 100 }}
                          rows={{ length: 100 }}
                          placeholder=""
                          ref={personalite}
                          required
                        />
                      </div>
                     
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-12">
                        <label
                          htmlFor="inputText"
                          className="col-sm-12 col-form-label"
                        >
                           Cible: 
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          ref={cible}
                          required
                        />
                      </div>
                     
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-12">
                        <label
                          htmlFor="inputText"
                          className="col-sm-12 col-form-label"
                        >
                           Ton:
                        </label>
                        <select
                          className="form-select"
                          ref={ton}
                          required
                          id="sel"
                        >
                          <option value={"Discous de Reconnaissance"}>Reconnaissance</option>
                          <option value={"Discours d'avenir"}>Discours d avenir</option>
                          <option value={"Discours de clôture"}>Discours de clôture</option>
                          <option value={"Félicitations"}>Félicitations</option>
                          <option value={"Inspirant"}>Inspirant</option>
                          <option value={"Discours d'Ouverture"}>Discours d Ouverture</option>
                        </select>
                      </div>
                     
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-12">
                        <label
                          htmlFor="inputText"
                          className="col-sm-12 col-form-label"
                        >
                           Messages clés
                        </label>
                        <textarea
                          className="form-control"
                          style={{ height: 100 }}
                          rows={{ length: 100 }}
                          placeholder=""
                          ref={message}
                          required
                        />
                        
                      </div>
                     
                    </div>

                    {/* ---------------------------cible--------------------- */}

                    <div className="row mb-3">
                      <div className="col-sm-12">
                        {!desactive ? (
                          <button type="submit" className="btn btn-primary col-sm-12 ">
                            Générer
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary col-sm-12 "
                            type="button"
                            disabled
                          >
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Chargement
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                  {/* End General Form Elements */}
                </div>
                
              </div>
            </div>

            <div className="col-lg-7">
              <div className="card">
                <div className="card-body">
                  <br />
                  <Editor
                    apiKey="stw5j8z3vozadrpp73kimi33qwr8h30kgdvz03pldeszzv3c"
                    value={sortie}
                    onChange={handleChange}
                    init={{
                      language: "fr_FR",
                      content_style: 'body { font-family: "VotrePolice", sans-serif; font-size: 18px; }',
                    }}
                  />
                  
                </div>
              </div>
            </div>
            <div className="col-lg-12" id="corriger">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Idées générées</h5>

                  <>
                    <div className="row mb-3">
                      <div className="col-sm-12">
                        {loader ? (
                          <div className="sam">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Chargement...
                              </span>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        <pre
                          id="samnk"
                          dangerouslySetInnerHTML={{ __html: sortie }}
                        ></pre>
                        <>
                          {Saved &&
                            (Done ? (
                              <span className="m-1" disabled>
                                Enregistré✅
                              </span>
                            ) : (
                              <span
                                className="btn btn-success m-1"
                                onClick={saved}
                              >
                                Enregistrer
                                <i className="ri-save-line m-1"></i>
                              </span>
                            ))}
                        </>
                      </div>
                    </div>
                  </>
                  {/* End General Form Elements */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
});
