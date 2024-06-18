import { JwtForm } from '@/components/jwt-form'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <JwtForm />
    </main>
  )
}
