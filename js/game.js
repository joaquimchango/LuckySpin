class Game{
constructor(){
this.startScreen = document.getElementById('game-intro')
this.gameScreen = document.getElementById('game-screen')
this.gameEndScreen = document.getElementById('game-end-screen')
this.gameContainer = document.querySelector("#game-container")
this.overlayScreen = document.getElementById("overlay")
this.scoreboard = document.querySelector("#score")
this.gainsContainer = document.querySelector("#gains")
this.machineSlots = document.querySelectorAll(".slots")
this.spinSlotsButton = document.querySelector("#spin-btn")
this.finalScore = document.getElementById("winning-amount") 

this.randomSets = []
this.score = 0
this.numberOfSpins = 3

}

startGame(){
  this.startScreen.style.display = "none"
  this.gameScreen.style.display = "flex"
  this.scoreboard.innerText = `${this.score}`
   
}


randomizeSlots(array){
const symbols = array.reduce((acc, curr)=> {
 
  const random = Math.floor(Math.random() * (acc.length + 1))
 acc.splice(random,0,curr)

 return acc
 }, [])

 console.log(symbols)
 return symbols

}



setSlots(array){
  
this.machineSlots.forEach((slot)=>{
let images = this.randomizeSlots(array)
slot.innerHTML = ""
console.log(images)
this.randomSets.push(images)
images.forEach((img)=>{
const addImage = document.createElement("img")

addImage.classList.add("symbol")
addImage.setAttribute("src",img)
slot.append(addImage)
})

})
}


startSpinning(){
  
  this.machineSlots.forEach((slot)=>{
  slot.classList.add('spin')


  })  



}


stopSmoothly(wheel) {
  const image = document.querySelectorAll(".symbol")
  
  wheel.style.transform = `translateY(0px)`;
  wheel.classList.remove('spin');

  
}


stopSpinning(){

this.machineSlots.forEach((wheel,i)=>{

 setTimeout(() => {
    this.stopSmoothly(wheel);
  }, 1000 * i);
  })

  
}


checkWonJackpot(randomSets){
  
 let winCombination =  randomSets.map((set)=>{

let middle = Math.floor(set.length/2)  

return set[middle]
})

return winCombination.reduce((a,curr)=> a === curr? a : null ) !== null

}

reinitSlots(){
 
  this.randomSets = []
}


resetGame(){

if (this.numberOfSpins > 0){this.overlayScreen.style.display = "none"
this.startGame()
this.numberOfSpins --}


}

gameOver(){

 setTimeout(() => {
  this.overlayScreen.style.display = "block"
   this.overlayScreen.classList.add("active")
  

 }, 2000); 

 setTimeout(() => {
   let text = document.querySelector("#overlay>.title")
   text.classList.add("animated-text")
 }, 2100);
 


}


endGame(score ){
  this.gameScreen.style.display = "none"
  this.gameEndScreen.style.display = "flex"
  this.finalScore.innerText = `${score}`

  setTimeout(() => {
    const title = document.querySelector("#game-end-screen>.title")
    title.classList.add("animated-text")
  }, 100);
}

}