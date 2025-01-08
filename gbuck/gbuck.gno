package gbuck

import (
	"std"
	"strings"

	"gno.land/p/demo/grc/grc20"
	"gno.land/p/demo/ownable"
	"gno.land/p/demo/ufmt"
	pusers "gno.land/p/demo/users"
	"gno.land/r/demo/grc20reg"
	"gno.land/r/demo/users"
)

var (
	Token, privateLedger = grc20.NewToken("Gnome Arcade Bucks", "gbuck", 0)
	UserTeller           = Token.CallerTeller()
	Ownable              = ownable.NewWithAddress("g1znmyjuduhhactgzeew5ea26z5wzlt6jyc89k5u") // Arcade admin
)

func init() {
	privateLedger.Mint(Ownable.Owner(), 1_000_000)
	grc20reg.Register(Token.Getter(), "")
}

func TotalSupply() uint64 {
	return UserTeller.TotalSupply()
}

func BalanceOf(owner pusers.AddressOrName) uint64 {
	ownerAddr := users.Resolve(owner)
	return UserTeller.BalanceOf(ownerAddr)
}

func Transfer(to pusers.AddressOrName, amount uint64) {
	toAddr := users.Resolve(to)
	checkErr(UserTeller.Transfer(toAddr, amount))
}

func ApproveArcade(amount uint64) {
	checkErr(UserTeller.Approve(Ownable.Owner(), amount))
}

func TransferFrom(from, to pusers.AddressOrName, amount uint64) {
	fromAddr := users.Resolve(from)
	toAddr := users.Resolve(to)
	checkErr(UserTeller.TransferFrom(fromAddr, toAddr, amount))
}

func Allowance(owner, spender pusers.AddressOrName) uint64 {
	ownerAddr := users.Resolve(owner)
	spenderAddr := users.Resolve(spender)
	return UserTeller.Allowance(ownerAddr, spenderAddr)
}

func Faucet() {
	caller := std.PrevRealm().Addr()
	amount := uint64(10)
	checkErr(privateLedger.Mint(caller, amount))
}

func Mint(to pusers.AddressOrName, amount uint64) {
	Ownable.AssertCallerIsOwner()
	toAddr := users.Resolve(to)
	checkErr(privateLedger.Mint(toAddr, amount))
}

func Burn(from pusers.AddressOrName, amount uint64) {
	Ownable.AssertCallerIsOwner()
	fromAddr := users.Resolve(from)
	checkErr(privateLedger.Burn(fromAddr, amount))
}

func Render(path string) string {
	parts := strings.Split(path, "/")
	c := len(parts)

	switch {
	case path == "":
		return Token.RenderHome()
	case c == 2 && parts[0] == "balance":
		owner := pusers.AddressOrName(parts[1])
		ownerAddr := users.Resolve(owner)
		balance := UserTeller.BalanceOf(ownerAddr)
		return ufmt.Sprintf("%d\n", balance)
	default:
		return "404\n"
	}
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
