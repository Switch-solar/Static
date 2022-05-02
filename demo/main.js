Chart.defaults.color = "#ADBABD";
Chart.defaults.borderColor = "rgba(255,255,255,0.1)";
Chart.defaults.backgroundColor = "rgba(255,255,0,0.1)";
Chart.defaults.elements.line.borderColor = "rgba(255,255,0,0.4)";

const ctx = document.getElementById('myChart').getContext('2d');

const graphMaker = {
    type: 'line',
    data: {
        labels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        datasets: [{
            tension: 0.4,
            label: '#Electrical Power -> kW',
            fill: 'origin',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ['rgba(54, 162, 235, 0.2)',],
            borderColor: ['rgba(54, 162, 235, .8)',],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
    }
}

var interval = 1000;
var last_record = null;
//const http_url_base = 'http://127.0.0.1:8000/api/realtime/meter/';
const http_url_base = 'http://0.whynotswitch.com/api/realtime/meter/';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const myChart = new Chart(ctx, graphMaker);
const meter_id = urlParams.get('meter');



var table = $('#data').DataTable( {
    responsive: true,
    order: [[0, "desc" ]],
    data: [],
    columns: [
        { title: "Index" },
        { title: "Voltage" },
        { title: "Current" },
        { title: "Energy" },
        { title: "Time" },
    ]
} );


function tabulate(data) {
    var newRow = Object.values(data);
    var rowNode = table.row.add(newRow).draw().node();

    $( rowNode )
        .css('color', '#9ba8ab').animate({color: 'white'});
}

function updater(data) {
    var dataBuffer = graphMaker.data.datasets[0].data;
    var labelBuffer = graphMaker.data.labels;
    var power = (data.avg_voltage * data.avg_current) / 1000

    dataBuffer.shift();
    dataBuffer.push(power);

    labelBuffer.shift();
    labelBuffer.push(data.pk);

    graphMaker.data.datasets[0].data = dataBuffer;
    graphMaker.data.labels = labelBuffer;

    myChart.update();
};


(function poll(){
   setTimeout(function(){
      $.ajax({
        type: 'GET',
        url: http_url_base + meter_id + '/',
        dataType: 'json',
        data:{q:last_record},
        success: function(array){
            //console.log(array);
            for (const data of array){
                updater(data);
                tabulate(data);
                last_record = data.pk;
                // convert interval to milliseconds and update
                interval = data.interval * 1000;
            };
            poll();
            }
      });
  }, interval);
})();
