
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
/**Make a test for the new blog form. The test should check,
*that the form calls the event handler it received as props
* with the right details when a new blog is created. */

describe('<BlogForm/>', () => {

  test('New blog form submission calls the event handler', async () => {

    const handleBlogSubmit = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm handleBlogSubmit={handleBlogSubmit} />)

    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')
    const sendButton = container.querySelector('#submit')

    await user.type(title, 'Neutrino factories')
    await user.type(author, 'Robert Lea')
    await user.type(url, 'https://www.space.com/neutrino-factories-blazars-cosmic-rays')
    await user.click(sendButton)

    console.log('handleBlogSubmit.mock.calls::', handleBlogSubmit.mock.calls)
    expect(handleBlogSubmit.mock.calls).toHaveLength(1)
    //expect(handleBlogSubmit.mock.calls).toBe('Robert Lea')

  })
})



