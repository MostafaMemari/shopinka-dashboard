'use client'

import { useState, useCallback } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'
import { HexColorPicker } from 'react-colorful'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Popper from '@mui/material/Popper'

type Props = {
  name: string
  label?: string
  placeholder?: string
  helperText?: string
  control?: any
  errors?: Record<string, any>
}

function hexToRgba(hex: string, alpha = 1) {
  hex = hex.replace('#', '')

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(c => c + c)
      .join('')
  }

  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function rgbaToHex(rgba: string) {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)

  if (!match) return '#000000'
  const [_, r, g, b] = match

  return (
    '#' +
    [r, g, b]
      .map(x => {
        const hex = parseInt(x).toString(16)

        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
  )
}

const ColorPickerRgbaField: React.FC<Props> = ({ name, label = 'انتخاب رنگ', placeholder = 'rgba(0,0,0,1)', helperText, control: externalControl, errors: externalErrors }) => {
  const context = useFormContext()
  const control = externalControl ?? context?.control
  const errors = externalErrors ?? context?.formState?.errors ?? {}

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const openPicker = useCallback((event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget), [])
  const closePicker = useCallback(() => setAnchorEl(null), [])
  const isOpen = Boolean(anchorEl)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const hexValue = rgbaToHex(field.value || 'rgba(0,0,0,1)')

        return (
          <div className='flex items-center gap-2 relative'>
            <CustomTextField
              {...field}
              value={field.value ?? ''}
              fullWidth
              label={label}
              placeholder={placeholder}
              error={!!errors?.[name]}
              helperText={errors?.[name]?.message?.toString() || helperText}
            />

            <div
              onClick={openPicker}
              style={{
                width: 32,
                height: 32,
                marginTop: 16,
                borderRadius: 6,
                cursor: 'pointer',
                backgroundColor: field.value || 'rgba(0,0,0,1)',
                border: '1px solid #ccc',
                flexShrink: 0
              }}
              title='انتخاب رنگ'
            />

            <Popper
              open={isOpen}
              anchorEl={anchorEl}
              placement='top-start'
              modifiers={[
                { name: 'offset', options: { offset: [0, 8] } },
                { name: 'preventOverflow', options: { boundariesElement: 'viewport' } }
              ]}
              style={{ zIndex: 1300 }}
            >
              <ClickAwayListener onClickAway={closePicker}>
                <div
                  style={{
                    padding: 8,
                    background: '#fff',
                    borderRadius: 8,
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
                    border: '1px solid #e0e0e0'
                  }}
                >
                  <HexColorPicker
                    color={hexValue}
                    onChange={hex => {
                      const rgba = hexToRgba(hex, 0.25)

                      field.onChange(rgba)
                    }}
                    style={{ width: 200, height: 150 }}
                  />
                </div>
              </ClickAwayListener>
            </Popper>
          </div>
        )
      }}
    />
  )
}

export default ColorPickerRgbaField
