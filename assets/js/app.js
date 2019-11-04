const init = () => {
    console.log('Initializing app..');
    initFirebase();

    console.log('Generating 8x8 grid..');
    generateGrid(8);
}

const generateGrid = (count) => {
    const grid = document.querySelector('.grid');

    for(let rows = 0; rows < count; rows++) {
        for(let columns = 0; columns < count; columns++) {
            const cell = document.createElement('div');
            cell.className = "cell";
            grid.appendChild(cell);
        }
    }
}

const onLogin = async () => { 
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(res => {
            // Set Unique User ID in LocalStorage
            setLocalStorageItem('uuid', res.user.uid);
            // Redirect to Home after succesful login
            redirectToRoute('/');
        })
        .catch(err => {
            console.log(err);
        });
}

const onLogOut = () => {
    removeLocalStorageItem('uuid');
    redirectToRoute('/login.html');
}

const loginBtn = document.querySelector('#loginBtn');
const logOutBtn = document.querySelector('#logOutBtn');

if(loginBtn) {
    loginBtn.addEventListener('click', onLogin);
}

if(logOutBtn) {
    logOutBtn.addEventListener('click', onLogOut);
}

window.addEventListener('load', init);
