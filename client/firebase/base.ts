'use client'
import { ProductType } from '@/types/product'
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc
} from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { db, storage } from './config'

// Create a new document
const create = async (collectionRef: any, data: object) => {
  const createdAt = new Date().toISOString()
  const newData = { ...data, createdAt }
  const docRef = await addDoc(collectionRef, newData)
  return docRef.id
}
// Read a single document
const read = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { id: docSnap.id, ...(docSnap.data() as any) }
  } else {
    return null
  }
}

// Read all documents in a collection
const readAll = async (collectionRef: any) => {
  const querySnapshot = await getDocs(collectionRef)
  const documents = []
  querySnapshot.docs.forEach((doc: any) => {
    documents.push({ id: doc.id, ...doc.data() })
  })
  return documents
}
export type Condition<T> = [string, T[keyof T] | T[keyof T][]]

const findAll = async <T>(collectionRef: any, conditions: Condition<T>[]): Promise<T[]> => {
  const querySnapshot: QuerySnapshot<T> = await getDocs(collectionRef)
  const data: T[] = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot<T>) => {
    const docData = doc.data()
    if (doc.exists() && docData) {
      // Check if snapshot exists and contains data
      const item: T = { ...docData, id: doc.id } // Include document ID as 'id' property in returned data
      if (
        conditions.every((condition) => {
          const [key, value] = condition
          return Array.isArray(value) ? value.includes(item[key]) : item[key] === value
        })
      ) {
        data.push(item)
      }
    }
  })
  return data
}
// Update a document
const update = async (collectionRef: any, id: string, data: object) => {
  await updateDoc(doc(collectionRef, id), data)
}

// Delete a document
const deleteItem = async (collectionRef: any, id: string) => {
  await deleteDoc(doc(db, collectionRef, id))
}

const addImage = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  return snapshot.metadata.fullPath
}

// Check quantity of items before adding an order
const checkQuantityBeforeAddOrder = async (items: Array<ProductType>) => {
  const invalidItems = []

  for (const item of items) {
    // Retrieve the item document from the 'items' collection
    const itemDoc = await read('products', item.id)

    if (itemDoc) {
      const itemQuantity = itemDoc.quantity

      // Check if the item's quantity is sufficient for the order
      if (itemQuantity < item.quantityOrder) {
        return `Bạn ơi! Sản phẩm ${item.name} Kho hiện tại chỉ còn ${itemQuantity} thôi ạ.`
      }
    }
  }
  return 'pass'

  return invalidItems
}

export { create, deleteItem, read, readAll, update, addImage, findAll, checkQuantityBeforeAddOrder }
