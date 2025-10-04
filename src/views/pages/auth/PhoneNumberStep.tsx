'use client'

import { useState } from 'react'

// Next Imports
import Link from 'next/link'

import { useForm } from 'react-hook-form'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import Logo from '@components/layout/shared/Logo'
import AuthIllustrationWrapper from './AuthIllustrationWrapper'

// Config Imports

// API Imports
import { sendOtp } from '@/libs/api/auth.api'
import { showToast } from '@/utils/showToast'
import { handleApiError } from '@/utils/handleApiError'
import { errorPhoneNumberStepMessages } from '@/messages/auth/loginMessages'
import { OtpInputComponent } from './OtpStep'

const LoginOtp = () => {
  const [step, setStep] = useState<'login' | 'otp'>('login')
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ mobile: string }>()

  const onSubmit = async (data: { mobile: string }) => {
    try {
      setIsLoading(true)
      const res = await sendOtp(data.mobile)

      const errorMessage = handleApiError(res.status, errorPhoneNumberStepMessages)

      if (errorMessage) {
        showToast({ type: 'error', message: errorMessage })

        return
      }

      if (res?.status === 201 || res.status === 200) {
        showToast({ type: 'success', message: 'کد اعتبار سنجی با موفقیت ارسال شد' })
        setPhone(data.mobile)
        setStep('otp')
      }
    } catch (err) {
      showToast({ type: 'error', message: 'خطای سیستمی' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthIllustrationWrapper>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='sm:!p-12'>
          <Link href='/' className='flex justify-center mbe-6'>
            <Logo />
          </Link>

          {step === 'login' ? (
            <>
              <div className='flex flex-col gap-1 align-center justify-center text-center mb-6'>
                <Typography variant='h5'>ورود به حساب یا ثبت نام</Typography>
                <Typography>شماره موبایل را وارد کنید تا وارد پنل مدیریت شوید</Typography>
              </div>
              <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
                <CustomTextField
                  autoFocus
                  fullWidth
                  label='شماره موبایل'
                  placeholder='شماره موبایل را وارد کنید'
                  type='tel'
                  error={!!errors.mobile}
                  helperText={errors.mobile ? errors.mobile.message : ''}
                  inputProps={{
                    style: { textAlign: 'center' }
                  }}
                  {...register('mobile', {
                    required: true,
                    pattern: {
                      value: /^(0|0098|\+98)9(0[1-5]|[13]\d|2[0-2]|98)\d{7}$/,
                      message: 'شماره موبایل وارد شده معتبر نیست'
                    }
                  })}
                />

                <Button fullWidth variant='contained' type='submit' disabled={isLoading} startIcon={isLoading ? <CircularProgress size={20} color='inherit' /> : null}>
                  {isLoading ? 'در حال ورود...' : 'ورود به پنل مدیریت'}
                </Button>
              </form>
            </>
          ) : (
            <OtpInputComponent phoneNumber={phone} onBack={() => setStep('login')} />
          )}
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  )
}

export default LoginOtp
