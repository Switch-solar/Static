if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  Chart.defaults.color = "#ADBABD";
  Chart.defaults.borderColor = "rgba(255,255,255,0.1)";
  Chart.defaults.backgroundColor = "rgba(255,255,0,0.1)";
  Chart.defaults.elements.line.borderColor = "rgba(255,255,0,0.4)";
}

const ctx = document.getElementById('myChart').getContext('2d');

const graphMaker = {
    type: 'line',
    data: {
        labels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        datasets: [{
            tension: 0.4,
            label: '# kWh consumption',
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

const myChart = new Chart(ctx, graphMaker);
const meter_id = 165;
const http_url_base = 'http://app.whynotswitch.com/api/demo/meter/';
//const http_url_base = 'http://127.0.0.1:8000/api/demo/meter/';

var last_record = null;


function updater(data) {
    console.log(data);

    var dataBuffer = graphMaker.data.datasets[0].data;
    var labelBuffer = graphMaker.data.labels;
    dataBuffer.shift();
    dataBuffer.push(data.energy);

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
            console.log(array);
            for (const data of array){
                //setTimeout(() => { updater(data); }, 200);
                updater(data);
                last_record = data.pk
            };
            poll();
            }
      });
  }, 1000);
})();
