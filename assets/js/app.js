// Init firebase
initFirebase();

// Global declarations
const db = firebase.firestore();

const init = () => {
    console.log('Initializing app..');
    feather.replace();
    renderGreeting();
    updateSensors();
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

const updateSensors = () => {
    const temperatureNode = document.querySelector('#temperature'); 
    const humidityNode = document.querySelector('#humidity'); 
    const sensorsRef = db.collection('sensors');

    // Set Temperature Data from Firebase Firestore
    sensorsRef.doc('temperature').get()
        .then(doc => {
            const { value, unit } = doc.data();
            temperatureNode.innerHTML = `${value}${unit}`;
        })
    
    // Set Humidity Data from Firebase Firestore
    sensorsRef.doc('humidity').get()
        .then(doc => {
            const { value, unit } = doc.data();
            humidityNode.innerHTML = `${value}${unit}`;
        })
}

const renderGreeting = () => {
    const element = document.querySelector('.greeting');
    const currentTime = getUserLocalTime();
    let greeting;

    if (currentTime < 12) {
        greeting = "Goedemorgen";
    } else if (currentTime >= 12 && currentTime <= 17) {
        greeting = "Goedemiddag";
    } else {
        greeting = "Goedenavond";
    }
    
    element.innerHTML = greeting;
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

init();
