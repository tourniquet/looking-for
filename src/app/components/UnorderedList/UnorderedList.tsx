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

import { auth } from '../../../../firebase-config'
import { ItemContext } from '@/contexts/ItemContext'

const UlStyled = styled.ul`
  border-radius: 6px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  // border: 1px solid rgb(217, 217, 217);
  border-top: 0px;
  list-style: none;
  margin-top: 0;

  .ant-collapse-item:last-child {
    border: none;
  }
`

interface ItemProps {
  uid: string
  found: boolean
  title: string
  description: string
  image: string
}

export default function UnorderedList (): JSX.Element {
  const { items, getItems }: { items?: ItemProps[], getItems?: any } = useContext(ItemContext) // TODO: find right types

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
    <UlStyled>
      <Accordion allowZeroExpanded>
        {typeof items !== 'undefined' && items.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                {item.title}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {item.description}
              <img src={item.image} />
              <Space.Compact style={{ width: '100%' }}>
                <Input placeholder='Your comment here' />
                <Button type='primary'>Submit</Button>
              </Space.Compact>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </UlStyled>
  )
}
