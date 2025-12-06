'use client'

import { useState, useCallback, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'
import { HexColorPicker } from 'react-colorful'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Popper from '@mui/material/Popper'
import Slider from '@mui/material/Slider'

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

function rgbaToHexAndAlpha(rgba: string) {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d\.]+)?\)/)

  if (!match) return { hex: '#000000', alpha: 1 }
  const [_, r, g, b, a] = match

  const hex =
    '#' +
    [r, g, b]
      .map(x => {
        const h = parseInt(x).toString(16)

        return h.length === 1 ? '0' + h : h
      })
      .join('')

  return { hex, alpha: a ? parseFloat(a) : 1 }
}

const ColorPickerRgbaField: React.FC<Props> = ({ name, label = 'انتخاب رنگ', placeholder = 'rgba(0,0,0,1)', helperText, control: externalControl, errors: externalErrors }) => {
  const context = useFormContext()
  const control = externalControl ?? context?.control
  const errors = externalErrors ?? context?.formState?.errors ?? {}

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [opacity, setOpacity] = useState(1)
  const openPicker = useCallback((event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget), [])
  const closePicker = useCallback(() => setAnchorEl(null), [])
  const isOpen = Boolean(anchorEl)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { hex, alpha } = rgbaToHexAndAlpha(field.value || 'rgba(0,0,0,1)')

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
                    padding: 12,
                    width: 230,
                    background: '#fff',
                    borderRadius: 10,
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
                    border: '1px solid #e0e0e0'
                  }}
                >
                  <HexColorPicker
                    color={hex}
                    onChange={hexNew => {
                      const rgba = hexToRgba(hexNew, opacity)

                      field.onChange(rgba)
                    }}
                  />

                  <div style={{ marginTop: 10, fontSize: 13 }}>شفافیت: {Math.round(opacity * 100)}%</div>

                  <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    value={opacity}
                    onChange={(_, value) => {
                      const val = value as number

                      setOpacity(val)

                      const rgba = hexToRgba(hex, val)

                      field.onChange(rgba)
                    }}
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
