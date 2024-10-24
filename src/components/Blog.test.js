import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import Blog from './Blog'

test('renders blog title and author', () => {
  const blog = { title: 'Simple Test Blog', author: 'Simple Author' }

  render(<Blog blog={blog} />)

  const titleElement = screen.getByTestId('blog-title')
  const authorElement = screen.getByTestId('blog-author')

  expect(titleElement).toHaveTextContent('Simple Test Blog')
  expect(authorElement).toHaveTextContent('Author: Simple Author')
})
