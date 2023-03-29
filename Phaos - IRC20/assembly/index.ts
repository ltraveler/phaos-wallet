import {
  Address,  
  Context,
  Bytes,
  Balance,
  PersistentMap,  
  util,
  Host,
  models
} from "idena-sdk-as"
import { Protobuf } from 'as-proto';


export class IRC20 {
  balances: PersistentMap<Address, Balance>
  approves: PersistentMap<String, Balance>  
  claims: PersistentMap<Address, boolean>
  _name: string = "Phaos"
  _symbol: string = "PHO"
  _decimals: u8 = 18
  _totalSupply: Balance

  constructor() {
    this.balances = PersistentMap.withStringPrefix<Address, Balance>("b:")
    this.approves = PersistentMap.withStringPrefix<string, Balance>("a:")
    this.claims = PersistentMap.withStringPrefix<Address, boolean>("c:")
    this._totalSupply = Balance.from(0)
  }

  @view
  getBalance(owner: Address): Balance {
    return this.balances.get(owner, Balance.from(0))
  }

  transfer(to: Address, amount: Balance): void {
    let sender = Context.caller()
    const fromAmount = this.getBalance(sender)
    util.assert(fromAmount >= amount, "not enough tokens on account")
    this.balances.set(sender, fromAmount - amount)
    let destBalance = this.getBalance(to)
    this.balances.set(to, destBalance + amount)
    this.emitTransferEvent(sender, to, amount)
  }

  approve(spender: Address, amount: Balance): void {
    let sender = Context.caller()    
    this.approves.set(sender.toHex() + ":" + spender.toHex(), amount)
    this.emitApprovalEvent(sender, spender, amount)
  }

  @view
  allowance(tokenOwner: Address, spender: Address): Balance {
    const key = tokenOwner.toHex() + ":" + spender.toHex()
    return this.approves.get(key, Balance.from(0))
  }
  @view 
  totalSupply(): Balance {
    return this._totalSupply
  }
  @view
  name(): string {
    return this._name
  }
  @view
  symbol(): string {
    return this._symbol
  }
  @view
  decimals(): u8 {
    return this._decimals
  }

  transferFrom(from: Address, to: Address, amount: Balance): void {
    let caller = Context.caller()

    const fromAmount = this.getBalance(from)
    util.assert(fromAmount >= amount, "not enough tokens on account")
    const approvedAmount = this.allowance(from, caller)
    util.assert(
      amount <= approvedAmount,
      "not enough tokens approved to transfer"
    )
    
    this.approves.set(from.toHex() + ":" + caller.toHex(), approvedAmount - amount)
    this.balances.set(from, fromAmount - amount)
    let destBalance = this.getBalance(to)
    this.balances.set(to, destBalance + amount)
    this.emitTransferEvent(from, to, amount)
  }
  
  @mutateState
  claim(): void{
    let caller = Context.caller()
    Host.createGetIdentityPromise(caller, 100000).then("_claim", [], Balance.from(0), 3000000)
  }

  _claim(): void{
    let caller = Context.originalCaller()
    util.assert(Context.epoch() <= 108, "Tokens can no longer be claimed")
    util.assert(this.claims.get(caller, false) == false, "Tokens already claimed")
    let identityData = Host.promiseResult().value()
    let identity = Protobuf.decode<models.ProtoStateIdentity>(identityData, models.ProtoStateIdentity.decode)
    util.assert(identity.state >= 3 && identity.state <= 8 && identity.state != 5, "Tokens can only be claimed by validated identities")
    let age = Context.epoch() - identity.birthday
    //let age = 6 //-- set age manually and comment identity state check for running tests
    util.assert(age>=6, "Age below 6")
    this.claims.set(caller,true)
    let amount = Balance.from(100) - Balance.from(500)/Balance.from(age)
    amount = amount * Balance.from(1000000000000000000)
    this.balances.set(caller, amount)
    this._totalSupply += amount
    Host.emitEvent("claim", [caller, Bytes.fromBytes(amount.toBytes())])
  }

  private emitTransferEvent(from: Address, to: Address, amount: Balance): void {
    Host.emitEvent("transfer", [
      from,
      to,
      Bytes.fromBytes(amount.toBytes()),
    ])
  }

  private emitApprovalEvent(owner: Address, spender: Address, amount: Balance): void{
    Host.emitEvent("approval", [
      owner,
      spender,
      Bytes.fromBytes(amount.toBytes())
    ])
  }
}