import { initializeApp } from "firebase/app"
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from "firebase/auth"

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyDTqxhaknrnuluTRrEveinVFpwWYSa7sGQ",
	authDomain: "e-commerce-db-c3a1e.firebaseapp.com",
	projectId: "e-commerce-db-c3a1e",
	storageBucket: "e-commerce-db-c3a1e.appspot.com",
	messagingSenderId: "880467430415",
	appId: "1:880467430415:web:3c8c301d044839a440a77a",
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
	prompt: "select_account",
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return

	const userDocRef = doc(db, "users", userAuth.uid)

	const userSnapshot = await getDoc(userDocRef)

	//IF USER DATA DOES NOT EXIST ---------->>>>>>>------------
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			})
		} catch (error) {
			console.log("Error creating the user", error.message)
		}
	}

	//IF USER DATA EXISTS ----------->>>>>>>>>>>>>>>------------
	return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return

	return await createUserWithEmailAndPassword(auth, email, password)
}

export const signAuthInWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return

	return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)