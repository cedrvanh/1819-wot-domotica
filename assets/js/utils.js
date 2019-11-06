const initFirebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyDJ6pVkRjHFLrTtiMf7YA3TBHS1hJhcvPw",
        authDomain: "pi-domotica-7f748.firebaseapp.com",
        databaseURL: "https://pi-domotica-7f748.firebaseio.com",
        projectId: "pi-domotica-7f748",
        storageBucket: "pi-domotica-7f748.appspot.com",
        messagingSenderId: "699733223146",
        appId: "1:699733223146:web:26a36a5453e6dad8129993",
        measurementId: "G-7N9P734VGJ"
    };
    
    firebase.initializeApp(firebaseConfig);
}

const redirectToRoute = (route) => {
    window.location.href = route;
}

const setLocalStorageItem = (key, data) => {
    window.localStorage.setItem(key, data);
} 

const getLocalStorageItem = (key) => {
    return window.localStorage.getItem(key);
}

const removeLocalStorageItem = (key) => {
    window.localStorage.removeItem(key);
}

const getUserLocalTime = () => {
    const now = new Date();
    const time = now.getHours();

    return time;
}