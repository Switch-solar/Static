if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  Chart.defaults.color = "#ADBABD";
  Chart.defaults.borderColor = "rgba(255,255,255,0.1)";
  Chart.defaults.backgroundColor = "rgba(255,255,0,0.1)";
  Chart.defaults.elements.line.borderColor = "rgba(255,255,0,0.4)";
}

const ctx = document.getElementById('myChart').getContext('2d');

const demoData = {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'x', 'y', 'z', 'a', 'b', 'c'],
        datasets: [{
            label: '# kWh consumption',
            fill: 'origin',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ['rgba(54, 162, 235, 0.2)',],
            borderColor: ['rgba(54, 162, 235, .8)',],
            borderWidth: 2
        }]
    },
    options: {}
}

const myChart = new Chart(ctx, demoData);
const last_record = 14000;
const meter_id = 165;
const http_url_base = 'http://app.whynotswitch.com/api/demo/meter/';
//const http_url_base = 'http://127.0.0.1:8000/api/demo/meter/';


function updater(data) {
    console.log(data);

    var demoDataUpdate = demoData.data.datasets[0].data;
    demoDataUpdate.shift();
    demoDataUpdate.push(data.energy);

    demoData.data.datasets[0].data = demoDataUpdate;
    myChart.update();
};


function handler(array){
    for (const data of array){
        updater(data);
    };
};


(function poll(){
   setTimeout(function(){
      $.ajax({
        type: 'GET',
        url: http_url_base + meter_id + '/',
        dataType: "json",
        success: function(array){
            for (const data of array){
                updater(data);
                last_record = data.pk
            };
            //Setup the next poll recursively
            poll();
            }
      });
  }, 1000);
})();
