const prompt = require("prompt-sync")();
let choice, result;
let toDoList = [];
do {
  console.log(
    "=== To-Do List === \n 1. Afficher les tâches \n 2. Ajouter une tâche \n 3. Rechercher une tâche \n 4. Modifier une tâche \n 5. Supprimer une tâche \n 6. Marquer une tâche comme terminée \n 7. Afficher tâches terminées / en attente \n 0. Quitter"
  );
  choice = Number(prompt("Entre : "));

  switch (choice) {
    case 1:
      afficherAll();
      break;
    case 2:
      ajouter();
      break;
    case 3:
      rechercher();
      break;
    case 4:
      modifier();
      break;
    case 5:
      supprimer();
      break;
    case 6:
      marque();
      break;
    case 7:
      afficherTaches();
      break;
  }
} while (choice !== 0);

function searchForAtache() {
  let descriptionTache = prompt("Entrez le titre de la tache: ");
  if (
    toDoList.find(({ description }) => description == descriptionTache) ==
    undefined
  ) {
    console.log("Tache introuvable");
    searchForAtache();
  } else {
    result = toDoList.find(
      ({ description }) => description == descriptionTache
    );
  }
}

function afficherAll() {
  if (toDoList.length == 0) {
    console.log("aucune tache trouvée");
  } else {
    for (let i in toDoList) {
      let status = "Tache terminee";
      if (toDoList[i].isDone == false) {
        status = "En attent";
      }
      console.log("=".repeat(30));
      console.log(
        toDoList[i].id + ". " + toDoList[i].description + " - Status: " + status
      );
    }
    console.log("=".repeat(30));
  }
}

function ajouter() {
  let tache;
  tache = prompt("Entrez la description de la tâche : ");
  toDoList.push({
    id: toDoList.length + 1,
    description: tache,
    isDone: false,
  });
  console.log("Tâche ajoutée avec succès !");
  console.log("=".repeat(30));
}
function rechercher() {
  searchForAtache();
  let status = "Tache terminee";
  if (result.isDone == false) {
    status = "En attent";
  }
  console.log("-".repeat(30));
  console.log(result.id + ". " + result.description + " - Status: " + status);
  console.log("-".repeat(30));
}

function modifier() {
  searchForAtache();
  console.log(result.id + ". " + result.description);
  let newDescription = prompt("Entrez la modification: ");
  toDoList.find(({ id }) => id == result.id).description = newDescription;
  console.log("Tâche modifiée avec succès !");
  console.log("-".repeat(30));
}

function supprimer() {
  searchForAtache();
  console.log(result.id + ". " + result.description);
  let verify = Number(
    prompt("Êtes-vous sûr de vouloir supprimer ? (oui/1 ; non/2)")
  );
  if (verify == 1) {
    toDoList.splice(result.id - 1, 1);
    console.log("Supprimé avec succès");
  }
}
function marque() {
  searchForAtache();
  console.log(result.id + " " + result.description);
  if (result.isDone) {
    console.log("Tâche terminée");
    console.log("Entrez 1 pour mettre en attente et 0 pour quitter");
    let num = Number(prompt(": "));
    if (num == 1) {
      toDoList.find(({ id }) => id == result.id).isDone = false;
      console.log("Tâche en attente");
    }
  } else {
    console.log("Tâche en attente");
    console.log("Entrez 1 pour marquer comme terminé et 0 pour quitter");
    let num = Number(prompt(": "));
    if (num == 1) {
      toDoList.find(({ id }) => id == result.id).isDone = true;
      console.log("Tâche terminée");
    }
  }
}

function afficherTaches() {
  let cond = Number(
    prompt("1 Pour les taches terminées et 2 pour les taches en attention: ")
  );
  if (cond == 1) {
    for (let i = 0; i < toDoList.length; i++) {
      if (toDoList[i].isDone == true) {
        console.log("-".repeat(30));
        console.log(toDoList[i].id + ". " + toDoList[i].description);
      }
    }
    console.log("-".repeat(30));
  } else {
    for (let i in toDoList) {
      if (toDoList[i].isDone == false) {
        console.log("-".repeat(30));
        console.log(toDoList[i].id + ". " + toDoList[i].description);
      }
    }
    console.log("-".repeat(30));
  }
}
