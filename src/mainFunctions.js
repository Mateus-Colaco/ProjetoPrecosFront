import axios from 'axios';
var dbData

axios.get('https://mainbacktest.herokuapp.com/prices').then((resp)=> {dbData = resp.data})

function setPricesAndDate(returnOnlyYears=false) {

  var [objData, objName, dataFornecimento, precos, allYears] = setValsJson(dbData)
  if(!returnOnlyYears){
    let [spreadSubM, spreadFont, spreadVarejo, spreadEncargo] = setSpreads()
    precos=precos.map(x => x+spreadFont+spreadSubM+spreadVarejo+spreadEncargo)
    const results = setPrices(dataFornecimento, precos)
    return (
      [
        Object.values(results),
        Object.keys(results),
        allYears 
      ]
      )
  } else { return(allYears) }
}

function setValsJson(jsonFilePath,logins=false) {
  const data = jsonFilePath
  if (logins){
    return data
  } else {
    let objName = Object.keys(data)
    let [dataFornecimento, precos] = [data['Periodo'], data['Precos']]
    let allYears = Array.from(new Set(dataFornecimento.map(x => x.substring(0,4))))
    return [data, objName, dataFornecimento, precos, allYears]
}
}

function setPrices(dates, prices) {
  var priceObj = {}
  const yearArray = []
  const dataIni = document.getElementsByClassName('dataIni')[0].getElementsByTagName('input')[0].value
  const dataFim = document.getElementsByClassName('dataFim')[0].getElementsByTagName('input')[0].value
  const endYear = dataFim.substring(3,7)
  const endMonth = dataFim.substring(0,2)
  const startYear = dataIni.substring(3,7)
  const startMonth = dataIni.substring(0,2)
  
  for (var i in dates){
    if(!yearArray.includes(dates[i].substring(0,4))){
      if((dates[i]>= startYear) && (dates[i]<=endYear+1)){
        yearArray.push(dates[i].substring(0,4))
      }
    }
  }
  for(let dt of yearArray){
    if (parseInt(dt) <= parseInt(endYear)){
      let sum = 0;
      let count = 0;
      for(var index in dates){
        let dateToCompare = dates[index].substring(5,7) + '/01/' + dates[index].substring(0,4)
        if ((Date.parse(dateToCompare) >= Date.parse(startMonth + '/01/' + startYear)) && (Date.parse(dateToCompare) <= Date.parse(endMonth + '/01/' + endYear))){
          let yearFromdates = dates[index].substring(0,4)
          if(dt == yearFromdates){
            sum += prices[index]
            count += 1
          }
        }
      }
      priceObj[dt] = sum/count
    }
  }
  return priceObj
}

function setSpreads(){
  let spreadSubM, spreadFont, spreadEncargo, spreadVarejo
  switch(document.querySelector('[name="subM-val"]:checked').value){
    case 'seco':
      spreadSubM = 0;
      break;
    case 's':
      spreadSubM = 0;
      break;
    case 'ne':
      spreadSubM = -2;
      break;
    case 'n':
      spreadSubM = -2;
      break;
    }
  switch(document.querySelector('[name="fontRdBtn"]:checked').value){
    case 'Conv':
      spreadFont=0;
      break;
    case 'i0%':
      spreadFont=0;
      break;
    case 'i50%':
      spreadFont=44;
      break;
    case 'i100%':
      spreadFont=180
      break;
  }
  if(document.getElementById('varejoChck').value == 'vrjNotCheck'){
    spreadVarejo = 0
  } else {
    spreadVarejo = 10
  }

  if(document.getElementById('encargoChck').value == 'encNotCheck'){
    spreadEncargo = 0
  } else {
    spreadEncargo = 41.25
  }
  return [spreadSubM, spreadFont, spreadVarejo, spreadEncargo]
}

function addZero(n){
  return n.toString().length == 1 ?  n = '0' + n: n;
}

function setDataToSave(){
  let dt = new Date()
  var objToExport = {
    "usuario":document.getElementById('usernameVal').innerHTML,
    "pesquisado_dia":`${dt.getDate()}${dt.getMonth()+1}${dt.getFullYear()}`,
    "cliente":document.getElementById('nomeDoCliente').value,
    "Varejo": document.getElementById('varejoChck').value == 'vrjNotCheck' ? 'false' : 'true',
    "Encargo": document.getElementById('encargoChck').value == 'encNotCheck' ? 'false' : 'true',
    "Fonte": document.querySelector('[name="fontRdBtn"]:checked').value,
    "Submercado": document.querySelector('[name="subM-val"]:checked').value,
    'Ano':[],
    'Início do Fornecimento': [],
    'Fim do Fornecimento': [],
    'R$ por MWh': [],
    'Data Base': []
  }
  let tableCells = document.getElementById('root3').getElementsByClassName('MuiTableCell-root')
  Array.prototype.forEach.call( tableCells, (tableCell) => {
    switch (tableCell.getAttribute('name')){
      case 'Fim do Fornecimento':
        objToExport['Fim do Fornecimento'].push(tableCell.innerHTML)
        break
      case 'Início do Fornecimento':
        objToExport['Início do Fornecimento'].push(tableCell.innerHTML)
        break
      case 'R$ por MWh':
        objToExport['R$ por MWh'].push(tableCell.innerHTML)
        break
      case 'Data Base':
        objToExport['Data Base'].push(tableCell.innerHTML)
        break
      case 'Ano':
        objToExport['Ano'].push(tableCell.innerHTML)
        break
    }

  })
  return(objToExport)
}


export { setPricesAndDate, addZero,  setDataToSave }