import { useState, useEffect } from 'react'
import Services from  './services/services'
import services from './services/services'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  
  useEffect(() => {
    services.getAll(baseUrl)
    .then(resource => {
      setResources(resource)
    })
  },[])

  const create = async (resource) => {
    const newResource = await Services.create(resource, baseUrl)
    setResources(resources.concat(newResource))
  }

  const update = async (resource) => {
    const updatedNote = await Services.update(resource.id, resource, baseUrl)
    setResources(resources.map(resource => resource.id === updatedNote.id ? updatedNote : resource))
  }

  const service = {
    create,
    update
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value }, )
    content.onChange({ target: { value: '' } })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    name.onChange({ target: { value: '' } })
    number.onChange({ target: { value: '' } })
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App