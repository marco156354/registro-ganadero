firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


// AUTENTICACIÓN
function login(){
auth.signInWithEmailAndPassword(email.value, password.value)
.then(()=>location.href='menu.html');
}


function register(){
auth.createUserWithEmailAndPassword(email.value, password.value)
.then(()=>alert('Usuario creado'));
}


function logout(){ auth.signOut().then(()=>location.href='index.html'); }


// BECERROS
function guardarBecerro(){
db.collection('becerros').add({
arete: arete.value,
nacimiento: nacimiento.value,
user: auth.currentUser.uid
});
alert('Becerro guardado');
}


// VACAS CARGADAS
function guardarVaca(){
db.collection('vacas').add({
arete: areteVaca.value,
ultimaMonta: ultimaMonta.value,
ultimaCarga: ultimaCarga.value,
user: auth.currentUser.uid
});
alert('Vaca cargada guardada');
}


// BUSCAR Y ELIMINAR
function buscar(){
lista.innerHTML='';
db.collection('becerros').where('arete','==',buscarArete.value)
.get().then(res=>{
res.forEach(doc=>{
lista.innerHTML+=`<li>${doc.data().arete}
<button onclick="eliminar('${doc.id}','becerros')">Eliminar</button></li>`;
});
});
}


function eliminar(id,col){ db.collection(col).doc(id).delete(); }


// EXCEL
function descargarExcel(){
let csv='Arete,Fecha\n';
db.collection('becerros').get().then(res=>{
res.forEach(d=>{ csv+=`${d.data().arete},${d.data().nacimiento}\n`; });
let blob=new Blob([csv]);
let a=document.createElement('a');
a.href=URL.createObjectURL(blob);
a.download='becerros.csv';
a.click();
});
}
