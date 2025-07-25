export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`
  console.log(`Password reset email would be sent to: ${email}`)
  console.log(`Reset URL: ${resetUrl}`)
  return Promise.resolve()
}