import { onAuthStateChanged } from 'firebase/auth'
import React, { useContext, useEffect } from 'react'
import { Image, Space } from 'antd'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion'
import styled from 'styled-components'

// styles
import 'react-accessible-accordion/dist/fancy-example.css'
import './accordion.css'

import { auth } from '../../../../firebase-config'
import { ItemContext, ItemContextType } from '@/contexts/ItemContext'
import NewComment from '../Comment/NewComment/NewComment'

const ItemDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const ItemDescription = styled.div`
  padding: 0 10px 0 10px;
`

export default function UnorderedList (): JSX.Element {
  const { items, getItems } = useContext(ItemContext) as ItemContextType

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
                    </div>
                  ))}
                </div>

                <NewComment id={item.id} />
              </Space.Compact>
            </ItemDiv>
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
