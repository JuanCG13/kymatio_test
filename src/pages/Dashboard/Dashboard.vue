<template v-if="ready">
  <div class="dashboard-page">

    <template v-for="alert in alerts" >
      <div :key="alert.type" class="alert" :class="`alert-${alert.type}`" role="alert">
        ALERT: {{alert.text}}
      </div>
    </template>

    <h1 class="page-title">Dashboard</h1>
    
    <b-row>
      <b-col md="6" xl="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Visits Today" >
            <div class="d-flex justify-content-between align-items-center mb-lg">
              <h2>4,332</h2>
              <i class="la la-arrow-right text-primary la-lg rotate-315" />
            </div>
            <div class="d-flex flex-wrap justify-content-between">
              <div class="mt">
                <h6>+830</h6><p class="text-muted mb-0 mr"><small>Logins</small></p>
              </div>
              <div class="mt">
                <h6>0.5%</h6><p class="text-muted mb-0"><small>Sign Out</small></p>
              </div>
              <div class="mt">
                <h6>4.5%</h6><p class="text-muted mb-0 mr"><small>Rate</small></p>
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
      <b-col md="6" xl="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Evolution">
            <highcharts :options="donut"></highcharts>
          </Widget>
        </div>
      </b-col>
      <b-col md="6" xl="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="App Perfomance" >
            <p class="text-muted d-flex flex-wrap">
              <small class="mr-lg d-flex align-items-center">
                <span class="circle bg-danger text-danger mr-xs" style="font-size: 4px;">
                  .
                </span>
                  This Period
              </small>
              <small class="mr-lg d-flex align-items-center">
                <span class="circle bg-primary text-primary mr-xs" style="font-size: 4px;">
                  .
                </span>
                Last Period
              </small>
            </p>
            <h6>SDK</h6>
            <b-progress class="mb-xs" style="height: 5px"
              variant="danger" :value="60" :max="100" />
            <b-progress class="mb" style="height: 5px"
              variant="primary" :value="35" :max="100" />
            <h6>Integration</h6>
            <b-progress class="mb-xs" style="height: 5px"
              variant="danger" :value="40" :max="100" />
            <b-progress style="height: 5px"
              variant="primary" :value="55" :max="100" />
          </Widget>
        </div>
      </b-col>
      <b-col md="6" xl="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Server Overview" >
            <div class="d-flex align-items-center mb-sm">
              <p class="width-150"><small>60% / 37°С / 3.3 Ghz</small></p>
              <div style="width: calc(100% - 150px)">
                <trend
                  :data="getRandomData()"
                  :gradient="[appConfig.colors.danger]"
                  :height="40"
                  stroke-width="4"
                  smooth />
              </div>
            </div>
            <div class="d-flex align-items-center mb-sm">
              <p class="width-150"><small>54% / 31°С / 3.3 Ghz</small></p>
              <div style="width: calc(100% - 150px)">
                <trend
                  :data="getRandomData()"
                  :gradient="[appConfig.colors.info]"
                  :height="40"
                  stroke-width="4"
                  smooth />
              </div>
            </div>
            <div class="d-flex align-items-center">
              <p class="width-150"><small>57% / 21°С / 3.3 Ghz</small></p>
              <div style="width: calc(100% - 150px)">
                <trend
                  :data="getRandomData()"
                  :gradient="[appConfig.colors.primary]"
                  :height="40"
                  stroke-width="4"
                  smooth />
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col xs="12">
        <Widget
            title="<h5>Time <span class='fw-semi-bold'>Line</span></h5>"
            bodyClass="widget-table-overflow"
            customHeader
          >
          <Timeline :timeline-items="timelineItems" :message-when-no-items="messageWhenNoItems"/>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import BigStat from './components/BigStat/BigStat';
import mock from './mock';
import { mapActions } from 'vuex'

import { Chart } from 'highcharts-vue';

import moment from 'moment';

import Timeline from 'timeline-vuejs'

export default {
  name: 'Dashboard',
  components: {
    Widget, BigStat, highcharts: Chart,Timeline
  },
  data() {
    return {
      mock,
      ready: false,
      user: {},
      donut: {},
      messageWhenNoItems: 'There are not items',
      timelineItems: []
    };
  },
  created() {
    this.getUserData().then(() => {
      this.user = this.$store.state.user.userData
      this.alerts = this.user.alerts
      this.setDonut()
      this.getTimeLines()
      this.ready = true
    })
  },
  methods: {

    ...mapActions({
      getUserData: 'user/getData',
    }),

    getTimeLines(){
      this.timelineItems = this.$store.state.user.userData.timeline.map((data)=>({
        from: new Date(data.startDate),
        title: data.title,
        description: data.type,
      }))
    },

    getRandomData() {
      const arr = [];

      for (let i = 0; i < 25; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }

      return arr;
    },

    setDonut() {

      let revenueData = this.user.evolution.map((data)=>({
        label: moment(data.date).format("MMM Do YY"),
        data: data.value,
      }));

      let {danger, info, primary,success} = this.appConfig.colors;
      let series = [
        {
          name: 'Value',
          data: revenueData.map(s => {
            return {
              name: s.label,
              y: s.data
            }
          })
        }
      ];

      this.donut = {
        chart: {
          type: 'pie',
          height: 180
        },
        credits: {
          enabled: false
        },
        title: false,
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: false
            },
            borderColor: null,
            showInLegend: true,
            innerSize: 60,
            size: 100,
            states: {
              hover: {
                halo: {
                  size: 1
                }
              }
            }
          }
        },
        colors: [danger, info, primary, success],
        legend: {
          align: 'right',
          verticalAlign: 'middle',
          layout: 'vertical',
          itemStyle: {
            color: '#495057',
            fontWeight: 100,
            fontFamily: 'Montserrat'
          },
          itemMarginBottom: 5,
          symbolRadius: 0
        },
        exporting: {
          enabled: false
        },
        series
      };
    }
  },
  computed: {
  }
};
</script>

<style src="./Dashboard.scss" lang="scss" />
