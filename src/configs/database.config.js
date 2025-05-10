const admin = require('firebase-admin');
const serviceAccount = require('./firebaseAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://shoes-store-c80e7.appspot.com",
});

const db = admin.firestore();
const storage = admin.storage().bucket();

module.exports = { db, storage}