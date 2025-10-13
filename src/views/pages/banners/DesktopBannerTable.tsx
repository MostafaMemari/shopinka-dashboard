'use client'

import { Box, IconButton, Typography } from '@mui/material'
import tableStyles from '@core/styles/table.module.css'
import UpdateBannerModal from './CreateUpdateBannerDialog'
import RemoveBannerModal from './RemoveBannerModal'
import { stripHtml, truncateText } from '@/utils/formatters'
import { Banner } from '@/types/app/banner.type'

const DesktopBannerTable = ({ banners }: { banners: Banner[] }) => {
  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>تصویر</th>
            <th>نام بنر</th>
            <th>نامک بنر</th>
            <th>توضیحات</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {banners.length === 0 ? (
            <tr>
              <td colSpan={5} className='text-center'>
                هیچ بنری یافت نشد
              </td>
            </tr>
          ) : (
            banners.map(banner => (
              <tr key={banner.id}>
                <td>
                  {banner.imageId && banner.image?.thumbnailUrl ? (
                    <img src={banner.image.thumbnailUrl} alt={banner.link || 'تصویر بنر'} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                  ) : (
                    <Typography color='text.secondary'>-</Typography>
                  )}
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {banner.image?.title || '-'}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {banner.link || '-'}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium line-clamp-2 max-w-[300px] text-ellipsis overflow-hidden' color='text.primary'>
                    {truncateText(stripHtml(banner.image.description || '-'))}
                  </Typography>
                </td>
                <td>
                  <Box display='flex' alignItems='center' gap={2}>
                    <RemoveBannerModal id={banner.id}>
                      <IconButton size='small'>
                        <i className='tabler-trash text-gray-500 text-lg' />
                      </IconButton>
                    </RemoveBannerModal>
                    <UpdateBannerModal
                      trigger={
                        <IconButton size='small'>
                          <i className='tabler-edit text-gray-500 text-lg' />
                        </IconButton>
                      }
                      banner={banner}
                    ></UpdateBannerModal>
                  </Box>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DesktopBannerTable
