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
  let nom = useRef();
  let ton = useRef();

  let defaut = "Entrez le texte et cliquez sur le bouton REFORMULER";

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

    fetch("/api/generator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: nom.current.value,
        ton: ton.current.value,
      }),
    })
      .then(async (data) => {
        return data.json();
      })
      .then(async (responses) => {
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
      types: "Reformulation",
      genre: "CORRECTIONS",
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
      }
    }
  }
  // --------------------------------------------------Fin enregistrement----------------------------------------------------------------

  return (
    <>
      <Head>
        <title>Reformuler Page</title>
      </Head>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Reformulation</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">accueil</Link>
              </li>
              <li className="breadcrumb-item">corrections</li>
              <li className="breadcrumb-item">Reformuler</li>
            </ol>
          </nav>
        </div>
        <Link type="button" className="btn btn-secondary" href={"/corrections"}>
          Retour
        </Link>
        <br />
        <br />
        {/* End Page Title */}
        <section className="section">
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Veillez saisir votre texte</h5>

                  <form onSubmit={handleForm}>
                    <div className="row mb-3">
                      <div className="col-sm-12">
                        <textarea
                          className="form-control"
                          style={{ height: 150 }}
                          defaultValue={""}
                          rows={{ length: 100 }}
                          ref={nom}
                          required
                          minLength={10}
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
                          <option value={"Simple et direct"}>Simple et direct</option>
                          <option value={"Professionnel"}>Professionnel</option>
                          <option value={"Informel;  Avec des emojis"}>Décontracté</option>
                          <option value={"Assertif"}>Assertif</option>
                          <option value={"Amical; Avec des emojis"}>Amical</option>
                        </select>
                      </div>
                  

                    {/* ---------------------------------------------selection------------------------------------- */}

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

                    <div className="row mb-3">
                      <div className="col-sm-10"></div>
                    </div>
                  </form>
                  {/* End General Form Elements */}
                </div>
              </div>
            </div>

            {/* -------------------reponse---------------------- */}

            <div className="col-lg-6" id="corriger">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Nouvelle version</h5>

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
