//Fonction de raccourci pour document.createElement
function createElement(element) {
    return document.createElement(element); 
}
//Fonction de raccourci pour la méhode appendChild
function appendChild(parent, el) {
    return parent.appendChild(el); 
}

//Fonction alerte
function alertProduit(){
        swal("Sélectionnez une couleur!","", "warning");
}

function alertAjouter(){
        swal("Article ajouté au panier!", "cliquez sur l'icône Panier pour voir les détails", "success"); 
} 

//l'url de l'API
let urlId = "http://localhost:3000/api/teddies/";

//Uliliser la méthode location search pour récupérer l'id de l'url + modifier la structure de la page produit

function recupererId(){
    const urlActuel = window.location.search.slice(4);// on récupére seulement l'id du produit
    return urlActuel;
}

//récupérer id "produits" de la page html produit
let produit = document.getElementById("produits");

//Déclarer les variables
let divProduit, h3Produit, imgProduit, h4Produit, paraProduit; 
  
fetch (urlId + recupererId())
.then(response => response.json())
.then(function(data) {
console.log(data) 

    //Créer div produit à l'aide des fonctions createElement et appendChild
    divProduit = createElement("div");
    divProduit.setAttribute("class", "elementproduit");
    appendChild(produit, divProduit); 

    //créer h3, le nom des oursons
    h3Produit = createElement("h3");
    h3Produit.style.fontSize = "1.8em";
    h3Produit.style.margin = "10px 0";
    h3Produit.style.color = "white";
    h3Produit.innerHTML = data.name;
    appendChild(divProduit, h3Produit); 

    //rajouter image
    imgProduit = createElement("img");
    imgProduit.src = data.imageUrl;
    appendChild(divProduit, imgProduit); 

    //créer h4, le prix des oursons
    h4Produit = createElement("h4");
    h4Produit.style.margin = "7px 0";
    h4Produit.innerHTML = data.description;
    appendChild(divProduit, h4Produit);

    //créer un paragraphe, description des oursons
    paraProduit = createElement("p");
    paraProduit.innerHTML =  "<mark>Prix = " + data.price + " €</mark>";
    appendChild(divProduit, paraProduit);
    
    //créer une liste pour le choix des couleurs + boucle
    for(let i = 0; i < data.colors.length; i++){
        let option = document.createElement("option");
        option.innerHTML=data.colors[i];
        document.getElementById("couleur_select").appendChild(option);
        }

    //sauvegarder le produit au clic du bouton pour mettre au panier
    let btn = document.getElementById("bouton_produit");
    btn.addEventListener ("click", function(event){
     event.preventDefault();  //blocage du comportement par défaut du navigateur lorsqu'un événement se produit
     
        let selection = document.getElementById("couleur_select");
        let couleurSelect = couleur_select.value;//retourne la couleur selectionnée 

        let quantite = document.getElementById("quantite").value;

        if( couleurSelect === ""){ //si null, message d'alerte
            alertProduit()
            
        }else{
            let produitTableau = JSON.parse(localStorage.getItem('panier')) || [];//Analyser et récupérer les valeurs stockées via localstorage 
            produitTableau.push({id: data._id, name: data.name, price : data.price, image:data.imageUrl, colors: couleurSelect, quantité: quantite}); //On ajoute des éléments au tableau
            localStorage.setItem('panier', JSON.stringify(produitTableau));//stocker clé et valeur pendant l'ajout dans le localStorage et conversion valeur javascript en chaîne JSON - via localstorage
            
            alertAjouter();//Message d'alerte lors de l'ajout
            
        }  
    })
})
.catch((error) => {
 console.error(error);
});



    
