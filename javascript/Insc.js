function emailDejaUtilise(email) {
    const donnees = localStorage.getItem("utilisateurs");
    if (!donnees) return false;
    const utilisateurs = JSON.parse(donnees);
    return utilisateurs.some((u) => u.email.toLowerCase() === email.toLowerCase());
  }
  
  function afficherMessage(texte, type) {
    let zoneMessage = document.getElementById("messageInscription");
  
    if (!zoneMessage) {
      zoneMessage = document.createElement("p");
      zoneMessage.id = "messageInscription";
      zoneMessage.style.marginTop = "12px";
      zoneMessage.style.padding = "10px 14px";
      zoneMessage.style.borderRadius = "6px";
      zoneMessage.style.fontWeight = "bold";
      zoneMessage.style.fontSize = "0.95rem";
      zoneMessage.style.textAlign = "center";
      zoneMessage.style.transition = "opacity 0.3s ease";
  
      const fieldset = document.querySelector("fieldset");
      fieldset.insertAdjacentElement("afterend", zoneMessage);
    }
  
    if (type === "succes") {
      zoneMessage.style.backgroundColor = "#d4edda";
      zoneMessage.style.color = "#155724";
      zoneMessage.style.border = "1px solid #c3e6cb";
    } else if (type === "erreur") {
      zoneMessage.style.backgroundColor = "#f8d7da";
      zoneMessage.style.color = "#721c24";
      zoneMessage.style.border = "1px solid #f5c6cb";
    }
  
    zoneMessage.textContent = texte;
    zoneMessage.style.opacity = "1";
  
    if (type === "succes") {
      setTimeout(() => {
        zoneMessage.style.opacity = "0";
      }, 4000);
    }
  }
  
  function validerFormulaire(nom, prenom, email, mdp1, mdp2) {
    if (!nom || nom.trim() === "") {
      afficherMessage("⚠️ Veuillez saisir votre nom.", "erreur");
      return false;
    }
  
    if (!prenom || prenom.trim() === "") {
      afficherMessage("⚠️ Veuillez saisir votre prénom.", "erreur");
      return false;
    }
  
    if (!email || email.trim() === "") {
      afficherMessage("⚠️ Veuillez saisir votre adresse email.", "erreur");
      return false;
    }
  
    if (!mdp1 || mdp1.trim() === "") {
      afficherMessage("⚠️ Veuillez saisir un mot de passe.", "erreur");
      return false;
    }
  
    if (mdp1.length < 6) {
      afficherMessage("⚠️ Le mot de passe doit contenir au moins 6 caractères.", "erreur");
      return false;
    }
  
    if (mdp1 !== mdp2) {
      afficherMessage("❌ Les mots de passe ne correspondent pas.", "erreur");
      return false;
    }
  
    if (emailDejaUtilise(email)) {
      afficherMessage("❌ Cette adresse email est déjà utilisée.", "erreur");
      return false;
    }
  
    return true;
  }
  
  function enregistrerUtilisateur(nom, prenom, email, motDePasse) {
    const donnees = localStorage.getItem("utilisateurs");
    const utilisateurs = donnees ? JSON.parse(donnees) : [];
  
    utilisateurs.push({
      nom: nom,
      prenom: prenom,
      email: email,
      motDePasse: motDePasse
    });
  
    localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
  }
  
  function gererInscription(evenement) {
    evenement.preventDefault();
  
    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const email = document.getElementById("eml").value.trim();
    const mdp1 = document.getElementById("mdp1").value;
    const mdp2 = document.getElementById("mdp2").value;
  
    if (!validerFormulaire(nom, prenom, email, mdp1, mdp2)) return;
  
    enregistrerUtilisateur(nom, prenom, email, mdp1);
  
    afficherMessage(
      `✅ Inscription réussie ! Bienvenue, ${prenom} ${nom}. Redirection vers la connexion...`,
      "succes"
    );
  
    setTimeout(() => {
      window.location.href = "cnx.html";
    }, 2000);
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const formulaire = document.querySelector("form");
    if (formulaire) {
      formulaire.addEventListener("submit", gererInscription);
    }
  });