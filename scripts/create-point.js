function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    })
}

populateUfs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    
    
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => { 
        
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        } 
        citySelect.disabled = false  
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) 

const itemsToCollect = document.querySelectorAll(".items-grid li")
for(const items of itemsToCollect){
    items.addEventListener("click", handleSelectedItem)
}
let selectedItems = [];
function handleSelectedItem(event){
    const itemLi = event.target
    //Adcionando ou remevendo uma classe em JavaScript.
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    //Verificar se existem itens selecionados, se sim
    //pegar os itens selecionados.
    const alreadySelected = selectedItems.findIndex( item => {
        const itemsFound = item === itemId // Retorna true ou false.
        return itemsFound
    })
    //Se estiver selecionado, tirar da versão.
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => {
            const itemsIdDifferent = item != itemId // false
            return itemsIdDifferent
        })
    }
    // Se não tiver selecioando, adicionar a seleção.
    //Atualizar os campos escondidos com os itens selecionados.
}