<script>
  import {Line} from 'vue-chartjs'

  export default {
    extends: Line,
    mounted () {
      this.renderChart({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data One',
            borderColor: '#2988F6',
            backgroundColor: '#F1F8FF',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      }, {responsive: true, maintainAspectRatio: false})
    }
  }
</script>

