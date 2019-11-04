onLogin = async () => { 
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(res => {
            redirectToRoute('/');
        })
        .catch(err => {
            console.log(err);
        });
}

const btn = document.querySelector('.btn');

if(btn) {
    btn.addEventListener('click', onLogin);
}