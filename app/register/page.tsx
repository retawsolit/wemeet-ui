import { AuthLayout } from "@/components/auth-layout"
import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join WeMeet and start meeting securely"
      linkText="Already have an account?"
      linkHref="/login"
    >
      <RegisterForm />
    </AuthLayout>
  )
}
