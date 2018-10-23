import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Membres } from '../api/tous.js';

import './body.html';
import './header.html';
import './card.html';
import './footer.html';
import './corps.html';



Template.body.events({ //Le .body définie le fichier où aura lieu l'evenement.
    'click .delete'() { //Cette ligne va effacer une information dans la collection quand il y a un clic.
        Membres.remove(this._id); //Cette ligne indique la collection dans laquel enlever l'information, et que comment le faire.
    },
});



Template.body.helpers({
    liste() {//ici on retrouve bien le mot liste que j'ai choisie.
        return Membres.find({}, { sort: { createdAt: -1 } });
    },
});


Template.body.events({
    'submit .ajouter'(event) { //voici ajouter, c'est bien le nom que j'ai choisie pour la class dans le body.
        event.preventDefault();
        const target = event.target;
        const nom = target.nomInput.value;//"nomImput" est le mot utilisé dans la template card. C'est moi qui choisie le nom
        const prenom = target.prenomInput.value;
        const description = target.descriptionInput.value;
        const image = target.imageInput.value;


        Membres.insert({
            nom, //Ceci est le nom de la constante defini au dessus. C'est moi qui choisie le nom.
            prenom,
            description,
            image,

            createdAt: new Date(),

            owner: Meteor.userId(),
            username: Meteor.user().username,

        });

        target.nomInput.value = '';//Ces deux ligne signifie qu'il faille réinitialisé les champs.
        target.prenomInput.value = "";
        target.descriptionInput.value = "";
        target.imageInput.value = '';

    },
});

/*
première écriture de l'event pour le modal
Template.body.events({
   'click .btn-edit'(event) { //l'action click renvoi vers 'btn-edit' qui se situe dans mon template card.

       const target = event.target;
       const idMembre = target.getAttribute('data-id');
       

       console.log('Target = ' + event.target); //cette commande "console.log( + );" permet de voir dans l'inspecteur html des truc.
       console.log('idMembre = ' + idMembre);
       
   }

   
})*/


Template.body.events({
    'click .btn-edit'(event) { //l'action click renvoi vers 'btn-edit' qui se situe dans mon template card.

        const target = event.target;
        const idMembre = target.getAttribute('data-id'); //"idMembre" est le nom de la constante "idMembre". J'ai choisie ce nom. Dans cette ligne, "idMembre" c'est "target.getAttribute('date-id')". Se qui signifie que l'élemenet visé doit récupéré l'atribu défini. C'est a dire sont identifiant.
        const membre = Membres.findOne({ _id: idMembre });

        console.log('Target = ' + event.target); //cette commande "console.log( + );" permet de voir dans l'inspecteur html des truc.
        console.log('idMembre = ' + idMembre);
        console.log(membre);//IMPORTANT pour verifier que le code situé plus haut fonctionne bel est bien.

        const modalNom = document.querySelector('#edit-NomInput'); 
        const modalPrenom = document.querySelector('#edit-PrenomInput');
        const modalDescription = document.querySelector('#edit-DescriptionInput');
        const modalImage = document.querySelector('#edit-ImageInput');
        const hidden = document.querySelector("#edit-id");

        console.log(modalNom);
        console.log(hidden);

        modalNom.value = membre.nom; //affiche les infos recuperer
        modalPrenom.value = membre.prenom;
        modalDescription.value = membre.description;
        modalImage.value = membre.image;
        hidden.value = idMembre;
    },

    'submit .editer'(event) {
       event.preventDefault();
        const target = event.target;
        const nom = target.editNomInput.value;
        const prenom = target.editPrenomInput.value;
        const description = target.editDescriptionInput.value;
        const image = target.editImageInput.value;
        const id = target.editId.value;

        console.log();

        Membres.update(id, {
            $set: { nom: nom, prenom: prenom, description: description, image: image },
        });

        $('#exampleModal').modal('hide')

     }

})

