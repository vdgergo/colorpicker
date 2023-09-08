// 0. Változókat deklarálni
const inputForm = document.getElementById("selector")
const selectorPicker = document.getElementById("selector__picker")
const selectorType = document.getElementById("selector__type")
const colorViewContainerEl = document.getElementById("color-view-container")
const colorNameContainerEl = document.getElementById("color-name-container") 

let colorWheel = []

// 1. Kinyerni az inputból a bemenő adatokat
inputForm.addEventListener("submit",function(event){
  event.preventDefault()
  const selectedColor = selectorPicker.value.substring(1)
  const selectedType = selectorType.value
  getColorWheel(selectedColor, selectedType)
})

// 2 Bemenő adatokat beadni az api kérésbe és visszaadni a színeket
function getColorWheel(hex,mode,count=5){
  colorWheel = []
  const baseURL = "https://www.thecolorapi.com"
  const schemeURL = `/scheme?hex=${hex}&mode=${mode}&count=${count}`

  fetch(baseURL + schemeURL).
    then(response => response.json()).
      then(data => {
        data.colors.forEach(element => {
          colorWheel.push(element["hex"]["value"])
        })
        renderColorScheme()
      })
}

// 3 Eredménnyel frissíteni az oldalt.
function renderColorScheme(){ 
  for (let i=0; i < colorNameContainerEl.children.length; i++){
    colorNameContainerEl.children[i].innerText = colorWheel[i],
    console.log(colorWheel[i])
  }
  for (let i=0; i < colorViewContainerEl.children.length; i++){
    colorViewContainerEl.children[i].style.backgroundColor = colorWheel[i],
    console.log(colorWheel[i])
  }

}



