'use client'

import jwt from 'jsonwebtoken'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  workspace_id: z.string().min(1, 'Field is required'),
  signing_key: z.string().min(1, 'Field is required'),
  name: z.string().min(1, 'Field is required'),
})

export function JwtForm({ onSubmit }: { onSubmit: (jwt: string) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      signing_key: '',
      workspace_id: '',
    },
  })

  function generateJwt(values: z.infer<typeof formSchema>) {
    const { workspace_id, signing_key, name } = values

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
    onSubmit(result)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(generateJwt)}
        className="space-y-4 w-full"
      >
        <FormField
          control={form.control}
          name="workspace_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="signing_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Signing key</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
