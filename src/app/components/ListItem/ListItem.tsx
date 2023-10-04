function ListItem (): JSX.Element {
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
