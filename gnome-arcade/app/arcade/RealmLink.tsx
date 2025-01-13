import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface RealmLinkProps {
  title: string
  url: string
}

export function RealmLink({ title, url }: RealmLinkProps) {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <Button variant="outline" className="w-full justify-start h-auto py-2">
        <div className="text-left">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground font-mono">
            {url}
          </p>
        </div>
      </Button>
    </Link>
  )
}
