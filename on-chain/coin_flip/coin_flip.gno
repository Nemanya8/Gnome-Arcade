package coin_flip

import (
	"std"
	"strings"
	"math/rand"
	"gno.land/p/demo/entropy"
	"gno.land/p/demo/users"
    "gno.land/p/demo/ownable"

	"gno.land/r/gnome_arcade/gbuck"
)

var ( 
	seed       = uint64(entropy.New().Seed())
	r          = rand.New(rand.NewPCG(seed, 0xdeadbeef))

    Ownable    = ownable.NewWithAddress("g1znmyjuduhhactgzeew5ea26z5wzlt6jyc89k5u")
)

func init() {
	// Initialization logic if necessary
}

func Toss(guess string, betAmount uint64) string {
    if strings.ToLower(guess) != "heads" && strings.ToLower(guess) != "tails" {
        panic("Invalid guess. Please guess either 'heads' or 'tails'")
    }

    caller := std.PrevRealm().Addr()
    gbuck.PlaceWager(users.AddressOrName(caller.String()), betAmount)

    result := r.IntN(2)

    if result == 0 && strings.ToLower(guess) == "tails" {
        return "It's heads! You lose!"
    }
    if result == 1 && strings.ToLower(guess) == "heads" {
        return "It's tails! You lose!"
    }

    gbuck.TakeWin(users.AddressOrName(caller.String()), betAmount * 2)
    return "You win!"
}

func GetRealmAddress() string {
    return std.CurrentRealm().Addr().String()
}

func Render(path string) string {
    return "Coin Flip"
}
