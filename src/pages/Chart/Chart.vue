<template>
  <div class="hello">
    <v-select v-model="newStrategyId" :items="strats" item-title="name"  item-value="id" label="Strategy" class="account_card__strategy" v-on:update:model-value="onUpdateStrat"/>
    <VueApexCharts type="candlestick" title="" id="basement" height="500" width="90%" :options="chartOptions" :series="data"></VueApexCharts>
    <VueApexCharts 
    v-for="series in subCharts"
    :series="series.data"  :title="series.name" height="200" width="90%" :options="subChartOptions"></VueApexCharts>
  </div>
</template>

<script lang="ts">
import { CandleRequest, CandleService, Strategy, StrategyService } from "@/api";
import { default as VueApexCharts } from 'vue3-apexcharts'
import {SubChart, ChartData, CustomTooltipParam, ChartDataItem, W} from './types'

const colors = ['#0000FF', '#00FF00', '#00FFFF', '#FF00FF', '#FFA500', '#00BFFF'];
const dateFormat = 'dd MMM HH:mm';
const tooltip = {
  enabled:true,
  shared:true,
  custom:(a : CustomTooltipParam)=>customSharedTooltip(a.series,a.seriesIndex,a.dataPointIndex,a.w),
  hideEmptySeries: false,
  onDatasetHover: {
    highlightDataSeries: true,
  },
  x: {
    show: true,
    format: dateFormat
  },
  marker: {
    show: true
  },
  fixed: {
    enabled: true,
    position: 'topLeft'
  }
}
function customSharedTooltip( series : Array<Array<number>>, seriesIndex : number, dataPointIndex : number, w : W) {
  const hoverXaxis = w.globals.seriesX[seriesIndex][dataPointIndex];
  const hoverIndexes = w.globals.seriesX.map((seriesX) => {
    return seriesX.findIndex((xData) => xData == hoverXaxis);
  });

  let hoverList = "";
  hoverIndexes.forEach((hoverIndex : number, seriesEachIndex : number) => {
    if (hoverIndex >= 0) {
      hoverList += `
        <div class="apexcharts-tooltip-series-group apexcharts-active" style="order: 1; display: flex;">
          <span class="apexcharts-tooltip-marker" style="background-color: ${
            w.globals.markers.colors[seriesEachIndex]
          };"></span>
          <div class="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
            <div class="apexcharts-tooltip-y-group">
              <span class="apexcharts-tooltip-text-y-label">${
                w.globals.seriesNames[seriesEachIndex]
              }: </span>
              <span class="apexcharts-tooltip-text-y-value">${
                w.globals.yLabelFormatters[0](series[seriesEachIndex][hoverIndex])
              }</span>
            </div>
          </div>
        </div>`;
    }
  });
  const parsed = new Date(hoverXaxis)
    .toISOString()
    .replace("T"," ")
    .slice(0, 19)
  return `<div class="apexcharts-tooltip-title" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">${
    parsed
  }</div>${hoverList}`;
}

export default {
  name: "ChartContent",
  components: {VueApexCharts},
  data() {
    return { 
      colors : colors,
      data : new Array<ChartData>(),
      subCharts : new Array<SubChart>(),
      strats : new Array<Strategy>(),
      newName : "",
      newStrategyId : 0,
      lwChart : Object,
      chartOptions: {
        fill : {
          colors: colors
        },
        chart: {
          group: 'social',          
          height: 500
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          labels: {
            minWidth: 60,
            maxWidth: 60
          }
        },
        tooltip : tooltip
      },
      subChartOptions: {
        chart: {
          group: 'social',          
          height: 10
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          labels: {
            minWidth: 60,
            maxWidth: 60
          }
        },
        tooltip: tooltip
      }
    }
  },
  mounted() {
    StrategyService.getAll().then(res => {
      this.strats = res.data; 
      this.strats.sort((x,y) => { return ( x.id == null ? -1 : (y.id == null ? 1 : (x.id > y.id ? 1 : -1 ))); });
      if (this.strats[0].id != null)
        this.newStrategyId = this.strats[0].id;
      this.onUpdateStrat();
    });
  },
  methods: {
    onUpdateStrat() {
      var ci = 0;
      var req : CandleRequest = {
        strategyId : this.newStrategyId,
        date : null,
        count : null
      }
      CandleService.get(req).then(res => {
        var newData : Array<ChartDataItem> = [];
        this.data = [];
        res.data.forEach(candle => {
          var newItem : ChartDataItem = {
            x : candle.timeStamp,
            y : [candle.open, candle.high, candle.low, candle.close]
          }
          newData.push(newItem);
        });
        this.data.push({data:newData, type: "candlestick", color:null, name: "Candle", id: this.data.length});
        res.onChart.forEach(candle => {
          if (candle.lineNames != null) {
            for(var i = 0; i < candle.lineNames.length; i++) {
              newData = [];
              candle.values.forEach(candle => {
                var newItem : ChartDataItem = {
                  x : candle.timeStamp,
                  y : candle.values[i]
                }
                newData.push(newItem);
              });
              this.data.push({data:newData, type: candle.type, name: candle.lineNames[i], color:this.colors[ci++ % this.colors.length], id: this.data.length});
            }
          } else {
            newData = [];
            candle.values.forEach(candle => {
              var newItem : ChartDataItem = {
                x : candle.timeStamp,
                y : candle.values[0]
              }
              newData.push(newItem);
            });
            this.data.push({data:newData, type: candle.type, color:this.colors[ci++ % this.colors.length], name: candle.name, id: this.data.length});
          }
        });
        this.subCharts = [];
        res.subChart.forEach(candle => {
          var subChart : SubChart = {
            name : candle.name,
            data : []
          }
          if (candle.lineNames != null) {
            newData = []
            for(var i = 0; i < candle.lineNames.length; i++) {
              newData = [];
              candle.values.forEach(candle => {
                var newItem : ChartDataItem = {
                  x : candle.timeStamp,
                  y : candle.values[i]
                }
                newData.push(newItem);
              });
              subChart.data.push({data:newData, type: candle.type, color:this.colors[i % this.colors.length], name: candle.lineNames[i], id: subChart.data.length});
            }
          } else {
            var subChart : SubChart = {
              name : candle.name,
              data : []
            }
            newData = [];
            candle.values.forEach(candle => {
              var newItem : ChartDataItem = {
                x : candle.timeStamp,
                y : candle.values[0]
              }
              newData.push(newItem);
            });
            subChart.data.push({data:newData, color:this.colors[ci++ % this.colors.length], type: candle.type, name: candle.name, id: subChart.data.length});
          }
          this.subCharts.push(subChart);
        });
      });
    }
  }
}
</script>