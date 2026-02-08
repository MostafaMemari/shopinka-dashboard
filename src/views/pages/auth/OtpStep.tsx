'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// MUI
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// Third-party
import { OTPInput } from 'input-otp'
import type { SlotProps } from 'input-otp'
import classnames from 'classnames'

// Components
import { useOtpTimer } from '@/hooks/useOtpTimer'

// Styles
import styles from '@/libs/styles/inputOtp.module.css'

// Messages
import { errorOtpStepMessages } from '@/messages/auth/otpMessages'
import { showToast } from '@/utils/showToast'
import { verifyOtp } from '@/libs/api/auth.api'
import { handleApiError } from '@/utils/handleApiError'
import { Box } from '@mui/material'
import useAuthStore from '@/store/auth.store'
import { getMe } from '@/libs/api/user.api'

const Slot = (props: SlotProps & { isError?: boolean }) => (
  <div
    className={classnames(styles.slot, {
      [styles.slotActive]: props.isActive,
      [styles.slotError]: props.isError
    })}
  >
    {props.char !== null && <div>{props.char}</div>}
    {props.hasFakeCaret && <FakeCaret />}
  </div>
)

const FakeCaret = () => (
  <div className={styles.fakeCaret}>
    <div className='w-px h-5 bg-textPrimary' />
  </div>
)

export const OtpInputComponent = ({ phoneNumber, onBack }: { phoneNumber: string; onBack: () => void }) => {
  const [otp, setOtp] = useState('')
  const [isError, setIsError] = useState(false)
  const otpInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const { setLoading, loginSuccess, isLoading } = useAuthStore()

  const resetOtpForm = useCallback(() => {
    setIsError(true)
    setOtp('')
    setTimeout(() => setIsError(false), 500)
    otpInputRef.current?.focus()
  }, [])

  const { timeLeft, isExpired, formatTime } = useOtpTimer(300)

  useEffect(() => {
    otpInputRef.current?.focus()
  }, [])

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true)

      if (otp.length === 6 && /^\d{6}$/.test(otp)) {
        if (isExpired) {
          resetOtpForm()

          return showToast({ type: 'error', message: 'زمان شما به اتمام رسیده' })
        }

        const res = await verifyOtp(phoneNumber, otp)

        const errorMessage = handleApiError(res.status, errorOtpStepMessages)

        if (errorMessage) {
          resetOtpForm()

          return showToast({ type: 'error', message: errorMessage })
        }

        if (res?.status === 201 || res.status === 200) {
          showToast({ type: 'success', message: 'ورود شما با موفقیت انجام شد' })
          const getUser = await getMe()

          if (getUser.ok) loginSuccess({ ...getUser.data })
          router.push('/home')
        }

        formRef.current?.requestSubmit()
      } else {
        showToast({ type: 'error', message: 'کد اعتبار سنجی اشتباه است' })
      }
    } catch (error) {
      showToast({ type: 'error', message: 'خطای سیستمی' })
    } finally {
      setLoading(false)
    }
  }, [otp, isExpired, phoneNumber, router, resetOtpForm, setLoading, loginSuccess])

  useEffect(() => {
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
      handleSubmit()
    }
  }, [otp, handleSubmit])

  const maskedPhoneNumber = phoneNumber.slice(0, -4) + '****'

  return (
    <div className='text-center max-w-md mx-auto'>
      <div className='flex flex-col gap-1 align-center justify-center text-center mbe-6'>
        <Box className='flex flex-col items-center gap-2'>
          <Typography variant='body1' color='text.secondary'>
            لطفا کد اعتبارسنجی را وارد کنید
          </Typography>
          <Typography variant='h6' className='font-' color='text.primary' dir='ltr'>
            {maskedPhoneNumber}
          </Typography>
        </Box>
      </div>

      <form
        ref={formRef}
        noValidate
        autoComplete='off'
        onSubmit={e => {
          e.preventDefault()
        }}
        className='flex flex-col gap-6'
      >
        <div className='flex flex-col gap-2'>
          <Typography>کد امنیتی ۶ رقمی را وارد کنید</Typography>
          <div dir='ltr'>
            <OTPInput
              ref={otpInputRef}
              onChange={(value: string) => /^\d*$/.test(value) && setOtp(value)}
              value={otp}
              maxLength={6}
              containerClassName='flex items-center justify-between w-full gap-4'
              render={({ slots }) => (
                <div className='flex items-center justify-between w-full gap-4 '>
                  {slots.slice(0, 6).map((slot, idx) => (
                    <Slot key={idx} {...slot} isError={isError} />
                  ))}
                </div>
              )}
            />
          </div>

          <Typography color={isExpired ? 'error.main' : 'text.primary'} className='mt-2'>
            {isExpired ? 'زمان به پایان رسید!' : `زمان باقی‌مانده: ${formatTime(timeLeft)}`}
          </Typography>
        </div>

        <Button
          fullWidth
          variant='contained'
          type='submit'
          disabled={otp.length !== 6 || isExpired || isLoading}
          startIcon={isLoading ? <CircularProgress size={20} color='inherit' /> : null}
        >
          {isLoading ? 'در حال بررسی...' : 'ورود'}
        </Button>

        <Button variant='text' onClick={onBack}>
          بازگشت
        </Button>
      </form>
    </div>
  )
}
