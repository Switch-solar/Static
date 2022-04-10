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


$(document).ready(function() {
    // auto refresh page after 1 second
    setInterval('fetchData()', 1000);
});


function fetchData() {
    const Http = new XMLHttpRequest();
    const meter_id = 165
    const last_record = 0
    const http_url_base = 'http://app.whynotswitch.com/api/demo/meter/'
    const URL = `${http_url_base}/${meter_id}/${last_record}`;

    Http.onreadystatechange = update
    Http.open("GET", URL);
    Http.send();

    var data = JSON.parse(Http.responseText);
    console.log(URL);
    console.log(data);

    var demoDataUpdate = demoData.data.datasets[0].data;
    demoDataUpdate.shift();
    demoDataUpdate.push(data.value);

    demoData.data.datasets[0].data = demoDataUpdate;
    myChart.update()
}

(function poll(){
   setTimeout(function(){
      $.ajax({ url: "server", success: function(data){
        //Update your dashboard gauge
        salesGauge.setValue(data.value);
        //Setup the next poll recursively
        poll();
      }, dataType: "json"});
  }, 30000);
})();