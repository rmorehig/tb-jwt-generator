export function JwtResult({ data }: { data?: object }) {
  return (
    <div className="relative rounded font-mono text-sm p-4 bg-foreground text-primary-foreground w-full h-[400px]">
      <pre>{data ? JSON.stringify(data, null, 2) : 'No data'}</pre>
    </div>
  )
}
