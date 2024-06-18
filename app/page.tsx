'use client'

import { JwtForm } from '@/components/jwt-form'
import { JwtResult } from '@/components/jwt-result'
import { useState } from 'react'

export default function Home() {
  const [jwt, setJwt] = useState<string | null>(null)
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1 className="text-3xl font-bold text-left text-secondary-foreground w-[400px]">
        Tinybird JWT Generator
      </h1>
      <div className="flex flex-col items-center space-y-8 w-[400px]">
        <JwtForm onSubmit={setJwt} />
        <JwtResult jwt={jwt} />
      </div>
    </main>
  )
}
