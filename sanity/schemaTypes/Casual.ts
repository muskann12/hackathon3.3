
import { Rule } from '@sanity/types'

export default {
  name: 'Casual',
  title: 'Casual',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'imgSrc',
      title: 'Image Source',
      type: 'image',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: Rule) => Rule.min(0).max(5),
    },
    {
      name: 'oldPrice',
      title: 'Old Price',
      type: 'number',
      description: 'The original price before any discounts.',
    },
    {
      name: 'discount',
      title: 'Discount',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['T-shirts', 'Shirts', 'Pants', 'Shorts', 'Hoodies', 'Jeans'],
      },
    },
  ],
};
