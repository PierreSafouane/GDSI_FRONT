import { useState } from "react";

import "../styles/App.css";
import { Modal } from "@material-ui/core";
import { Button } from "@material-ui/core";

function AgendaModal({ product, addToCart, chartCount }) {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(1);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btnFicheProduit" onClick={handleShow}>
        Fiche produit
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className="imgProduits" src={product.photoUrl} alt=" product" />
          <h4 className="nomProduitList card">{product.name}</h4>
          <h4 className="typeProduitList card">{product.type}</h4>
          <p className="prixProduitList card">Prix : {product.price}</p>
          <div className="col-sm-6 "></div>
          <article>
            Le Lorem Ipsum est simplement du faux texte employé dans la
            composition et la mise en page avant impression. Le Lorem Ipsum est
            le faux texte standard de l'imprimerie depuis les années 1500, quand
            un imprimeur anonyme assembla ensemble des morceaux de texte pour
            réaliser un livre spécimen de polices de texte. Il n'a pas fait que
            survivre cinq siècles, mais s'est aussi adapté à la bureautique
            informatique, sans que son contenu n'en soit modifié. Il a été
            popularisé dans les années 1960 grâce à la vente de feuilles
            Letraset contenant des passages du Lorem Ipsum, et, plus récemment,
            par son inclusion dans des applications de mise en page de texte,
            comme Aldus PageMaker.
          </article>
          <br />
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              onClick={() => setCount(count > 1 ? count - 1 : 1)}
              type="button"
              className="btn btn-secondary"
            >
              -
            </button>
            <span className="btn btn-light qty">Quantité : {count}</span>
            <button
              onClick={() => setCount(count + 1)}
              type="button"
              className="btn btn-secondary"
            >
              +
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={() => addToCart(chartCount + 1)}>
            Ajouter au panier
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AgendaModal;
