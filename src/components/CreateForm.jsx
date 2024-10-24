import { useState } from 'react'

export const CreateNote = ({ handleCreateNote }) => {
  const [title, setTitle] = useState('')
  const [autor, setAutor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    handleCreateNote({ title, autor, url })
    setTitle('')
    setAutor('')
    setUrl('')
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Create a new blog</h2>
      <label>Title:</label>
      <input
        data-testid="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <br />
      <label>Author:</label>
      <input
        data-testid="author"
        value={autor}
        onChange={e => setAutor(e.target.value)}
      />
      <br />
      <label>URL:</label>
      <input
        data-testid="url"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <br />
      <button type="submit">Create</button>
    </form>
  )
}
