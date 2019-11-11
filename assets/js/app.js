// Init firebase
initFirebase();

// Global declarations
const db = firebase.firestore();
const deviceRef = db.collection('devices');
const sensorsRef = db.collection('sensors');
const devices = ['lights', 'outlets', 'front-door', 'back-door'];
const sensors = ['temperature', 'humidity'];

const init = () => {
    console.log('Initializing app..');
    feather.replace();
    renderGreeting();
    initDevices();
    initSensors();
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

const initSensors = () => {
    // Iterate through sensor array and update values
    sensors.forEach(sensor => {
        updateSensor(sensor);
    })
}

const updateSensor = (sensor) => {
    const sensorNode = document.querySelector(`#${sensor}`); 
    
    // Retrieve and set sensor data from Firestore
    sensorsRef.doc(sensor).get()
        .then(doc => {
            const { value, unit } = doc.data();
            sensorNode.innerHTML = `${value}${unit}`;
        })
}

const initDevices = () => {
    devices.forEach(device => {
        const elementNode = document.querySelector(`#${device}Toggle`);
        
        elementNode.addEventListener('click', (e) => {
            updateDevice(device);
        })
    })
}

const pushDeviceState = (device, isActive) => {
    const elementNode = document.querySelector(`#${device}Toggle`);

    deviceRef.doc(device).update({
        isActive: !isActive
    })
}

const updateDevice = (device) => {
    deviceRef.doc(device).get()
        .then(doc => {
            const { isActive } = doc.data();
            updateDeviceClass(device, isActive);
            updateDeviceLabel(device, isActive);
        });
}

const updateDeviceLabel = (device, isActive) => {
    const labelNode = document.querySelector(`#${device}Toggle .device-card__status`);
    let status;  

    isActive ? status = 'ON' : status = 'OFF';
    labelNode.innerHTML = status;
}

const updateDeviceClass = (device, isActive) => {
    const elementNode = document.querySelector(`#${device}Toggle`);

    if(isActive) {
        elementNode.classList.add('active');
    } else {
        elementNode.classList.remove('active');
    }
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


/*
 Auth
*/
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
