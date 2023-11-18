import { onAuthStateChanged } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Image, Input, Space } from 'antd'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion'
import styled from 'styled-components'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'

// styles
import 'react-accessible-accordion/dist/fancy-example.css'
import './accordion.css'

import { auth, db } from '../../../../firebase-config'
import { ItemContext, ItemContextType } from '@/contexts/ItemContext'

const ItemDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const ItemDescription = styled.div`
  padding: 0 10px 0 10px;
`

export default function UnorderedList (): JSX.Element {
  const { user, items, getItems } = useContext(ItemContext) as ItemContextType

  const [comment, setComment] = useState('')

  async function submitNewComment (id: string, comm: string): Promise<void> {
    const comment = comm
    const uid = user.uid

    const docRef = doc(db, 'items', id)
    await updateDoc(docRef, { comments: arrayUnion({ comment, uid }) })

    setComment('')
    getItems()
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // if (user !== null) {
      // const uid = user.uid
      // getItems(uid)
      getItems()
      // }
    })
  }, [])

  return (
    <Accordion allowZeroExpanded>
      {typeof items !== 'undefined' && items.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionItemHeading>
            <AccordionItemButton>
              {item.title}
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <ItemDiv>
              <Image
                src={item.image}
                height={200}
                width={200}
                style={{ borderRadius: '6px' }}
              />
              <ItemDescription>
                {item.description}
              </ItemDescription>
              <Space.Compact style={{ display: 'flex', flexWrap: 'wrap', width: '100%', padding: '10px 0 10px' }}>
                <div className='comments'>
                  {item.comments.length > 0 && item.comments.map((comment, index) => (
                    <div key={index}>
                      <p>{comment.comment}</p>
                      {/* <p>{item.id}</p> */}
                      {/* <p>{item.uid}</p> */}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', width: '100%' }}>
                  <Input
                    value={comment}
                    itemID={item.id}
                    placeholder='Your comment here'
                    onChange={el => setComment(el.target.value)}
                  /> {/* TODO: comment id, user id */}
                  <Button
                    onClick={() => { void submitNewComment(item.id, comment) }}
                    type='primary'
                  >
                    Submit
                  </Button>
                </div>
              </Space.Compact>
            </ItemDiv>
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
