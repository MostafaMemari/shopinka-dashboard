'use client'

import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
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

const FontFile = ({ mainImage, control }: Props) => {
  const [selected, setSelected] = useState(mainImage || null)

  useEffect(() => {
    setSelected(mainImage || null)
  }, [mainImage])

  const getExt = (fileUrl?: string): string | null => {
    if (!fileUrl) return null

    return fileUrl.split('.').pop()?.toUpperCase() || null
  }

  return (
    <Controller
      name='mainImageId'
      control={control}
      defaultValue={mainImage?.id || null}
      render={({ field: { onChange } }) => {
        const select = (file: GalleryItem | GalleryItem[]) => {
          const one = Array.isArray(file) ? file[0] : file

          setSelected(one)
          onChange(one?.id || null)
        }

        const remove = () => {
          setSelected(null)
          onChange(null)
        }

        const ext = getExt(selected?.fileUrl)

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            {/* Thumbnail or File Extension */}
            {selected ? (
              <Box
                sx={{
                  position: 'relative',
                  width: 120,
                  height: 120,
                  borderRadius: 2,
                  border: '1px solid #ddd',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 22,
                  fontWeight: 600,
                  color: '#555'
                }}
              >
                {ext}

                <Tooltip title='حذف'>
                  <IconButton
                    size='small'
                    onClick={remove}
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      bgcolor: 'white',
                      '&:hover': { bgcolor: 'error.light' }
                    }}
                  >
                    <DeleteOutlineIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <EmptyPlaceholder width={120} height={120} text='' />
            )}

            {/* Pick / Change */}
            <GalleryDialog
              initialSelected={selected || undefined}
              multi={false}
              onSelect={select}
              trigger={
                <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                  {selected ? 'تغییر فایل' : 'انتخاب فایل'}
                </Typography>
              }
            />
          </Box>
        )
      }}
    />
  )
}

export default FontFile
