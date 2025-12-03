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

const ColorPickerHexField: React.FC<Props> = ({ name, label = 'انتخاب رنگ', placeholder = '#FFFFFF', helperText, control: externalControl, errors: externalErrors }) => {
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
      render={({ field }) => (
        <div className='flex items-center gap-2 relative'>
          <CustomTextField
            {...field}
            value={field.value ?? ''}
            fullWidth
            label={label}
            placeholder={placeholder}
            error={!!errors?.[name]}
            helperText={errors?.[name]?.message?.toString() || helperText}
            onChange={e => {
              let value = e.target.value

              if (value.length > 7) value = value.slice(0, 7)
              if (!value) return field.onChange(null)
              if (!value.startsWith('#')) value = '#' + value
              value = value.replace(/[^#0-9A-Fa-f]/g, '').slice(0, 7)
              field.onChange(value)
            }}
          />

          <div
            onClick={openPicker}
            style={{
              width: 32,
              height: 32,
              marginTop: 16,
              borderRadius: 6,
              cursor: 'pointer',
              backgroundColor: field.value || '#eee',
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
                <HexColorPicker color={field.value || '#000000'} onChange={field.onChange} style={{ width: 200, height: 150 }} />
              </div>
            </ClickAwayListener>
          </Popper>
        </div>
      )}
    />
  )
}

export default ColorPickerHexField
