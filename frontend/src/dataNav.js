import { nanoid } from 'nanoid'

const navbarData = [
  {
    id: nanoid(),
    title: 'Things to Do',
    categories: [
      {
        id: nanoid(),
        name: 'Cultural Experiences',
        link: '/things-to-do/cultural-experiences',
      },
      {
        id: nanoid(),
        name: 'Outdoor Activities',
        link: '/things-to-do/outdoor-activities',
      },
      {
        id: nanoid(),
        name: 'Historical Sites',
        link: '/things-to-do/historical-sites',
      },
      {
        id: nanoid(),
        name: 'Wildlife Tours',
        link: '/things-to-do/wildlife-tours',
      },
    ],
  },
  {
    id: nanoid(),
    title: 'Explore',
    categories: [
      { id: nanoid(), name: 'Cities', link: '/explore/cities' },
      { id: nanoid(), name: 'National Parks', link: '/explore/national-parks' },
      { id: nanoid(), name: 'Beaches', link: '/explore/beaches' },
      { id: nanoid(), name: 'Rural Areas', link: '/explore/rural-areas' },
    ],
  },
  {
    id: nanoid(),
    title: 'Dine',
    categories: [
      { id: nanoid(), name: 'Local Cuisine', link: '/dine/local-cuisine' },
      { id: nanoid(), name: 'Fine Dining', link: '/dine/fine-dining' },
      { id: nanoid(), name: 'Street Food', link: '/dine/street-food' },
      {
        id: nanoid(),
        name: 'Cafes and Bakeries',
        link: '/dine/cafes-and-bakeries',
      },
    ],
  },
  {
    id: nanoid(),
    title: 'Stay',
    categories: [
      { id: nanoid(), name: 'Hotels', link: '/stay/hotels' },
      { id: nanoid(), name: 'Guesthouses', link: '/stay/guesthouses' },
      { id: nanoid(), name: 'Hostels', link: '/stay/hostels' },
      { id: nanoid(), name: 'Camping', link: '/stay/camping' },
    ],
  },
  {
    id: nanoid(),
    title: 'Events',
    categories: [
      { id: nanoid(), name: 'Festivals', link: '/events/festivals' },
      { id: nanoid(), name: 'Concerts', link: '/events/concerts' },
      { id: nanoid(), name: 'Exhibitions', link: '/events/exhibitions' },
      { id: nanoid(), name: 'Workshops', link: '/events/workshops' },
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
