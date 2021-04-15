// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: 'AIzaSyBhpao6Z3sg_YJVA5MgGmz3lzeBL--WDl4',
    authDomain: 'rollerclub-platzi.firebaseapp.com',
    projectId: 'rollerclub-platzi',
    storageBucket: 'rollerclub-platzi.appspot.com',
    messagingSenderId: '3855539107',
    appId: '1:3855539107:web:61ef002164a18244cfd816'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();