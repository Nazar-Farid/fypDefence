'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { useFormContext } from 'react-hook-form'
import { useAuthContextHook } from '@/context/use-auth-context'
import TypeSelectionForm from './type-selection-form'
import { Spinner } from '@/components/spinner'

// ✅ Wrap Spinner in an anonymous function to match the expected type
const DetailForm = dynamic(() => import('./account-details-form'), {
  ssr: false,
  loading: () => <Spinner noPadding={true} />,
})

const OTPForm = dynamic(() => import('./otp-form'), {
  ssr: false,
  loading: () => <Spinner noPadding={true} />,
})

type Props = {}

const RegistrationFormStep = (props: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext()

  const { currentStep } = useAuthContextHook()
  const [onOTP, setOnOTP] = useState<string>('')
  const [onUserType, setOnUserType] = useState<'owner' | 'student'>('owner')

  // ✅ Set OTP value in form
  setValue('otp', onOTP)

  switch (currentStep) {
    case 1:
      return (
        <TypeSelectionForm
          register={register}
          userType={onUserType}
          setUserType={setOnUserType}
        />
      )
    case 2:
      return (
        <DetailForm
          errors={errors}
          register={register}
        />
      )
    case 3:
      return (
        <OTPForm
          onOTP={onOTP}
          setOTP={setOnOTP}
        />
      )
    default:
      return <div>RegistrationFormStep</div>
  }
}

export default RegistrationFormStep
