export function JwtResult({ jwt }: { jwt: string | null }) {
  return (
    <div className="relative rounded font-mono text-sm p-4 bg-foreground text-primary-foreground w-full h-[400px]">
      <pre>{jwt ? JSON.stringify(jwt, null, 2) : 'No JWT'}</pre>
    </div>
  )
}
