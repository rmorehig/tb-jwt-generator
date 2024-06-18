import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const { workspace_id, signing_key, name } = body
  const next10minutes = new Date()
  next10minutes.setTime(next10minutes.getTime() + 1000 * 60 * 10)

  const payload = {
    workspace_id,
    name,
    exp: next10minutes.getTime() / 1000,
    scopes: [
      {
        type: 'DATASOURCES:READ',
        resource: 't_9dbec3b1e5fb44999e26418aa366ba28',
        fixed_params: {
          organization_id: 'vercel.com',
        },
      },
      {
        type: 'DATASOURCES:READ',
        resource: 't_371da1d18a0345d4ac91cf1f1fc0eab5',
        fixed_params: {
          organization_id: 'vercel.com',
        },
      },
    ],
  }
  const result = jwt.sign(payload, signing_key)
  return NextResponse.json({ jwt: result })
}
