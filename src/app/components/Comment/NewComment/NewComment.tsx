import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { Button, Input } from 'antd'
import { useContext } from 'react'

import { ItemContext, ItemContextType } from '@/contexts/ItemContext'
import { db } from '../../../../../firebase-config'

export default function NewComment ({ id }: { id: string }): JSX.Element {
  const { user, comment, setComment, getItems } = useContext(ItemContext) as ItemContextType

  async function submitNewComment (id: string, comment: string): Promise<void> {
    const uid = user.uid

    const docRef = doc(db, 'items', id)
    await updateDoc(docRef, { comments: arrayUnion({ comment, uid }) })

    setComment('')
    getItems()
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Input
        value={comment}
        itemID={id}
        placeholder='Your comment here'
        onChange={el => setComment(el.target.value)}
      />
      <Button
        onClick={() => { void submitNewComment(id, comment) }}
        type='primary'
      >
        Submit
      </Button>
    </div>
  )
}
