import React, { useMemo } from 'react'

import { ThumbnailContainer } from '../thumbnail-container'
import { ThumbnailItem } from '../thumbnail-item'
import { CATEGORY_TYPE } from '../../constants'

export const Contents = ({ posts, countOfInitialPost, count, category }) => {
  const refinedPosts = useMemo(() => {
    let allCategoryPosts = []
    let temp = []
    let filteredPosts = posts.filter(
      ({ node }) =>
        category === CATEGORY_TYPE.ALL || node.frontmatter.category === category
    )

    if (category === CATEGORY_TYPE.RANDOM) {
      const categories = [
        'nodejs',
        'retrospective',
        'javascript',
        'web',
        'git',
        'cs',
        'docker',
        'books',
        'security',
        'etc.',
        'database',
        'oop',
        'reference',
      ]

      const randomlySortedCategories = categories.sort(
        () => Math.random() - 0.5
      )

      randomlySortedCategories.forEach(category => {
        temp = posts.filter(
          ({ node }) => node.frontmatter.category === category
        )
        posts.concat(temp)
      })
      allCategoryPosts = posts.flat()

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
