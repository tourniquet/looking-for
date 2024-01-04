import { ItemsCollection } from '@/contexts/ItemContext'
import styled from 'styled-components'

const ULStyled = styled.ul`
  list-style-type: none;
  width: 100%;
`

const LItemStyled = styled.li`
  border-bottom: 1px solid #d9d9d9; // TODO: Temporary styles
  min-height: 30px;
  /* border-bottom: 0; */
  padding: 4px;

  &:last-child {
    border-bottom: 0;
  }
`

const UserName = styled.i`
  color: rgba(0, 0, 0, 0.5);
`

export default function DisplayComment ({ itemObj }: { itemObj: ItemsCollection }): JSX.Element {
  return (
    <ULStyled className='comments'>
      {itemObj.comments.length > 0 && itemObj.comments.map((comment, index) => (
        <LItemStyled key={index}>
          <p><UserName>@{comment.userName}:</UserName> {comment.comment}</p>
        </LItemStyled>
      ))}
    </ULStyled>
  )
}
