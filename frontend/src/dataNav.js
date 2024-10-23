import { nanoid } from 'nanoid'

const navbarData = [
  {
    id: nanoid(),
    title: 'Clothing',
    categories: [
      {
        id: nanoid(),
        name: 'Men’s Clothing',
        link: '/clothing/mens',
      },
      {
        id: nanoid(),
        name: 'Women’s Clothing',
        link: '/clothing/womens',
      },
      {
        id: nanoid(),
        name: 'Kids’ Clothing',
        link: '/clothing/kids',
      },
      
    ],
  },
  {
    id: nanoid(),
    title: 'Shoes',
    categories: [
      { id: nanoid(), name: 'Men’s Shoes', link: '/shoes/mens' },
      { id: nanoid(), name: 'Women’s Shoes', link: '/shoes/womens' },
      { id: nanoid(), name: 'Kids’ Shoes', link: '/shoes/kids' },
      
    ],
  },
  {
    id: nanoid(),
    title: 'Accessories',
    categories: [
      { id: nanoid(), name: 'Bags', link: '/accessories/bags' },
      { id: nanoid(), name: 'Jewelry', link: '/accessories/jewelry' },
      { id: nanoid(), name: 'Hats', link: '/accessories/hats' },
      { id: nanoid(), name: 'Belts', link: '/accessories/belts' },
    ],
  },
  {
    id: nanoid(),
    title: 'Custom African',
    categories: [
      {
        id: nanoid(),
        name: 'Tailored Clothing',
        link: '/custom-african/clothing',
      },
      { id: nanoid(), name: 'Custom Designs', link: '/custom-african/designs' },
      {
        id: nanoid(),
        name: 'Handcrafted Items',
        link: '/custom-african/handcrafted',
      },
      
    ],
  },
  {
    id: nanoid(),
    title: 'Shop',
    categories: [
      { id: nanoid(), name: 'Shop', link: '/shop' },
      
      
    ],
  },
  
]

export default navbarData
