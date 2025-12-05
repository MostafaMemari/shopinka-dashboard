'use client'

import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import GalleryDialog from '@/components/Gallery/GalleryDialog'
import EmptyPlaceholder from '@/components/EmptyPlaceholder'
import { GalleryItem } from '@/types/app/galleryItem.type'

interface Props {
  mainImage?: GalleryItem | null
  control: any
}

const ThumbnailFontImage = ({ mainImage, control }: Props) => {
  const [selected, setSelected] = useState(mainImage || null)

  useEffect(() => {
    setSelected(mainImage || null)
  }, [mainImage])

  return (
    <Controller
      name='thumbnailId'
      control={control}
      defaultValue={mainImage?.id || null}
      render={({ field: { onChange } }) => {
        const select = (img: GalleryItem | GalleryItem[]) => {
          const one = Array.isArray(img) ? img[0] : img

          setSelected(one)
          onChange(one?.id || null)
        }

        const remove = () => {
          setSelected(null)
          onChange(null)
        }

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            {selected ? (
              <Box sx={{ position: 'relative', width: 120, height: 120, border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
                <Image src={selected.fileUrl} alt='font' fill style={{ objectFit: 'contain' }} />
              </Box>
            ) : (
              <EmptyPlaceholder width={120} height={120} text='' />
            )}

            <GalleryDialog
              initialSelected={selected || undefined}
              multi={false}
              onSelect={select}
              trigger={
                <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                  {selected ? 'تغییر تصویر' : 'انتخاب تصویر'}
                </Typography>
              }
            />
          </Box>
        )
      }}
    />
  )
}

export default ThumbnailFontImage
