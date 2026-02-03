// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'خانه',
    href: '/home',
    icon: 'tabler-smart-home'
  },
  {
    label: 'محصولات',
    icon: 'tabler-shopping-cart',
    children: [
      {
        label: 'افزودن',
        href: '/products/add',
        icon: 'tabler-plus'
      },
      {
        label: 'لیست',
        href: '/products',
        icon: 'tabler-list'
      },
      {
        label: 'ویژگی‌ها',
        href: '/products/attributes',
        icon: 'tabler-layers-difference'
      }
    ]
  },
  {
    label: 'وبلاگ',
    icon: 'tabler-news',
    children: [
      {
        label: 'افزودن',
        href: '/blogs/add',
        icon: 'tabler-plus'
      },
      {
        label: 'لیست',
        href: '/blogs',
        icon: 'tabler-list'
      }
    ]
  },
  {
    label: 'مدیریت رسانه‌ها',
    icon: 'tabler-photo',
    href: '/media'
  },
  {
    label: 'فروش عمده',
    icon: 'tabler-shopping-cart-discount',
    href: '/bulk-pricing'
  },
  {
    label: 'مانیتور 404',
    icon: 'tabler-alert-triangle',
    href: '/monitor-404'
  },
  {
    label: 'کاربران',
    icon: 'tabler-users',
    href: '/users'
  },
  {
    label: 'برگه ها',
    icon: 'tabler-file-text',
    href: '/pages'
  },
  {
    label: 'تماس با ما',
    icon: 'tabler-mail',
    href: '/contact'
  },
  {
    label: 'دسته بندی‌ها',
    icon: 'tabler-category',
    href: '/categories'
  },
  {
    label: 'برچسب‌ها',
    icon: 'tabler-tag',
    href: '/tags'
  },
  {
    label: 'نظرات',
    icon: 'tabler-message-circle',
    href: '/comments'
  },
  {
    label: 'سفارشات',
    icon: 'tabler-package',
    href: '/orders'
  },
  {
    label: 'حمل و نقل',
    icon: 'tabler-truck',
    href: '/shipping'
  },
  {
    label: 'بنر',
    icon: 'tabler-slideshow',
    href: '/banners'
  },
  {
    label: 'فونت ها',
    icon: 'tabler-typography',
    href: '/fonts'
  },
  {
    label: 'متریال',
    icon: 'tabler-sticker',
    href: '/material-sticker'
  }
]

export default verticalMenuData
