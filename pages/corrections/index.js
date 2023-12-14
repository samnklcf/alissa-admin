import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import Footer from "@/components/Footer";
import Link from "next/link";
import withAuth from "@/components/hoc/withAuth";

export default withAuth(function Corrections() {
  let correction = [
      {
        titre: "Corriger les fautes",
        description: "Je m'occupe de corriger vos textes.",
        lien: "fautes",
        source: "/assets/img/correction.webp",
        id: "E3YU8fkskfblsfII9",
  
      },
      {
        titre: "Reformuler un texte",
        description: "Je peux t'aider à rédiger tes textes de manière plus pertinente.",
        lien: "reformuler",
        source: "/assets/img/reformulation.webp",
        id: "E3YUsdopzfsopk8II9",
  
      }
  ]

return (
  <>
    <Head>
      <title>Corrections Page</title>
    </Head>
    
    <main id="main" className="main">
        <div className="pagetitle">
          <h1>Correction!</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">accueil</Link>
              </li>
              <li className="breadcrumb-item">corrections</li>
              
            </ol>
          </nav>
        </div>
        <Link type="button" className="btn btn-outline-primary archive" href={"/data/corrections"}>
          Archive 
          <i className="bx bxs-file-archive m-1"></i>
        </Link>
        <br />
        <br />
        {/* End Page Title */}
        <section className="section">
          <div className="row align-items-top">
            
            
            
            {correction.map((elements)=>{
              return(
                <div className="col-lg-4" key={elements.id}>
             
              <div className="card">
                <Image
                   src={`${elements.source}`}
                   className="card-img-top"
                   alt={`${elements.source}`}
                   width={200}
                   height={200}
                   layout='responsive'
                   priority
                
                />
                <div className="card-body">
                  <h5 className="card-title">{elements.titre}</h5>
                  <p className="card-text">
                    {elements.description}
                  </p>
                  <p className="card-text">
                    
                      <Link href={`/corrections/${elements.lien}`} className="btn btn-primary">
                      Commencer <b>+</b>
                      </Link>
                      
                 
                  </p>
                </div>
              </div>
              
            </div>
              )
            })}
            
            
          </div>
        </section>
      </main>
    <Footer />
  </>
);
}) 
