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
import DisplayComment from '../Comment/DisplayComment/DisplayComment'

const AccordionStyled = styled(Accordion)`
  border: 1px solid #d9d9d9;
  border-radius: 6px;
`

const ItemDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const ItemDescription = styled.div`
  padding: 0 10px 0 10px;
`

const DescriptionBlock = styled.div`
  background: grey;
  display: flex;
  padding: 10px;
  width: 100%;
`

const ImageBlock = styled(Image)`
  border-radius: 6px;
`

const CommentsBlock = styled(Space.Compact)`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0 10px;
  width: 100%;
`

const CommentsBlockHeading = styled.p`
  margin-top: 15px;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 10px;
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
    <AccordionStyled allowZeroExpanded>
      {typeof items !== 'undefined' && items.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionItemHeading>
            <AccordionItemButton>
              {item.title}
            </AccordionItemButton>
          </AccordionItemHeading>

          <AccordionItemPanel>
            <ItemDiv>
              <DescriptionBlock>
                <ImageBlock
                  src={item.image}
                  height={200}
                  width={200}
                />

                <ItemDescription className='item-description'>
                  {item.description}
                </ItemDescription>
              </DescriptionBlock>

              <CommentsBlock>
                <CommentsBlockHeading>Comments:</CommentsBlockHeading>
                <DisplayComment itemObj={item} />
                <NewComment id={item.id} />
              </CommentsBlock>
            </ItemDiv>
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </AccordionStyled>
  )
}
