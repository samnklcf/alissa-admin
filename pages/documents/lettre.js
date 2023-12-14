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


  let date = useRef();
  let cible = useRef();
  let message = useRef();
  let administration = useRef()
  let expediteur = useRef()
  let titreExp = useRef()
  let numberPhone = useRef()
  let email = useRef()
  let postal = useRef()
  let adminDest = useRef()
  let nameDest = useRef()
  let objet = useRef()
  let contentLetter = useRef()
  let ton = useRef();
  let ville = useRef()
  

  let defaut = "Entrez le texte et cliquez sur le bouton GENERER UN CONTENU";

  const { user_name, user_token, user_refresh_token } = useContext(DataMain); //prendre
  const [sortie, setSortie] = useState(false);
  const [MesData, setMesData] = useState(defaut)
  const [loader, setLoader] = useState(false);
  const [desactive, setDesactive] = useState(false);
  const [Saved, SetSaved] = useState(false);
  const [Done, SetDone] = useState(false);

  function handleChange(e) {
    setSortie(e.target.value);
  }

  const handleForm = (e) => {
    e.preventDefault();
    setMesData("")
    setLoader(true);
    setDesactive(true);
    setSortie("");
    SetSaved(false);
    SetDone(false); //prendre
    // setLoader(true)

    //console.log(updateData);
    fetch("/api/generator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        promptSend: `
        Rédige une lettre officielle appartenant à une administration en te servant de ces informations:
        nb: Ajoute les salutation et formule de politesse.
        1- INFORMATION SUR L'EXPEDITEUR:
        Administration expéditeur de la lettre: ${administration.current.value};
        ${expediteur.current.value && (`Nom de l'expéditeur: ${expediteur.current.value}` ) };
        titre de l'expéditeur: ${titreExp.current.value};
        Numéro de téléphone de lexpéditeur: ${numberPhone.current.value};
        E-mail: ${email.current.value},
        Adress postale de l'expéditeur: ${postal.current.value};

        2- INFORMATION DU DESTINATAIRE:
        nom de l'administration destinataire: ${adminDest.current.value};
        ${nameDest.current.value && (`Nom de l'expéditeur: ${nameDest.current.value}` ) };

        3- INFORMATION SUR LE CONTENU DE LA LETTRE:
        Objet: ${objet.current.value};
        Contenu du message: ${contentLetter.current.value};
        ton de la lettre: ${ton.current.value}
        fait à: ${ville.current.value}
        date: ${date.current.value}

        il faut suivre cette structure:

        -Lieu et date
        -coordonné de l'expediteur;
        -coordonné du destinataire;
        -objet;
        -Contenu;
        -signature;





        `,
      }),
    })
      .then(async (data) => {
        return data.json();
      })
      .then(async (responses) => {
        //console.log(responses);

        setSortie(responses);
        setMesData(responses)
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
        <title>Rédiger une lettre</title>
      </Head>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Rédiger une lettre</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">Documents</li>
              <li className="breadcrumb-item">Rédiger une lettre</li>
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
                  {/* <h5 className="card-title">
                    Veillez saisir les informations
                  </h5> */}

                  <form onSubmit={handleForm}>
                    {/* ---------information de l'exp-------------------------- */}
                    <div className="row mb-3">
                      <h6 className="card-title">1- Nos coordonnées</h6>
                      <div className="row mb-3">
                        <div className="col-sm-12">
                          <label
                            htmlFor="inputText"
                            className="col-sm-12 col-form-label"
                          >
                            Nom de l&apos;administration
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            ref={administration}
                            required
                          />
                        </div>
                        <div className="col-sm-12">
                          <label
                            htmlFor="inputText"
                            className="col-sm-12 col-form-label"
                          >
                            Identité de l&apos;expéditeur (Facultatif)
                          </label>
                          <input type="text" className="form-control" ref={expediteur} />
                        </div>
                        <div className="col-sm-12">
                          <label
                            htmlFor="inputText"
                            className="col-sm-12 col-form-label"
                          >
                            Titre de l&apos;expéditeur (Facultatif)
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-sm-12">
                          <label
                            htmlFor="inputText"
                            className="col-sm-12 col-form-label"
                            ref={titreExp}
                          >
                            Numéro de téléphone 
                          </label>
                          <input type="number" className="form-control" ref={numberPhone} />
                        </div>
                        <div className="col-sm-12">
                          <label
                            htmlFor="inputText"
                            className="col-sm-12 col-form-label"
                          >
                            Adresse e-mail 
                          </label>
                          <input type="email" className="form-control" ref={email} />
                        </div>
                        <div className="col-sm-12">
                          <label
                            htmlFor="inputText"
                            className="col-sm-12 col-form-label"
                          >
                            Adresse postale
                          </label>
                          <input type="text" className="form-control" ref={postal} />
                        </div>
                      </div>
                    </div>

                    {/* ----------info dde l'autre----------------------------- */}

                    <div className="row mb-3">
                      <h6 className="card-title">2- Cordonnées du destinataire</h6>
                      <div className="row mb-3">
                        <div className="col-sm-12">
                          <label
                            htmlFor="inputText"
                            className="col-sm-12 col-form-label"
                          >
                            Nom de l&apos;administration
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            ref={adminDest}
                          />
                        </div>
                        <div className="col-sm-12">
                          <label
                            htmlFor="inputText"
                            className="col-sm-12 col-form-label"
                          >
                            Nom et titre de l&apos;expéditeur du destinataire (Facultatif)
                          </label>
                          <input type="text" className="form-control" ref ={nameDest} />
                        </div>
                        
                        
                        
                        
                      </div>
                    </div>

                    <div className="row mb-3">
                      <h6 className="card-title">3- Contenu de la lettre</h6>
                      <div className="row mb-3">
                        <div className="col-sm-12">
                          <label
                            htmlFor="inputText"
                            className="col-sm-12 col-form-label"
                          >
                            Objet
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            ref={objet}
                          />
                        </div>
                        <div className="row mb-3">
                      <div className="col-sm-12">
                        <label
                          htmlFor="inputText"
                          className="col-sm-12 col-form-label"
                        >
                          Contenu de votre message
                        </label>
                        <textarea
                          className="form-control"
                          style={{ height: 100 }}
                          rows={{ length: 100 }}
                          placeholder=""
                          ref={contentLetter}
                          required
                        />
                      </div>
                    </div>
                        
                        
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-12">
                        <label
                          htmlFor="inputText"
                          className="col-sm-12 col-form-label"
                        >
                          Fait le: 
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          ref={date}
                          required
                        />
                      </div>

                      <div className="col-sm-12">
                        <label
                          htmlFor="inputText"
                          className="col-sm-12 col-form-label"
                        >
                          Fait à: 
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          ref={ville}
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
                          Ton:
                        </label>
                        <select
                          className="form-select"
                          ref={ton}
                          required
                          id="sel"
                        >
                          <option value={"Formel"}>
                          Formel
                          </option>
                          <option value={"Poliment assertif "}>
                          Poliment assertif 
                          </option>
                          <option value={"Informatif"}>
                          Informatif
                          </option>
                          <option value={"Conciliant"}>Conciliant</option>
                          <option value={"Urgent "}>Urgent </option>
                          <option value={"Gracieux"}>
                          Gracieux
                          </option>
                        </select>
                      </div>
                    </div>


                    {/* ---------------------------cible--------------------- */}

                    <div className="row mb-3">
                      <div className="col-sm-12">
                        {!desactive ? (
                          <button
                            type="submit"
                            className="btn btn-primary col-sm-12 "
                          >
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
                      content_style:
                        'body { font-family: "VotrePolice", sans-serif; font-size: 18px; }',
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
                          dangerouslySetInnerHTML={{ __html: MesData }}
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
