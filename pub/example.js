/* JS Library usage examples */
"use strict";

//first example
//data
const events1 = [
  {year: '2011',name: "Community", description: "Raise 10000k for youth during this year."}, 
  {year: '2017',name:'BreakThrough', description:"nothing"}, 
  {year: '2020',name:"Environment",description:"Help the planet by planting 10000 trees"}
]
//code
const h1 = new History(2010, 2023, 800, 500, '.featureOneExample',"vertical", 'both')
h1.createNonAnimatedClickHistory(true, events1, 50)

//second example
//data
const events2 = [
  {year: '2011',name: "mile", description: null}, 
  {year: '2017',name:'BreakThrough', description:"Research breakthrough, found cure for everything"}, 
  {year: '2020',name:"GiveBack",description:"Give back the community by doing events"}
]
//code
const h2 = new History(2010, 2023, 800, 300, '.featureTwoExample',"horizontal", 'up')
h2.createNonAnimatedNonClickHistory(true, events2, 60)

//third example
//data
const events3 = [
  {year: '2005',name: "First Merger", description: "Fail"}, 
  {year: '2007',name:'Second Merger', description:"Succesfully merge 10B"}, 
  {year: '2010',name:"Expand",description:"Company expand, opening at 10 more locations"},
  {year: '2016',name:'Close', description:"Company closed"},
]
//code
const h3 = new History(2000, 2019, 800, 800, '.featureThreeExample', "vertical", 'left')
h3.createAnimatedClickHistory(true, events3, 70)

//fourth example
//data
const events4 = [
  {year: '1000',name: "Weapon breakthrough", description: "Found Stone to be a lethal weapon."}, 
  {year: '1001',name:'Currency', description:"Using seashell as a major currency."}
]
//code
const h4 = new History(1000, 1001, 800, 1000, '.featureFourExample', "horizontal", 'down')
h4.createAnimatedNonClickHistory(true, events4, 100)

//fifth
//data
const firstStep = document.createElementNS("http://www.w3.org/1999/xhtml",'div')
const firstStepHeader = document.createElementNS("http://www.w3.org/1999/xhtml",'h3')
firstStepHeader.textContent = 'Fill out your personal information'
const firstStepform = document.createElementNS("http://www.w3.org/1999/xhtml",'form')
firstStepform.setAttribute('class', 'firstPageForm')
const firstInput = document.createElementNS("http://www.w3.org/1999/xhtml",'input')
firstInput.setAttribute('placeholder', 'First Name')
const secondInput = document.createElementNS("http://www.w3.org/1999/xhtml",'input')
secondInput.setAttribute('placeholder', 'Last Name')
const submitButton = document.createElementNS("http://www.w3.org/1999/xhtml",'button')
submitButton.textContent = 'Enter'
firstStepform.appendChild(firstInput)
firstStepform.appendChild(secondInput)
firstStepform.appendChild(submitButton)
firstStepform.addEventListener('submit', (e)=>{
    e.preventDefault() 
    alert('First Name:' + firstInput.value + " Last Name:" + secondInput.value)
})
firstStep.appendChild(firstStepHeader)
firstStep.appendChild(firstStepform)


const secondStep = document.createElementNS("http://www.w3.org/1999/xhtml",'div')
const secondStepHeader = document.createElementNS("http://www.w3.org/1999/xhtml",'h3')
secondStepHeader.textContent = "Read and Click to agree the terms and services agreement"
const secondStepContent = document.createElementNS("http://www.w3.org/1999/xhtml",'div')
secondStepContent.textContent = "This Agreement is governed by and will be construed in" + 
  "accordance with the laws of the State of (your state), and the courts of (your state)" +
  "shall be the exclusive forum"
const secondStepButton = document.createElementNS("http://www.w3.org/1999/xhtml",'input')
secondStepButton.setAttribute('type', 'checkbox')
secondStep.appendChild(secondStepHeader)
secondStep.appendChild(secondStepContent)
secondStep.appendChild(secondStepButton)
const thirStep = '<div xmlns="http://www.w3.org/1999/xhtml">You have completed</div>'
const l = [firstStep, secondStep, thirStep]
//code
const h5 = new History(2010, 2023, 800, 500, '.featureFiveExample', 'vertical', 'left')
h5.createStep(3, l)


//sixth example
const sideScroll = new History(0, 1000, 180, 500, '.scroll',"vertical", 'left')
sideScroll.createScroll(7, ['#createObject', '#featureOne', '#featureTwo', "#featureThree", "#featureFour", "#featureFive", "#featureSix"])


// const backButton = document.querySelectorAll(".Back")
// backButton.addEventListener("click", (e) => {

// })