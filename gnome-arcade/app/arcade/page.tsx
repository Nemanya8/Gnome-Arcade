'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from '@/contexts/WalletContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { GameCard } from './GameCard'
import { RealmLink } from './RealmLink'

const GAMES_PER_PAGE = 6

const dummyGames = [
  { title: "Coin Flip", description: "Test your luck with a simple coin flip game!", imageSrc: "/cointoss.png", slug: "coinflip" },
  { title: "Dice Roll", description: "Roll the dice and see what fate has in store!", imageSrc: "/cointoss.png", slug: "diceroll" },
  { title: "Slot Machine", description: "Spin the reels and hit the jackpot!", imageSrc: "/cointoss.png", slug: "slotmachine" },
  { title: "Blackjack", description: "Beat the dealer in this classic card game!", imageSrc: "/cointoss.png", slug: "blackjack" },
  { title: "Roulette", description: "Place your bets and watch the wheel spin!", imageSrc: "/cointoss.png", slug: "roulette" },
  { title: "Poker", description: "Bluff your way to victory in Texas Hold'em!", imageSrc: "/cointoss.png", slug: "poker" },
  { title: "Baccarat", description: "Predict the winning hand in this elegant game!", imageSrc: "/cointoss.png", slug: "baccarat" },
]

export default function Arcade() {
  const { isConnected, connect } = useWallet()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const checkConnection = async () => {
      if (!isConnected) {
        const connected = await connect()
        if (!connected) {
          router.push('/')
        }
      }
      setIsLoading(false)
    }

    checkConnection()
  }, [isConnected, connect, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isConnected) {
    return null
  }

  const filteredGames = dummyGames.filter(game => 
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredGames.length / GAMES_PER_PAGE)
  const gamesForCurrentPage = filteredGames.slice((currentPage - 1) * GAMES_PER_PAGE, currentPage * GAMES_PER_PAGE)

  return (
    <div className="container mx-auto p-6 min-h-[calc(100vh-4.5rem)] flex flex-col">
      <div className="flex gap-6 flex-grow">
        <div className="w-[70%] flex flex-col">
          <Card className="flex-grow flex flex-col">
            <CardHeader className="flex-shrink-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-3xl font-bold">Games</CardTitle>
                <Input
                  type="search"
                  placeholder="Search games..."
                  className="max-w-sm text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Separator className="my-2" />
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
                {gamesForCurrentPage.map((game, index) => (
                  <GameCard key={index} {...game} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <Button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
                  >
                    Previous
                  </Button>
                  <span className="text-sm font-bold">
                    {currentPage} of {totalPages}
                  </span>
                  <Button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
                  >
                    Next
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="w-[30%] flex flex-col">
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Realms</CardTitle>
              <Separator className="my-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <RealmLink 
                  title="Coin Flip" 
                  url="https://gno.land/r/gnome_arcade/coin_flip" 
                />
                <RealmLink 
                  title="GBuck" 
                  url="https://gno.land/r/gnome_arcade/gbuck" 
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
