import { ItemsCollection } from '@/contexts/ItemContext'

export default function DisplayComment ({ itemObj }: { itemObj: ItemsCollection }): JSX.Element {
  return (
    <div className='comments'>
      {itemObj.comments.length > 0 && itemObj.comments.map((comment, index) => (
        <div key={index}>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  )
}
