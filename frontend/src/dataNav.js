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
      {
        id: nanoid(),
        name: 'Unisex Clothing',
        link: '/clothing/unisex',
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
      { id: nanoid(), name: 'Custom Shoes', link: '/shoes/custom' },
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
      {
        id: nanoid(),
        name: 'Made-to-Order',
        link: '/custom-african/made-to-order',
      },
    ],
  },
  {
    id: nanoid(),
    title: 'Shop',
    categories: [
      { id: nanoid(), name: 'Shop', link: '/shop' },
      { id: nanoid(), name: 'New Arrivals', link: '/shop/new-arrivals' },
      { id: nanoid(), name: 'Best Sellers', link: '/shop/best-sellers' },
      { id: nanoid(), name: 'Sale', link: '/shop/sale' },
      { id: nanoid(), name: 'Gift Cards', link: '/shop/gift-cards' },
    ],
  },
  {
    id: nanoid(),
    title: 'About Us',
    categories: [
      { id: nanoid(), name: 'Our Story', link: '/about/our-story' },
      { id: nanoid(), name: 'Meet the Team', link: '/about/meet-the-team' },
      { id: nanoid(), name: 'Careers', link: '/about/careers' },
    ],
  },
  {
    id: nanoid(),
    title: 'Contact',
    categories: [
      {
        id: nanoid(),
        name: 'Customer Support',
        link: '/contact/customer-support',
      },
      { id: nanoid(), name: 'Feedback', link: '/contact/feedback' },
      {
        id: nanoid(),
        name: 'Media Inquiries',
        link: '/contact/media-inquiries',
      },
    ],
  },
]

export default navbarData
