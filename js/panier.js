//Fonction de raccourci pour document.createElement
function createElement(element) {
   return document.createElement(element); 
}
//Fonction de raccourci pour la méhode appendChild
function appendChild(parent, el) {
   return parent.appendChild(el); 
}

//Fonction alerte
function maFonction() {
   swal("Les champs sont vides ","", "warning");
}

//Intialiser pour accéder au localStorage
let produitTableau = JSON.parse(localStorage.getItem('panier')); //tableau de liste produits

//Initialisé un tableau pour récup prix pour chaque produit dans le localStorage
let montantProduit = [];  

 //Montant initialisé à 0 
let totalPrix = 0;

// récupérer l'id "panier" de la page panier.html 
let listePanier = document.getElementById("panier");

//création variable pour récupérer la valeur saisie à envoyer au serveur (partie formulaire)
let nom = document.getElementById('nom');
let prénom =document.getElementById('prénom');
let email = document.getElementById('email');
let adresse = document.getElementById('adresse');
let code = document.getElementById('code');
let ville = document.getElementById('ville');

//créer div pour mettre les articles sélectionnées
let divPanier = createElement ("div");
divPanier.setAttribute("class", "elementpanier");
appendChild(listePanier, divPanier); 

//afficher , si pas de produits dans le panier
if ( produitTableau === null || produitTableau === undefined ){

   let h3Panier = createElement ("h3");
   h3Panier.setAttribute("class", "element_panierh3");
   h3Panier.innerHTML = " Pas d'articles dans votre Panier!!";
   h3Panier.style.fontSize = "1.5em";
   h3Panier.style.color = "red";
   appendChild(divPanier, h3Panier); 
 
}else{
   //Boucle pour récupérer chaque produit dans le panier
   produitTableau.forEach(function(data){
     
   //créer div pour mettre les articles sélectionnées à l'aide des fonctions createElement et appendChild
   let divPanier1 = createElement ("div");
   divPanier1.setAttribute("class", "elementpanier1");
   appendChild(listePanier, divPanier1);

   //Nom du produit sélectionné
   let h3Panier1 = createElement ("h3");
   h3Panier1.innerHTML = data.name;
   h3Panier1.style.fontSize = "1.3em";
   h3Panier1.style.color = "white";
   appendChild(divPanier1, h3Panier1);

   //Option du produit
   let optionPanier= createElement ("p");
   optionPanier.innerHTML = data.colors;
   appendChild(divPanier1, optionPanier);

   //Prix du produit sélectionné
   let paraPanier= createElement ("p");
   paraPanier.innerHTML = "<mark> " + data.price*data.quantité+ " €</mark>";
   appendChild(divPanier1, paraPanier);
   
   let quantitéPanier= createElement ("p");
   quantitéPanier.innerHTML = "Quantité :" + " " + data.quantité;
   appendChild(divPanier1, quantitéPanier);
   
   //variable pour le total
   let dataTotal = data.price * data.quantité

   //faire un push  dans le tableau via localstorage
   montantProduit.push(dataTotal); 

   });
   
   //MONTANT TOTAL DES PRODUITS - UTILISATION DE LA MÉTHODE RÉDUCE "ACCUMULATEUR"

   totalPrix = montantProduit.reduce(function (accumulator, currentValue){
      return accumulator +  currentValue
   }) 
   
   //Montant total envoyer au localStorage
   localStorage.setItem('prixTotal', totalPrix);
   localStorage.getItem('prixTotal');
   
   // Affichage du prix total
   let paraPrix = createElement("p");
   paraPrix.setAttribute("class", "prixtotal");
   paraPrix.innerHTML = "Total à régler :" + " " + "<mark>"+totalPrix+"<mark>"+ "€";
   appendChild(listePanier, paraPrix);

   // DIV conteneur bouton pour vider le panier
   let boutonConteneur = createElement("div");
   boutonConteneur.setAttribute("class", "conteneur_btn");
   appendChild(listePanier, boutonConteneur);

   //BOUTON POUR VIDER LE PANIER
   let btnSupprime = createElement("button");
   btnSupprime.setAttribute("class", "bouton_supprime")
   btnSupprime.innerHTML = "Vider le panier";
   appendChild(boutonConteneur, btnSupprime);
   
   btnSupprime.addEventListener('click', function () {
   swal("Votre panier est vide!", "","warning").then( () => {
      location.href = 'panier.html'
  })
   window.localStorage.clear();//vide toutes les clés stockées
   
  })
}

//Lien pour revenir à la page d'accueil
let conteneurLienProduit = createElement("div");
conteneurLienProduit .setAttribute("class", "conteneurLien");
appendChild(listePanier,conteneurLienProduit );

let lienProduit = createElement("a");
lienProduit.className ='btn_produit';
lienProduit.href = "index.html";
lienProduit.innerHTML = "Poursuivre vos achats?";
appendChild(conteneurLienProduit, lienProduit);
   
//-----PARTIE FORMULAIRE-----//

//mise en place d'une fonction pour alerter si les champs ne sont pas complétés
document.querySelector("input").oninvalid = function() {maFonction()};
 
let form = document.getElementById("formulaire")
form.addEventListener("submit", function(event){
   event.preventDefault();
   
   //Alert si le panier est vide
   if(produitTableau == null){
      swal("Votre panier est vide ","", "warning");
      return false;
   }

   //Initialiser un tableau et récupérer les id des produits dans le localStorage
   let products = []; 
   let panierS = JSON.parse(localStorage.getItem('panier'));
   //console.log(panierS);
   for(let i=0; i<panierS.length; i++){
      products.push(panierS[i].id)
   }
   
   //Objet et valeur saisie à envoyer au serveur

   let contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      address: address.value,
      city: city.value,
   }
    
   //L'ensemble des objets contact et products à envoyer au serveur
   let order = {
     contact : contact,
     products : products,
   };

  //Requete post avec méthode fetch
  fetch("http://localhost:3000/api/teddies/order", {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json',
     },
     body: JSON.stringify(order),
   })
   .then((response) => response.json())
   
   .then((order) => {
      localStorage.clear();
      localStorage.setItem("order", order.orderId);
      localStorage.setItem("contact",  JSON.stringify(contact));
      localStorage.setItem("prixTotal", JSON.stringify(totalPrix))
      
      window.location.href = "confirmation.html";
      console.log('Success:', order);
   })
   
   .catch((error) => {
   console.error(error);
 });

}); 

