import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  query,
} from 'firebase/firestore';
import firebaseConfig from './firebase.config';

initializeApp(firebaseConfig);
export const db = getFirestore();

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => {
  signInWithPopup(auth, googleProvider);
};

export const addCollectionAndDocs = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach(async (obj) => {
    const batch = writeBatch(db);
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj);
    await batch.commit();

    console.log('Collection added to database');
  });
};

export const getCategoriesDocs = async () => {
  const collectionRef = collection(db, 'categories');
  const querySnapshot = await getDocs(query(collectionRef));

  const categorMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categorMap;
};

export const createUserDocFromAuth = async (userAuth, additionalInfos = {}) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshop = await getDoc(userDocRef);

  if (!userSnapshop.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInfos,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }

    return userDocRef;
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};