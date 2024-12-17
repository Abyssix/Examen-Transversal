import { Injectable, inject} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc} from '@angular/fire/firestore';
import { Asistencia } from 'src/app/models/asistencia.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

    auth = inject(AngularFireAuth);
    firestore = inject(AngularFirestore)


    // ============ Autentificacion ============== //

    //acceder
    ingresar(user: User){
      return signInWithEmailAndPassword(getAuth(), user.email, user.password)
    }

    //crear usuario
    registrar(user: User) {
      return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
    }

    //actualizar usuario
    actualizarusuario(displayName: string){
      return updateProfile(getAuth().currentUser, { displayName })
    }

    correoderecuperacion(email: string){
      return sendPasswordResetEmail(getAuth(), email)
    }
    //base de datos y funciones

    nuevoDocumento(path: string, data: any){
      return setDoc(doc(getFirestore(),path), data);
    }
    
    async obtenerDocumentologin(path: string){
      return (await getDoc(doc(getFirestore(), path))).data();
    }
    
    async obtenerDocumento(path: string) {
      const docRef = doc(getFirestore(), path); // Referencia al documento
      const docSnap = await getDoc(docRef); // Intentamos obtener el documento
    
      if (docSnap.exists()) {
        console.log('Documento obtenido:', docSnap.data()); // Mostrar los datos si el documento existe
        return docSnap.data(); // Si el documento existe, devuelve los datos
      } else {
        console.log('Documento no encontrado en el path:', path); // Si no existe, mostrar un mensaje
        return null; // Retorna null si no se encuentra el documento
      }
    }

    async obtenerDocumentoPorId(collection: string, docId: string) {
      const docRef = doc(getFirestore(), collection, docId); // Referencia al documento
      const docSnap = await getDoc(docRef);  // Intentamos obtener el documento
    
      if (docSnap.exists()) {
        console.log('Documento obtenido:', docSnap.data());  // Mostrar los datos si el documento existe
        return { uid: docSnap.id, ...docSnap.data() }; // Retorna el ID junto con los datos
      } else {
        console.log('Documento no encontrado en la colección:', collection, 'con ID:', docId);
        return null; // Retorna null si no se encuentra el documento
      }
    }
    

    async obtenerColeccion(path: string): Promise<Asistencia[]> {
      const snapshot = await this.firestore.collection(path).get().toPromise();
      return snapshot.docs.map(doc => doc.data() as Asistencia);
    }
    

    
    
}
