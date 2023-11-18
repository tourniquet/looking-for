import { addDoc, serverTimestamp } from 'firebase/firestore'
import { Button, Input, Row } from 'antd'
import { useContext, useState } from 'react'

import { ItemContext, ItemContextType } from '../../../contexts/ItemContext'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

const storage = getStorage()

const { TextArea } = Input

export default function NewTodo (): JSX.Element {
  const { getItems } = useContext(ItemContext) as ItemContextType

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File>()
  const [imageURL, setImageURL] = useState('')
  const { user, itemsCollectionRef } = useContext(ItemContext) as ItemContextType

  function handleFileChange (event: React.ChangeEvent<HTMLInputElement>): void {
    if (event.target.files !== null) {
      setFile(event.target.files[0])
    }
  }

  function handleFileUpload (): void {
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg'
    }

    if (typeof file !== 'undefined') {
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, `images/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file, metadata)

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // console.log('Upload is ' + progress + '% done')
          console.log(`Upload is ${progress} % done`)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break
            case 'storage/canceled':
              // User canceled the upload
              break
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log('File available at', downloadURL)
              setImageURL(downloadURL)
            })
            .catch((err) => console.log(err))
        }
      )
    }
  }

  const createNewItem = async (): Promise<void> => {
    await addDoc(itemsCollectionRef, {
      title,
      description,
      createdAt: serverTimestamp(),
      uid: user.uid,
      found: false,
      image: imageURL,
      comments: []
    })

    setTitle('')
    setDescription('')
    getItems()
    // await getTodos(user?.uid)
    // setTitle('')
    // setDescription('')
  }

  return (
    <Row style={{ marginBottom: '50px' }}>
      <Input
        disabled={user === null}
        placeholder='Title'
        onChange={e => setTitle(e.target.value)}
        value={title}
      />

      <TextArea
        disabled={user === null}
        onChange={e => setDescription(e.target.value)}
        value={description}
        style={{
          resize: 'none',
          marginTop: '20px',
          marginBottom: '20px',
          width: '100%',
          height: '100px'
        }}
      />

      <input
        disabled={user === null}
        type='file'
        onChange={handleFileChange}
      />

      <Button type='default' onClick={handleFileUpload}>Upload</Button>

      <Button type='primary' onClick={() => { void createNewItem() }} disabled={imageURL.length === 0 && true}>
        Submit
      </Button>
    </Row>
  )
}
