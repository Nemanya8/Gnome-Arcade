import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface GameCardProps {
  title: string
  description: string
  imageSrc: string
  slug: string
}

export function GameCard({ title, description, imageSrc, slug }: GameCardProps) {
  const router = useRouter()

  return (
    <Card className="w-full max-w-[250px] flex flex-col">
      <CardHeader className="p-0">
        <div className="w-full h-32 relative">
          <Image
            src={imageSrc}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="mt-2 text-sm line-clamp-3">{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4">
        <Button 
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold" 
          onClick={() => router.push(`/arcade/${slug}`)}
        >
          Play
        </Button>
      </CardFooter>
    </Card>
  )
}

