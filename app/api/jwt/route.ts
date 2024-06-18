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
        resource: 'ea47fd9d-bc48-420d-a6f6-95481fbb3f7c',
        fixed_params: {
          org_id: 'vercel',
        },
      },
    ],
  }
  const result = jwt.sign(payload, signing_key)
  return NextResponse.json({ jwt: result })
}
