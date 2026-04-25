 const balanceAmt = document.getElementById("balance")
 const scoreboard = document.querySelector("#score")
class Score{

  constructor(initialGains, initialBalance, betAmount){
    this.totalGain = initialGains;
    this.recentGains = 0;
    this.betAmount = betAmount; 
    this.balance = initialBalance;
   

  }



calculateJackpot(isJackpot,betAmount, multiplier) {

  if(isJackpot){
    this.totalGain += betAmount * multiplier
    this.recentGains = betAmount * multiplier
  }

  scoreboard.innerText = `${this.totalGain}`

}


spendBalance(balance, betAmount, spinCost) {
  let newBalance = (balance - betAmount) - spinCost

  this.balance = newBalance

  balanceAmt.innerText = `${this.balance}`

}


addBalance(){
if(this.totalGain >= 100){
this.totalGain -= 100 
this.balance += 100

balanceAmt.innerText = `${this.balance}`
scoreboard.innerText = `${this.totalGain}`

}else{alert("You have no gains to withdraw")}

}

}