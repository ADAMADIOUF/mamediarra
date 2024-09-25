import { nanoid } from 'nanoid'

const navLinks = [
  {
    id: nanoid(),
    name: 'Home',
    categories: [
      { id: nanoid(), name: 'Electronics', link: '/home/electronics' },
      { id: nanoid(), name: 'Furniture', link: '/home/furniture' },
      { id: nanoid(), name: 'Appliances', link: '/home/appliances' },
      { id: nanoid(), name: 'Outdoor', link: '/home/outdoor' },
      { id: nanoid(), name: 'Decor', link: '/home/decor' },
      { id: nanoid(), name: 'Office', link: '/home/office' },
      { id: nanoid(), name: 'Lighting', link: '/home/lighting' },
    ],
  },

  {
    id: nanoid(),
    name: 'Women',
    categories: [
      { id: nanoid(), name: 'Clothing', link: '/women/clothing' },
      { id: nanoid(), name: 'Accessories', link: '/women/accessories' },
      { id: nanoid(), name: 'Shoes', link: '/women/shoes' },
      { id: nanoid(), name: 'Beauty', link: '/women/beauty' },
      { id: nanoid(), name: 'Sport', link: '/women/sport' },
      { id: nanoid(), name: 'Sale', link: '/women/sale' },
      { id: nanoid(), name: 'Special Offers', link: '/women/special-offers' },
      { id: nanoid(), name: 'Gifting', link: '/women/gifting' },
    ],
  },
  {
    id: nanoid(),
    name: 'Men',
    categories: [
      { id: nanoid(), name: 'Clothing', link: '/men/clothing' },
      { id: nanoid(), name: 'Accessories', link: '/men/accessories' },
      { id: nanoid(), name: 'Shoes', link: '/men/shoes' },
      { id: nanoid(), name: 'Beauty', link: '/men/beauty' },
      { id: nanoid(), name: 'Sport', link: '/men/sport' },
      { id: nanoid(), name: 'Offers & Deals', link: '/men/offers-deals' },
      { id: nanoid(), name: 'Sale', link: '/men/sale' },
      { id: nanoid(), name: 'Gifting', link: '/men/gifting' },
    ],
  },
  {
    id: nanoid(),
    name: 'Kids',
    categories: [
      { id: nanoid(), name: 'Clothing', link: '/kids/clothing' },
      { id: nanoid(), name: 'Accessories', link: '/kids/accessories' },
      { id: nanoid(), name: 'Shoes', link: '/kids/shoes' },
      { id: nanoid(), name: 'Beauty', link: '/kids/beauty' },
      { id: nanoid(), name: 'Sport', link: '/kids/sport' },
      { id: nanoid(), name: 'Offers & Deals', link: '/kids/offers-deals' },
      { id: nanoid(), name: 'Sale', link: '/kids/sale' },
      { id: nanoid(), name: 'Gifting', link: '/kids/gifting' },
    ],
  },
  {
    id: nanoid(),
    name: 'Beauty',
    categories: [
      { id: nanoid(), name: 'View All', link: '/beauty/view-all' },
      { id: nanoid(), name: 'Makeup', link: '/beauty/makeup' },
      { id: nanoid(), name: 'Nails', link: '/beauty/nails' },
      { id: nanoid(), name: 'Skin Care', link: '/beauty/skin-care' },
      { id: nanoid(), name: 'Hair Care', link: '/beauty/hair-care' },
      { id: nanoid(), name: 'Fragrance & Perfume', link: '/beauty/fragrance' },
      {
        id: nanoid(),
        name: 'Makeup Bags & Cases',
        link: '/beauty/makeup-bags',
      },
      { id: nanoid(), name: 'Mini Size', link: '/beauty/mini-size' },
      { id: nanoid(), name: 'Sale', link: '/beauty/sale' },
      { id: nanoid(), name: 'Guides', link: '/beauty/guides' },
      { id: nanoid(), name: 'Gifting', link: '/beauty/gifting' },
    ],
  },
  {
    id: nanoid(),
    name: 'Shop',
    categories: [], // No categories for Shop
    link: '/shop', // If necessary, you can include this for navigation
  },
]

export default navLinks
