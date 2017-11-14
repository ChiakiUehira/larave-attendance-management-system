<script>
  import {Pie} from 'vue-chartjs'

  export default {
    extends: Pie,
    mounted () {
      this.renderChart({
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
          {
            backgroundColor: [
              '#F1F8FF',
              '#F1F8dd',
              '#F1F8af',
              '#F1F8dd'
            ],
            data: [40, 20, 80, 10]
          }
        ]
      }, {responsive: true, maintainAspectRatio: false})
    }
  }
</script>