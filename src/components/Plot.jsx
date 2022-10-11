import dayjs from 'dayjs';
import React from 'react';
import '../styles/plot.css'
import Plot from 'react-plotly.js';
import { addZero } from '../mainFunctions'

const todayFullDate = new Date()

var diasOp = ['sab', 'dom', 'seg', 'ter', 'qua', 'qui', 'sex']
var dias = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']
var hoje = new Date()
var hoje_dia = dias[hoje.getDay()]
const dayIni = todayFullDate.getDate() - diasOp.indexOf(hoje_dia)
const iniDate = addZero(dayIni.toString()) + '/' + addZero((todayFullDate.getMonth()+1).toString()) + '/' + todayFullDate.getFullYear().toString()
const finalFullDate = dayjs(addZero((todayFullDate.getMonth()+1)) + '-' + addZero((dayIni)) + '-' + todayFullDate.getFullYear()).add(6,'day')
const finalDate = finalFullDate.format('DD/MM/YYYY')
export function AppPlot(props){
  const [prices, periodo] = props.data
  const layoutBar = {
  font:{family: 'Roboto', size:14},
  title:{text:`Preços de ${periodo[0]} a ${periodo.at(-1)}`, font:{color:'#626262', size:24, family: "Roboto Medium"}},
  annotations:[{text:`*Preços válidos de ${iniDate} à ${finalDate}`, xref: 'paper', yref:'paper', y:-0.25, x:0.5, showarrow:false}],
  showlegend: false,yaxis: { visible:false, rangemode: 'tozero', zeroline: false, showgrid: false, tickline: false },xaxis: { zeroline: false, showgrid: false, tickangle: -90, autotick: false }, plot_bgcolor:"transparent", paper_bgcolor:"transparent" }
  var dataID = document.getElementById('nomeDoCliente').value + (document.getElementById('varejoChck').value == 'vrjNotCheck' ? '' : '_Varejista') + (document.getElementById('encargoChck').value == 'encNotCheck' ? '' : '_Encargos') + '_' +  document.querySelector('[name="fontRdBtn"]:checked').value + '_' + document.querySelector('[name="subM-val"]:checked').value
  return (
    <Plot divId={dataID}
      data={[
        { x: periodo.map(x => x.toString()),
          y: prices.map( y => (y)),
          type: 'bar',
          marker: {color: '#00837b'},
          text: prices.map(x => ' R$ ' + parseFloat(x).toFixed(2).toString() + ' ')
        }
      ]}
      layout={ layoutBar }
      style={{border: '2.25px solid rgba(51,51,51,0.1)', borderRadius:'35px', boxShadow:window.innerWidth>600 ? boxS : '', width: "100%", height: "100%"}}
      useResizeHandler

    />
  );

}

// export default AppPlot