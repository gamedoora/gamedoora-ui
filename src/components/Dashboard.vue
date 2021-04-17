<template>
  <div class="page-header-block">
    <div class="heading">Dashboard</div>
    <ol class="breadcrumb">
      <li>
        <a class="get_studio_stream_url" href="javascript:void(0)">
          Teststudio
        </a>
      </li>
    </ol>
  </div>
  <div class="studio-dashboard-details">
    <div class="row dashboard_chart_container">
      <div class="dashboard-heading w-100">Project Overview</div>
      <div class="col-md-6 chart_parent studio_details_chart">
        <select class="form-control" style="visibility: hidden">
          <option value=""></option>
        </select>
        <vue-highcharts type="chart" :options="chartOptions"></vue-highcharts>
      </div>
      <div class="progress_chart col-sm-6">
        <div class="chart_parent user_details_chart">
          <select class="form-control">
            <option>pradeep</option>
          </select>
          <vue-highcharts type="chart" :options="chartOptions"></vue-highcharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VueHighcharts from "vue3-highcharts";

export default defineComponent({
  name: "Dashboard",
  components: {
    VueHighcharts,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false,
          height: 350,
          // width: (($(window).width() - 300) / 2),
          spacingTop: -50,
        },
        title: {
          text: "Overall Status",
          align: "center",
          verticalAlign: "middle",
          y: 100,
        },
        tooltip: {
          pointFormat:
            "{point.data}: <b>{point.percentage:.1f}%</b> <br/><br/><br/><strong>Click to View More Details</strong>",
        },
        plotOptions: {
          pie: {
            colors: ["#ffa15e", "#e4e4e4"],
            /*borderColor: 'blue',*/
            dataLabels: {
              enabled: false,
              distance: -45,
              style: {
                fontWeight: "normal",
                fontSize: 14,
                color: "#000",
                textOutline: "transparent",
              },
            },
            startAngle: -90,
            endAngle: 90,
            center: ["50%", "75%"],
            states: {
              hover: {
                enabled: false,
              },
            },
          },
        },
        series: [
          {
            type: "pie",
            name: "Project Status",
            innerSize: "50%",
            data: [
              {
                name: "Done Tasks",
                y: 0.0,
                data: "Progress",
                /*borderColor: 'blue',*/
              },
              {
                name: "Pending Tasks",
                y: 100.0,
                data: "Pending",
              },
            ],
            cursor: "pointer",
          },
        ],
      },
    };
  },
});
</script>
