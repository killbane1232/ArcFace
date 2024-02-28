<template>
  <div class="hello">
    <v-select v-model="newStrategyId" :items="strats" item-title="name"  item-value="id" label="Strategy" class="account_card__strategy" v-on:update:model-value="onUpdateStrat"/>
    <VueApexCharts type="candlestick" title="" id="basement" height="500" width="90%" :options="chartOptions" :series="data"></VueApexCharts>
    <VueApexCharts 
    v-for="series in subCharts"
    :series="series.data"  :title="series.name" height="200" width="90%" :options="subChartOptions"></VueApexCharts>
    <!--div class="footer">
      <v-text-field class="add" v-model="newName" label="Создать новую стратегию"/>
      <v-btn class="button" v-on:click.native="add()"> Add </v-btn>
      <v-btn class="button" v-on:click.native="refresh()"> Refresh </v-btn>
    </div-->
  </div>
</template>

<script lang="ts">
import { CandleRequest, CandleService, Strategy, StrategyService } from "@/api";
import { default as VueApexCharts } from 'vue3-apexcharts'
interface subChart {
  name: string,
  data : Array<ChartData>
}
interface ChartData {
  type : String,
  name : String,
  color : string | null,
  id : number,
  data : Array<ChartDataItem>
}
interface ChartDataItem {
  x : Date | number,
  y : number | Array<number>
}
interface W {
  globals : globaly
}
interface globaly {
  seriesX : Array<Array<string | number | Date >>,
    markers : marker,
    seriesNames: Array<String>,
      yLabelFormatters: Array<Function>
}
interface marker {
  colors : Array<String>
}
interface FUCKOBJECT {
  series : Array<Array<Number>>,
  seriesIndex : Number, 
  dataPointIndex : Number, 
  w : W
}
export default {
  name: "ChartContent",
  components: {VueApexCharts},
  data() {
    return { 
      colors : ['#0000FF', '#00FF00', '#00FFFF', '#FF00FF', '#FFA500', '#00BFFF'],
      data : new Array<ChartData>(),
      subCharts : new Array<subChart>(),
      strats : new Array<Strategy>(),
      newName : "",
      newStrategyId : 0,
      lwChart : Object,
      chartOptions: {
        fill : {
          colors:['#0000FF', '#00FF00', '#00FFFF', '#FF00FF', '#FFA500', '#00BFFF']
        },
        chart: {
          group: 'social',          
          height: 500
        },
        xaxis: {
          type: 'datetime'
        },
        tooltip : {
          enabled:true,
          shared:true,
          custom:(a : FUCKOBJECT)=>this.customSharedTooltip(a.series,a.seriesIndex,a.dataPointIndex,a.w),
          hideEmptySeries: false,
          onDatasetHover: {
              highlightDataSeries: true,
          },
          x: {
            show: true,
            format: 'dd MMM hh:mm'
          },
          marker: {
            show: true
          }
        }
      },
      subChartOptions: {
        chart: {
          group: 'social',          
          height: 10
        },
        xaxis: {
          type: 'datetime'
        },
        tooltip : {
          enabled:true,
          shared:true,
          custom:(a : FUCKOBJECT)=>this.customSharedTooltip(a.series,a.seriesIndex,a.dataPointIndex,a.w),
          hideEmptySeries: false,
          onDatasetHover: {
              highlightDataSeries: true,
          },
          x: {
            show: true,
            format: 'dd MMM hh:mm'
          },
          marker: {
            show: true
          }
        }
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
    customSharedTooltip( series : Array<Array<Number>>, seriesIndex : number, dataPointIndex : number, w : W) {
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
                                    <span class="apexcharts-tooltip-text-y-value">${w.globals.yLabelFormatters[0](
                                        series[seriesEachIndex][hoverIndex]
                                    )}</span>
                                </div>
                            </div>
                        </div>`;
                }
            });
            const parsed = new Date(hoverXaxis)
                .toDateString()
                .split(" ")
                .slice(1);
            return `<div class="apexcharts-tooltip-title" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">${
                parsed[1] + " " + parsed[0] + " " + parsed[2]
            }</div>${hoverList}`;
        },
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
          var subChart : subChart = {
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
            var subChart : subChart = {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer{
  display: flex;
  align-items: center;
}
.add {
  width: 60%;
  margin:0px 2px;
  flex: 0 0 49%;
}
.button {
  margin:0px 2px;
  padding:10px 0;
  flex: 0 0 24.5%;
}
</style>
