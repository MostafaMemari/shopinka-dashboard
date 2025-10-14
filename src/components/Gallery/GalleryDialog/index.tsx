'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { debounce, type SelectChangeEvent } from '@mui/material'
import { GalleryItem } from '@/types/app/gallery.type'
import { useGalleryItems } from '@/hooks/reactQuery/gallery/useGallery'
import GalleryItemDetails from './GalleryItemDetails'
import CustomDialog from '@/components/dialogs/CustomDialog'
import { showToast } from '@/utils/showToast'
import GalleryHeader from './GalleryHeader'
import GalleryContent from './GalleryContent'

interface Props {
  btnLabel?: string
  multi?: boolean
  onSelect?: (items: GalleryItem[] | GalleryItem) => void
  initialSelected?: GalleryItem | GalleryItem[] | undefined
  trigger?: React.ReactNode
}

const GalleryDialog = ({ btnLabel, multi = false, onSelect, initialSelected, trigger }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<GalleryItem[]>([])
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [gallerySelected, setGallerySelected] = useState<string>('all')
  const [allGalleryItems, setAllGalleryItems] = useState<GalleryItem[]>([])
  const contentRef = useRef<HTMLDivElement>(null)

  const {
    data: galleryItemsData,
    isLoading: isLoadingItems,
    isFetching: isFetchingItems,
    error: errorItems,
    refetch: refetchItems
  } = useGalleryItems({
    enabled: open,
    params: { galleryId: gallerySelected === 'all' ? undefined : gallerySelected, title: searchTerm, take: 20, page },
    staleTime: 0
  })

  useEffect(() => {
    if (open) {
      setPage(1)
      refetchItems()
    }
  }, [open, refetchItems])

  useEffect(() => {
    if (galleryItemsData?.data?.items) {
      setAllGalleryItems(prev => {
        if (page === 1) {
          return galleryItemsData.data.items
        }

        const newItems = galleryItemsData.data.items.filter((item: GalleryItem) => !prev.some(prevItem => prevItem.id === item.id))

        return [...prev, ...newItems]
      })
    }
  }, [galleryItemsData, page])

  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value)
        setPage(1)
      }, 500),
    []
  )

  useEffect(() => {
    if (open && initialSelected) {
      setSelectedItems(Array.isArray(initialSelected) ? (multi ? initialSelected : initialSelected.slice(0, 1)) : [initialSelected])
    } else if (open) {
      setSelectedItems([])
    }
  }, [open, initialSelected, multi])

  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setActiveItem(null)
    setSelectedItems([])
    setSearchTerm('')
    setGallerySelected('all')
    setPage(1)
  }

  const handleGalleryChange = (event: SelectChangeEvent<string>) => {
    const newGalleryId = event.target.value as string

    setGallerySelected(newGalleryId)
    setSelectedItems([])
    setActiveItem(null)
    setPage(1)
    setAllGalleryItems([])
    refetchItems()
  }

  const handleSelect = () => {
    if (selectedItems.length > 0) {
      onSelect?.(multi ? selectedItems : selectedItems[0])
      handleClose()
    } else {
      showToast({ type: 'warning', message: 'لطفاً حداقل یک تصویر انتخاب کنید' })
    }
  }

  const handleShowMore = () => {
    setPage(prev => prev + 1)
  }

  const dialogActions = useMemo(
    () => (
      <Box sx={{ display: 'flex', gap: 2, px: { xs: 2, sm: 4 }, py: 2 }}>
        <Button onClick={handleClose} color='secondary'>
          بستن
        </Button>
        <Button variant='contained' onClick={handleSelect} disabled={selectedItems.length === 0}>
          انتخاب ({selectedItems.length})
        </Button>
      </Box>
    ),
    [selectedItems.length]
  )

  return (
    <>
      <div onClick={handleOpen} className='cursor-pointer'>
        {trigger || (
          <Button variant='contained' className='max-sm:w-full' sx={{ width: 200, maxWidth: '100%' }} onClick={handleOpen}>
            {btnLabel}
          </Button>
        )}
      </div>

      <CustomDialog open={open} width='95vw' height='95vh' onClose={handleClose} title='گالری تصاویر' actions={dialogActions}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <GalleryHeader searchTerm={searchTerm} gallerySelected={gallerySelected} onSearchChange={debouncedSetSearchTerm} onGalleryChange={handleGalleryChange} enabled={open} />
          <Box ref={contentRef} tabIndex={-1} sx={{ display: 'flex', flex: 1, flexDirection: { xs: 'column', sm: 'row' }, overflow: 'hidden' }}>
            <GalleryContent
              galleryItems={allGalleryItems}
              isLoading={isLoadingItems || isFetchingItems}
              error={errorItems}
              selectedItems={selectedItems}
              onShowMore={handleShowMore}
              hasMore={galleryItemsData?.data?.pager?.hasNextPage}
              onItemClick={item => {
                if (multi) {
                  const isSelected = selectedItems.some(i => i.id === item.id)
                  const updatedItems = isSelected ? selectedItems.filter(i => i.id !== item.id) : [...selectedItems, item]

                  setSelectedItems(updatedItems)
                  setActiveItem(updatedItems.length > 0 ? updatedItems[updatedItems.length - 1] : null)
                } else {
                  setSelectedItems([item])
                  setActiveItem(item)
                }
              }}
              onRetry={refetchItems}
            />
            <GalleryItemDetails activeItem={activeItem} setActiveItem={setActiveItem} multi={multi} selectedItems={selectedItems} />
          </Box>
        </Box>
      </CustomDialog>
    </>
  )
}

export default GalleryDialog
