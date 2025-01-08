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
	arcadeAdmin std.Address
	Ownable = ownable.NewWithAddress(arcadeAdmin)
	seed = uint64(entropy.New().Seed())
	r = rand.New(rand.NewPCG(seed, 0xdeadbeef))
)

func init() {
	arcadeAdmin = "g1znmyjuduhhactgzeew5ea26z5wzlt6jyc89k5u"
}

func Toss(guess string, betAmount uint64) string {
    if strings.ToLower(guess) != "heads" && strings.ToLower(guess) != "tails" {
        panic("Invalid guess. Please guess either 'heads' or 'tails'")
    }

    caller := std.PrevRealm().Addr()
    if gbuck.BalanceOf(users.AddressOrName(caller.String())) < betAmount {
        panic("Insufficient balance to place the bet")
    }

    gbuck.TransferFrom(users.AddressOrName(caller.String()), users.AddressOrName(arcadeAdmin), betAmount)

    result := r.IntN(2)

    if result == 0 && strings.ToLower(guess) == "tails" {
        return "It's heads! You lose!"
    }

    if result == 1 && strings.ToLower(guess) == "heads" {
        return "It's tails! You lose!"
    }

    gbuck.Transfer(users.AddressOrName(caller.String()), betAmount*2)
    return "You win!"
}
