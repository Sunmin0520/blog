import React, { useMemo } from 'react'

import { ThumbnailContainer } from '../thumbnail-container'
import { ThumbnailItem } from '../thumbnail-item'
import { CATEGORY_TYPE } from '../../constants'

export const Contents = ({ posts, countOfInitialPost, count, category }) => {
  const refinedPosts = useMemo(() => {
    let filteredPosts = posts.filter(
      ({ node }) =>
        category === CATEGORY_TYPE.ALL || node.frontmatter.category === category
    )

    if (category === CATEGORY_TYPE.RANDOM) {
      const nodejsPosts = posts.filter(
        ({ node }) => node.frontmatter.category === 'nodejs'
      )

      const retrospectivePosts = posts.filter(
        ({ node }) => node.frontmatter.category === 'retrospective'
      )

      const javascriptPosts = posts.filter(
        ({ node }) => node.frontmatter.category === 'javascript'
      )

      const webPosts = posts.filter(
        ({ node }) => node.frontmatter.category === 'web'
      )

      const gitPosts = posts.filter(
        ({ node }) => node.frontmatter.category === 'git'
      )

      const csPosts = posts.filter(
        ({ node }) => node.frontmatter.category === 'cs'
      )

      const dockerPosts = posts.filter(
        ({ node }) => node.frontmatter.category === 'docker'
      )

      const booksPosts = posts.filter(
        ({ node }) => node.frontmatter.category === 'books'
      )

      const securityPosts = posts.filter(
        ({ node }) => node.frontmatter.category === 'security'
      )

      const etcPosts = posts.filter(
        ({ node }) => node.frontmatter.category === 'etc.'
      )

      const databasePosts = posts.filter(
        ({ node }) => node.frontmatter.category === 'database'
      )

      const oopPosts = posts.filter(
        ({ node }) => node.frontmatter.category === 'oop'
      )

      const referencePosts = posts.filter(
        ({ node }) => node.frontmatter.category === 'reference'
      )

      const allCategoryPosts = nodejsPosts
        .concat(
          retrospectivePosts,
          javascriptPosts,
          webPosts,
          gitPosts,
          csPosts,
          dockerPosts,
          booksPosts,
          securityPosts,
          etcPosts,
          databasePosts,
          oopPosts,
          referencePosts
        )
        .flat()

      let randomPosts = []
      while (randomPosts.length < countOfInitialPost) {
        const randomIndex = Math.floor(Math.random() * allCategoryPosts.length)
        const randomPost = allCategoryPosts[randomIndex]

        if (!filteredPosts.includes(randomPost)) {
          randomPosts.push(randomPost)
        }
      }
      filteredPosts = randomPosts
    }

    return filteredPosts.slice(0, count * countOfInitialPost)
  })

  return (
    <ThumbnailContainer>
      {refinedPosts.map(({ node }, index) => (
        <ThumbnailItem node={node} key={`item_${index}`} />
      ))}
    </ThumbnailContainer>
  )
}
