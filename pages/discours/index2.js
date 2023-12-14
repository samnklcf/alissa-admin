import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect, useContext } from "react"; //prendre
import withAuth from "@/components/hoc/withAuth";
import Cookies from "js-cookie";
import { DataMain } from "@/components/DataMain"; //prendre

export default withAuth(function Fautes() {
  let contexte = useRef();
  let date = useRef();
  let importance = useRef();
  let personalite = useRef();
  let cible = useRef();
  let ton = useRef();
  let message = useRef();

  


  let defaut = "Entrez le texte et cliquez sur le bouton GENERER UNE PLAINTE";

  const { user_name, user_token, user_refresh_token } = useContext(DataMain); //prendre
  const [sortie, setSortie] = useState(defaut);
  const [loader, setLoader] = useState(false);
  const [desactive, setDesactive] = useState(false);
  const [Saved, SetSaved] = useState(false);
  const [Done, SetDone] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();

    setLoader(true);
    setDesactive(true);
    setSortie("");
    SetSaved(false);
    SetDone(false);
    // setLoader(true)

    //console.log(updateData);
    fetch("/api/generator", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        promptSend: `
        Comporte toi un très bon rédacteur et rédige moi un discours avec ses informations:
        contexte de l'évenement: ${contexte.current.value}
        date: ${date.current.value},
        importance de l'évènement: ${importance.current.value},
        personnalités présentes: ${personalite.current.value},
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

  // ________________________________enregistrer les données ----------------------------------------------------

  async function saved() {
    const updateData = {
      contenu: sortie,
      titre: nom.current.value,
      types: "Plainte contre " + accused.current.value,
      genre: "DOCUMENTS",
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

  const [result, setResult] = useState("")
  const [Stop, setStop] = useState(false)



  let recognition = null;
  
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
  

  // --------------------------------------------------Fin enregistrement----------------------------------------------------------------

  return (
    <>
      <Head>
        <title>Rédiger un discours</title>
      </Head>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Générer une plainte</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">accueil</Link>
              </li>
              <li className="breadcrumb-item">Documents</li>
              <li className="breadcrumb-item">Discours</li>
            </ol>
          </nav>
        </div>
        <Link type="button" className="btn btn-secondary" href={"/documents"}>
          Retour
        </Link>
        <br />
        <br />

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Veillez saisir les informations
                  </h5>

                  <form onSubmit={handleForm}>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-2 col-form-label"
                      >
                        Contexte de l évènement
                      </label>
                      <div className="col-sm-10">
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

                    <div className="row mb-3">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Date de l évènemenent
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="date"
                          className="form-control"
                          ref={date}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-2 col-form-label"
                      >
                        Importance de l évènement
                      </label>
                      <div className="col-sm-10">
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
                      <label
                        htmlFor="inputText"
                        className="col-sm-2 col-form-label"
                      >
                       
                      </label>
                      <div className="col-sm-10">
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
                      <label htmlFor="" className="col-sm-2 col-form-label">
                       Cible: 
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          ref={cible}
                          required
                        />
                      </div>
                    </div>

                    

                    


                   

                    <div className="col-sm-6 col-form-label">
                        <label
                          htmlFor="inputText"
                          className="col-sm-6 col-form-label"
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

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-2 col-form-label"
                      >
                        Messages clés
                      </label>

                      <div className="col-sm-10">
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

                    

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label"></label>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                          {!desactive ? (
                            <button type="submit" className="btn btn-primary">
                              Générer 
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary"
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
                    </div>
                  </form>
                  {/* End General Form Elements */}
                </div>
              </div>
            </div>
            <div className="col-lg-12" id="corriger">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Générer</h5>

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
