'use client'

// MUI Imports
import Typography from '@mui/material/Typography'
import { Box, Chip, IconButton, type Theme } from '@mui/material'

// Component Imports
import RemoveAttributeModal from './RemoveAttributeModal'
import RemoveAttributeValueModal from './attributeValue/RemoveAttributeValueModal'
import CreateUpdateAttributeDialog from './CreateUpdateAttributeDialog'
import CreateUpdateAttributeValueDialog from './attributeValue/CreateUpdateAttributeValueDialog'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// API Import
import { AttributeType, Attribute } from '@/types/app/productAttributes.type'
import { Fragment, useMemo } from 'react'

interface AttributeValueChipProps {
  attribute: Attribute
  item: any
  onDelete: () => void
}

const AttributeValueChip = ({ attribute, item, onDelete }: AttributeValueChipProps) => {
  const colorDot = useMemo(
    () =>
      attribute.type === AttributeType.COLOR ? (
        <Box
          sx={(theme: Theme) => ({
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: item.colorCode || '#999',
            border: `1px solid ${theme.palette.divider}`
          })}
        />
      ) : null,
    [attribute.type, item.colorCode]
  )

  return (
    <Chip
      label={
        <Box display='flex' alignItems='center' gap={1}>
          {colorDot}
          <CreateUpdateAttributeValueDialog attribute={attribute} attributeValue={item} trigger={<span>{item.name}</span>} />
          <div className='mt-1'>
            <RemoveAttributeValueModal id={item.id} />
          </div>
        </Box>
      }
      color='secondary'
      variant='outlined'
      sx={{ direction: 'rtl', margin: '2px' }}
    />
  )
}

const AttributeValuesDisplay = ({ attribute }: { attribute: Attribute }) => {
  if (!attribute.values?.length) {
    return (
      <CreateUpdateAttributeValueDialog
        attribute={attribute}
        trigger={
          <IconButton sx={{ direction: 'rtl', margin: '4px', cursor: 'pointer', padding: 0 }}>
            <i className='tabler-plus' style={{ fontSize: '24px' }} />
          </IconButton>
        }
      />
    )
  }

  return (
    <Box display='flex' flexWrap='wrap' alignItems='center' gap={1}>
      {attribute.values.map(item => (
        <Fragment key={item.id}>
          <AttributeValueChip attribute={attribute} item={item} onDelete={() => {}} />
        </Fragment>
      ))}
      <CreateUpdateAttributeValueDialog
        attribute={attribute}
        trigger={
          <IconButton sx={{ direction: 'rtl', margin: '4px', cursor: 'pointer', padding: 0 }}>
            <i className='tabler-plus' style={{ fontSize: '24px' }} />
          </IconButton>
        }
      />
    </Box>
  )
}

const OperationsCell = ({ attribute }: { attribute: Attribute }) => (
  <Box display='flex' alignItems='center' gap={2}>
    <RemoveAttributeModal id={attribute.id} />
    <CreateUpdateAttributeDialog
      trigger={
        <IconButton size='small'>
          <i className='tabler-edit text-gray-500 text-lg' />
        </IconButton>
      }
      attribute={attribute}
    />
  </Box>
)

const DesktopAttributeTable = ({ data }: { data: Attribute[] }) => {
  const getTypeLabel = (type: AttributeType) => (type === AttributeType.BUTTON ? 'دکمه' : 'رنگ')

  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>نام ویژگی</th>
            <th>نوع</th>
            <th>متغییر ها</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>
                <Typography className='font-medium' color='text.primary'>
                  {row.name}
                </Typography>
              </td>
              <td>
                <Typography>{getTypeLabel(row.type)}</Typography>
              </td>
              <td>
                <AttributeValuesDisplay attribute={row} />
              </td>
              <td>
                <OperationsCell attribute={row} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DesktopAttributeTable
