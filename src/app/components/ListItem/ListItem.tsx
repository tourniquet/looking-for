import { Modal } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
// import { Timestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useContext, useState } from 'react'
import styled from 'styled-components'

// import { TodoContext } from '@/contexts/TodoContext'
// import { db } from '../../../../firebase-config'

const LiStyled = styled.li`
  align-items: center;
  border-block-end: 1px solid rgba(5, 5, 5, 0.06);
  display: flex;
  justify-content: space-between;
  padding-inline: 24px;
  padding: 12px 0;
`

const LabelStyled = styled.label`
  align-items: center;
  display: inline-flex;
`

const SpanStyled = styled.span`
  padding-inline-end: 8px;
  padding-inline-start: 8px;
`

const InputStyled = styled.input`
  cursor: pointer;

  &.disabled-input {
    cursor: not-allowed;
  }
`

interface TodoProps {
  id: string
  done: boolean
  todo: string
  // dueDate: Timestamp | undefined
}

function ListItem ({ item, index }: { todo: TodoProps, index: number }): JSX.Element {
  // const { items, setItems }: { items?: any, setItems?: any } = useContext(TodoContext)

  return (
    <>
      Hello, world!
    </>
  //   <LiStyled key={index}>
  //     <LabelStyled>
  //       <InputStyled
  //         type='checkbox'
  //         checked={todo.done}
  //         disabled={todo.done}
  //         onChange={() => { void doneTodo(todo.id) }}
  //         className={todo.done ? 'disabled-input' : undefined}
  //       />
  //       <SpanStyled>
  //         {todo.todo} |
  //         {(typeof todo.dueDate !== 'string' && JSON.stringify(todo.dueDate) !== '{}') && todo.dueDate?.toDate().toLocaleDateString()}
  //       </SpanStyled>
  //     </LabelStyled>

  //     {!todo.done && (<EditOutlined />)}
  //     <CloseOutlined onClick={showModal} />
  //   </LiStyled>
  )
}

export default ListItem
