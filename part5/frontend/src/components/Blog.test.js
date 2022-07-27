/**Make a test which checks that the component displaying a blog renders
 *  the blog's title and author, but does not render its url or number of
 *  likes by default.
 * Add CSS-classes to the component to help the testing as necessary. */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author and not url and likes', () => {
    const blog = {
        title: 'Mars Colonies',
        author: 'Riz M.',
        url: 'www.blog.com/MarsColonies',
        likes: 1
    }

    const mockHandler = jest.fn()
    const user = {
        id: '62dbeb8d2cf8637f5e7cd836'
    }

    const { container } = render(<Blog blog={blog} loggedUserId={user.id} reloadBlogs={mockHandler} />)
    const div = container.querySelector('.shortBlog')
    expect(div).toHaveTextContent('Mars Colonies')
    expect(div).not.toHaveTextContent('www.blog.com/MarsColonies')
})
