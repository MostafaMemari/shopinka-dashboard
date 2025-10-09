'use client'

import { useState, useMemo, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Box, Slider, TextField, Typography } from '@mui/material'

interface GradientPickerFormFieldProps {
  name: string
  label?: string
  control?: any
  errors?: Record<string, any>
}

const GradientPickerFormField: React.FC<GradientPickerFormFieldProps> = ({ name, label, control: externalControl, errors: externalErrors }) => {
  const context = useFormContext()
  const control = externalControl ?? context?.control
  const errors = externalErrors ?? context?.formState?.errors ?? {}

  const [startColor, setStartColor] = useState('#ff0000')
  const [endColor, setEndColor] = useState('#0000ff')
  const [angle, setAngle] = useState(90)

  const gradientValue = useMemo(() => `linear-gradient(${angle}deg, ${startColor}, ${endColor})`, [angle, startColor, endColor])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <Box sx={{ mb: 3 }}>
          {label && (
            <Typography variant='body2' sx={{ mb: 1 }}>
              {label}
            </Typography>
          )}

          <Box
            sx={{
              width: '100%',
              height: 40,
              borderRadius: 1,
              mb: 2,
              background: gradientValue,
              border: '1px solid #ddd'
            }}
          />

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              type='color'
              label='رنگ شروع'
              value={startColor}
              onChange={e => {
                setStartColor(e.target.value)
                onChange(`linear-gradient(${angle}deg, ${e.target.value}, ${endColor})`)
              }}
              size='small'
            />
            <TextField
              type='color'
              label='رنگ پایان'
              value={endColor}
              onChange={e => {
                setEndColor(e.target.value)
                onChange(`linear-gradient(${angle}deg, ${startColor}, ${e.target.value})`)
              }}
              size='small'
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant='body2'>زاویه: {angle}°</Typography>
            <Slider
              min={0}
              max={360}
              value={angle}
              onChange={(_, newValue) => {
                setAngle(newValue as number)
                onChange(`linear-gradient(${newValue}deg, ${startColor}, ${endColor})`)
              }}
            />
          </Box>

          {errors?.[name]?.message && (
            <Typography color='error' variant='caption'>
              {errors[name].message}
            </Typography>
          )}
        </Box>
      )}
    />
  )
}

export default GradientPickerFormField
