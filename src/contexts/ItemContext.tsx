'use client'

import { collection, getDocs, query, CollectionReference, Timestamp } from 'firebase/firestore' // where, orderBy,
import React, { createContext, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { User } from 'firebase/auth'

import { auth, db } from '../../firebase-config'

export const ItemContext = createContext({})

interface Comments {
  comment: string
  uid: string
}
interface ItemsCollection {
  title: string
  description: string
  comments: Comments[]
  image: string
  uid: string
  createdAt: Timestamp | undefined
  found: boolean
}

interface ItemsProps extends ItemsCollection {
  id: string
}

export interface ItemContextType {
  items: ItemsProps[]
  setItems: React.Dispatch<React.SetStateAction<[]>>
  user: User
  getItems: Function
  itemsCollectionRef: CollectionReference<ItemsCollection>
  comment: string
  setComment: React.Dispatch<React.SetStateAction<string>>
}

export function ItemProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const [items, setItems] = useState<ItemsProps[]>([])
  const [user, loading] = useAuthState(auth)
  const [comment, setComment] = useState('')

  const itemsCollectionRef = collection(db, 'items') as CollectionReference<ItemsCollection>

  const getItems = async (uid: string): Promise<void> => {
    const q = query(
      itemsCollectionRef
      // where('uid', '==', uid),
      // orderBy('createdAt')
      // ,orderBy('done')
    )
    const data = await getDocs(q)
    setItems(data.docs.map((items) => ({ ...items.data(), id: items.id })))

    console.log(loading) // TODO: find a "better" solution for an unused error
    console.log(data)
  }

  return (
    <ItemContext.Provider value={{
      user,
      items,
      comment,
      itemsCollectionRef,
      setItems,
      setComment,
      getItems
    }}
    >
      {children}
    </ItemContext.Provider>
  )
}
