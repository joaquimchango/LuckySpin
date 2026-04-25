/* Main function that initalize once DOm is loaded  */
window.onload = function(){
  
  /* First function to initialize slots random symbols and then start the game screen  */
  const startButton = document.getElementById("start-game-btn")
  const spinSlotsButton = document.querySelector("#spin-btn") 
  /* const endGameButton  */
  const playAgain = document.getElementById("play-again-btn")
  const exitGame = document.getElementById("exit-btn")
  const retryBtn = document.getElementById("retry-btn")
  
  /* The quantity seletor with the bet amount  */
  const selector =  document.getElementById("bet-amount");
  const increment = document.getElementById("increment")
  const decrement = document.getElementById("decrement")
  const balanceAmt = document.getElementById("balance")
 const buySpins = document.getElementById("buy-spins-btn")
  const recentGains = document.querySelector("#gains")
  const spinsLeft = document.getElementById("spins-left")
  const topNav = document.querySelector("#top-nav")
  
game = new Game()
score = new Score(0, 1000, 100)


selector.innerText = `${score.betAmount}`
selector.setAttribute("value", `${score.betAmount}`)
balanceAmt.innerText = `${score.balance}`

startButton.addEventListener("click", ()=>{


topNav.style.display = "flex"
game.startGame()

})


spinSlotsButton.addEventListener("click", ()=>{

if (spinSlotsButton.classList.contains("stop")){
spinSlotsButton.disabled = true
 setTimeout(() => {
  spinSlotsButton.disabled = false
 }, 2000);

game.stopSpinning()
spinSlotsButton.classList.remove("stop")
spinSlotsButton.innerText = "SPIN"


console.log("sets:",game.randomSets)

let won = game.checkWonJackpot(game.randomSets)
console.log(won)
if (won === true ){

setTimeout(() =>{
 
  confetti()


  score.totalGain += score.betAmount
  game.scoreboard.innerText = `$${score.totalGain}`
  

  score.calculateJackpot(true, score.betAmount, 10)
  score.addBalance()
  recentGains.innerText = `+${score.recentGains}$`

}, 2000);



}else if (won === false && score.balance < score.betAmount + 100){
game.gameOver()
spinsLeft.innerText = `${game.numberOfSpins}`
retryBtn.innerText = `Try again (X${game.numberOfSpins} left)`

}



}else {


game.reinitSlots()
game.setSlots(["images/bar.png","images/casino_royale.png","images/roi_trefle.png","images/sept.png","images/bell.png"])  
score.spendBalance(score.balance, score.betAmount, 100)

game.startSpinning()
spinSlotsButton.classList.add("stop")
spinSlotsButton.innerText = "STOP"}


})


increment.addEventListener("click", ()=>{
if (score.balance > score.betAmount+100){score.betAmount += 100
selector.innerText = `${score.betAmount}`
selector.setAttribute("value", `${score.betAmount}`) }
else{ alert("Minimum balance is 100$") }
})

decrement.addEventListener("click", ()=>{
  
  if (score.betAmount > 10){score.betAmount -= 100
  selector.innerText = `${score.betAmount}`
  selector.setAttribute("value", `${score.betAmount}`) }

})


buySpins.addEventListener("click", ()=>{

score.addBalance()

})


retryBtn.addEventListener("click", ()=>{

/* game.resetGame() */

score = new Score(0, 1000, 100)
game.resetGame()
spinsLeft.innerText = `${game.numberOfSpins}`
selector.innerText = `${score.betAmount}`
selector.setAttribute("value", `${score.betAmount}`)
balanceAmt.innerText = `${score.balance}`
if (game.numberOfSpins === 0)retryBtn.disabled = true 
})


exitGame.addEventListener("click", ()=>{
  game.endGame(score.totalGain)
})

playAgain.addEventListener("click", ()=>{

 location.reload()
})




}

