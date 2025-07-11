export const phoneNumberStepMessages = {
  welcome: (templateName: string) => `به ${templateName} خوش آمدید! 👋🏻`,
  instruction: 'لطفاً با شماره موبایل خود وارد شوید و ماجرا را آغاز کنید',
  phoneLabel: 'شماره موبایل',
  phonePlaceholder: 'شماره موبایل خود را وارد کنید',
  invalidPhone: 'شماره موبایل معتبر نیست',
  loginButton: 'ورود',
  newUser: 'کاربر جدید هستید؟',
  createAccount: 'ایجاد حساب کاربری',
  backButton: 'بازگشت'
}

export const errorPhoneNumberStepMessages: Record<number, string> = {
  400: 'شماره نامعتبر است',
  403: 'درخواست زیاد بود، بعداً تلاش کنید',
  409: 'کد قبلاً ارسال شده است',
  429: 'تعداد درخواست بیش از حد مجاز بود',
  500: 'خطای سرور'
}
