import { Line } from '@/types/app/customSticker.type'
import { Font } from '@/types/app/font.type'
import { MaterialSticker } from '@/types/app/material-sticker.type'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Stack, Divider, Chip } from '@mui/material'

type CustomStickerData = {
  lines: Line[]
  font: Font
  material: MaterialSticker
  thumbnail: string
}

type CustomStickerDialogProps = {
  open: boolean
  onClose: () => void
  data: CustomStickerData | null
}

const CustomStickerDialog = ({ open, onClose, data }: CustomStickerDialogProps) => {
  if (!data) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>جزئیات استیکر سفارشی</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          <Box display='flex' gap={2} alignItems='center'>
            <img
              src={data.thumbnail}
              alt='custom-sticker'
              style={{
                width: 96,
                height: 96,
                objectFit: 'cover',
                borderRadius: 8
              }}
            />

            <Box>
              <Typography fontWeight={600} gutterBottom>
                متن استیکر
              </Typography>

              <Stack spacing={2}>
                {data.lines.map(line => (
                  <Box key={line.lineNumber}>
                    <Typography fontWeight={500}>خط {line.lineNumber}</Typography>

                    <Typography variant='body2' color='text.secondary'>
                      متن: «{line.text}»
                    </Typography>

                    <Stack direction='row' spacing={2} mt={1} flexWrap='wrap'>
                      <Typography variant='caption'>
                        عرض: <strong>{line.width} cm</strong>
                      </Typography>

                      <Typography variant='caption'>
                        ارتفاع: <strong>{line.height} cm</strong>
                      </Typography>

                      <Typography variant='caption'>
                        نسبت عرض به ارتفاع: <strong>{line.ratio.toFixed(2)}</strong>
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>

          <Divider />

          <Box>
            <Typography fontWeight={600} gutterBottom>
              فونت
            </Typography>

            <Stack direction='row' spacing={1} flexWrap='wrap'>
              <Chip label={data.font.displayName} />
              <Chip label={`سایز: ${data.font.size}`} />
              <Chip label={`Line Height: ${data.font.lineHeight}`} />
              {data.font.isPersian && <Chip color='primary' label='فارسی' />}
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography fontWeight={600} gutterBottom>
              متریال
            </Typography>

            <Stack direction='row' spacing={1} alignItems='center'>
              <Box width={14} height={14} borderRadius='50%' bgcolor={data.material.colorCode} border='1px solid #ccc' />
              <Typography variant='body2'>
                {data.material.name} ({data.material.surface})
              </Typography>
            </Stack>

            <Typography variant='body2' color='text.secondary'>
              قیمت هر سانتی‌متر: {data.material.pricePerCM}
            </Typography>

            <Typography variant='body2' color='text.secondary'>
              سود: {data.material.profitPercent}%
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant='outlined'>
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomStickerDialog
