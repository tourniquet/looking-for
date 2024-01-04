import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { Button, Input } from 'antd'
import { useContext } from 'react'
import styled from 'styled-components'

import { ItemContext, ItemContextType } from '@/contexts/ItemContext'
import { db } from '../../../../../firebase-config'

const NewCommentBlock = styled.div`
  display: flex;
  width: 100%;
`

const InputStyled = styled(Input)`
  border-start-start-radius: 6px !important; // TODO: Remove !important
  border-end-start-radius: 6px !important; // TODO: Remove !important
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
`

export default function NewComment ({ id }: { id: string }): JSX.Element {
  const { user, comment, setComment, getItems } = useContext(ItemContext) as ItemContextType

  async function submitNewComment (id: string, comment: string): Promise<void> {
    const uid = user.uid
    const userName = user.displayName

    const docRef = doc(db, 'items', id)
    await updateDoc(docRef, { comments: arrayUnion({ comment, uid, userName }) })

    setComment('')
    getItems()
  }

  return (
    <NewCommentBlock>
      <InputStyled
        disabled={user === null}
        value={comment}
        itemID={id}
        placeholder='Your comment here'
        onChange={el => setComment(el.target.value)}
      />
      <Button
        disabled={user === null}
        onClick={() => { void submitNewComment(id, comment) }}
        type='primary'
      >
        Submit
      </Button>
    </NewCommentBlock>
  )
}
