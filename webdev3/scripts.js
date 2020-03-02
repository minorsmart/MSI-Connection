// Initialize firestore
firebase.initializeApp({
    apiKey: 'AIzaSyCUk6-YcDJrcA3Vs6Z2mmGfDTNbD7xCyHE',
    authDomain: 'smartconnection-9d342.firebaseapp.com',
    projectId: 'smartconnection-9d342'
  });
  
var db = firebase.firestore();

function runFunction() {
    const n = document.getElementById("n-value").value
    const m = document.getElementById("m-value").value
    writeFunction(n,m)
}

function writeFunction(naam, bericht) {
    // Add a new document in collection "cities"
    db.collection("berichten").add({
        naam: naam,
        bericht: bericht
    })
    .then(function() {
        console.log("Bericht succesvol verstuurd!");
    })
    .catch(function(error) {
        console.error("Fout: ", error);
    });
}
