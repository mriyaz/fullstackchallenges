const dummy = (blogs) => {
  return 1
}
//Define a new totalLikes function that receives a list of blog posts as a parameter.
//The function returns the total sum of likes in all of the blog posts.
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

//The function finds out which blog has most likes. If there are many top favorites,
// it is enough to return one of them.
const favoriteBlog = (blogs) => {
  let fav_blog = blogs.reduce((fblog, blog) => {
    return fblog.likes > blog.likes ? fblog : blog
  }, { likes: 0 })

  return { title: fav_blog.title, author: fav_blog.author, likes: fav_blog.likes }
}

//The function returns the author who has the largest amount of blogs
const mostBlogs = (blogs) => {
  let ablogs = {}, lauthor = '', max = 0
  blogs.map(blog => {
    if (ablogs[blog.author]) {
      ablogs[blog.author] += 1
      if (ablogs[blog.author] > max) {
        lauthor = blog.author
        max = ablogs[blog.author]
      }
    } else {
      ablogs[blog.author] = 1
    }
  })
  return { author: lauthor, blogs: ablogs[lauthor] }
}


//The function returns the author, whose blog posts have the largest amount of likes.
const mostLikes = (blogs) => {
  let ablogs = {}, lauthor = '', max = 0
  blogs.map(blog => {
    if (ablogs[blog.author]) {
      ablogs[blog.author] += Number(blog.likes)
      if (ablogs[blog.author] > max) {
        lauthor = blog.author
        max = Number(ablogs[blog.author])
      }
    } else {
      ablogs[blog.author] = Number(blog.likes)
    }
  })
  return { author: lauthor, likes: ablogs[lauthor] }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}