//Fonction de raccourci pour document.createElement
function createElement(element) {
    return document.createElement(element); 
}
//Fonction de raccourci pour la méhode appendChild
 function appendChild(parent, el) {
    return parent.appendChild(el); 
}

// Requête API Fetch pour récupérer les données  + modifier structure de la page (DOM)
let url = "http://localhost:3000/api/teddies";

// récupérer id ="articles" de la page index.html     
let article = document.getElementById("articles");

//déclarer les variables
let divTitre, h3Titre, h4Titre,imgTitre,lien;

fetch(url)
    .then(response => response.json())
    .then(function(data){
    console.log(data)
    for(let i = 0; i < data.length; i++){
    
    //Créer div elements à l'aide des fonctions createElement et appendChild
    divTitre = createElement("div")
    divTitre.setAttribute("class", "elements");
    appendChild(article, divTitre)   

    //créer h3, le nom des oursons
    h3Titre = createElement("h3")
    h3Titre.style.color = "rgba(255, 255, 255)";
    h3Titre.style.fontSize = "1.8em";
    h3Titre.style.margin = "10px 0";
    h3Titre.innerHTML = data[i].name;
    appendChild(divTitre, h3Titre);

    //créer h4, le prix des oursons
    h4Titre = createElement("h4")
    h4Titre.style.fontSize = "1.3em";
    h4Titre.style.margin = "0px 0px 10px 0px";
    h4Titre.innerHTML = "<mark>Prix = " + data[i].price + " €</mark>";
    appendChild(divTitre, h4Titre);

    //rajouter image
    imgTitre = createElement("img")
    imgTitre.src = data[i].imageUrl;
    appendChild(divTitre, imgTitre);

    //créer lien du produit
    lien = createElement("a")
    lien.className ='btn';
    lien.href = "produit.html?id=" + data[i]._id;
    lien.innerHTML = "Voir le produit";
    appendChild(divTitre, lien);

       }  
   })
    
    .catch((error) => {
        console.error(error);
    });