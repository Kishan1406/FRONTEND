import React, { useState, useEffect } from 'react'
import './style.css'

const App = () => {

  const [input, setInput] = useState('')
  const [items, setItems] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  // Load data from localStorage
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('todoList'))
    if (savedItems) {
      setItems(savedItems)
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(items))
  }, [items])

  // Add or Update item
  const handleAdd = () => {
    if (input.trim() === '') return

    if (editIndex !== null) {
      // Update item
      const updatedItems = [...items]
      updatedItems[editIndex] = input
      setItems(updatedItems)
      setEditIndex(null)
    } else {
      // Add new item
      setItems([...items, input])
    }

    setInput('')
  }

  // Delete item
  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index)
    setItems(updatedItems)
  }

  // Edit item
  const handleEdit = (index) => {
    setInput(items[index])
    setEditIndex(index)
  }

  return (
    <div className="container">
      <h1>Todo List</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={handleAdd}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <span>{item}</span>

            <div>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App