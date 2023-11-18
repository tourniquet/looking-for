'use client'

import { Col, Row } from 'antd'

import { ItemProvider } from '../contexts/ItemContext'

import NavBar from './components/NavBar/NavBar'
import NewTodo from './components/NewItem/NewItem'
import UnorderedList from './components/UnorderedList/UnorderedList'

export default function Home (): JSX.Element {
  return (
    <ItemProvider>
      <NavBar />

      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <NewTodo />
        </Col>
      </Row>

      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <UnorderedList />
        </Col>
      </Row>
    </ItemProvider>
  )
}
