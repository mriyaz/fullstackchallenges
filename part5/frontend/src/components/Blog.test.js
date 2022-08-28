/**Make a test which checks that the component displaying a blog renders
 *  the blog's title and author, but does not render its url or number of
 *  likes by default.
 * Add CSS-classes to the component to help the testing as necessary. */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog/>', () => {
  let container, mockHandler2

  beforeEach(() => {
    const blog = {
      title: 'Mars Colonies',
      author: 'Riz M.',
      url: 'www.blog.com/MarsColonies',
      likes: 1
    }

    const mockHandler1 = jest.fn()
    mockHandler2 = jest.fn()
    const user = {
      id: '62dbeb8d2cf8637f5e7cd836'
    }

    container = render(<Blog blog={blog} loggedUserId={user.id} reloadBlogs={mockHandler1} handleLikeUpdate={mockHandler2} />).container

  })



  test('renders title and author and not url and likes', () => {
    const div = container.querySelector('.shortBlog')
    expect(div).toHaveTextContent('Mars Colonies')
    expect(div).not.toHaveTextContent('www.blog.com/MarsColonies')
  })


  /**Make a test which checks that the blog's url and number of likes are
         * shown when the button controlling the shown details has been clicked. */
  test('View buton click shows the blogs url and likes', async () => {

    const user1 = userEvent.setup()
    const button = screen.getByText('view')
    await user1.click(button)

    const div = container.querySelector('.longBlog')


    expect(div).toHaveTextContent('www.blog.com/MarsColonies')
    expect(div).toHaveTextContent('1')
  })



  /**Make a test which ensures that if the like button is clicked twice,
         * the event handler the component received as props is called twice. */
  test('Event handler for like button, reacts on button click ', async () => {
    const user1 = userEvent.setup()
    const button = screen.getByText('view')
    await user1.click(button)

    //const div = container.querySelector('.longBlog')
    const button1 = screen.getByText('like')
    await user1.click(button1)
    await user1.click(button1)

    expect(mockHandler2.mock.calls).toHaveLength(2)

  })

})


