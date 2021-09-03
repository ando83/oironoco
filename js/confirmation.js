//Fonction de raccourci pour document.createElement
function createElement(element) {
    return document.createElement(element); 
}
//Fonction de raccourci pour la méhode appendChild
function appendChild(parent, el) {
    return parent.appendChild(el); 
}

// Récupérer et lecture des données du localStorage pour afficher sur la page confirmation

let orderData = localStorage.getItem("order");

let contacts = JSON.parse(localStorage.getItem("contact"))//lecture tableau du localStorage

let prix = localStorage.getItem("prixTotal")

//déclarer les variables
let divConfirmation, paraDetail, paraDetaildeux, paraDetailtrois;   

// récupérer l'id "panier" de la page confirmation.html 
let confirmation = document.getElementById("nom-confirmation");

//créer div conteneur à l'aide des fonctions à l'aide des fonctions createElement et appendChild
divConfirmation = createElement("div");
divConfirmation.setAttribute("class", "element-commande");
appendChild(confirmation, divConfirmation);

paraDetail = createElement("p");
paraDetail .setAttribute("class", "para-detail");
paraDetail.innerHTML = "Merci"+ " "+ "<span>"+contacts.firstName+"</span>" +", votre commande à bien été enregistrée.";
appendChild(divConfirmation, paraDetail);

paraDetaildeux = createElement("p");
paraDetaildeux .setAttribute("class", "para-detail1");
paraDetaildeux.innerHTML = "Votre numéro de commande est le :"+ " "+ "<span>"+orderData+"</span>" +" "+ "pour un montant total de " +"<span>"+prix+"Euros"+"</span>";
appendChild(divConfirmation, paraDetaildeux);

paraDetailtrois= createElement("p");
paraDetailtrois .setAttribute("class", "para-detail1");
paraDetailtrois.innerHTML = "Vous allez récevoir un email récapitulatif de votre commande à l'adresse"+ " "+ "<span>"+contacts.email+"</span>";
appendChild(divConfirmation, paraDetailtrois);