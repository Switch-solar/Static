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


// var socket = new WebSocket('ws://app.whynotswitch.com/ws/demo/');
var socket = new WebSocket('ws://localhost:8000/ws/demo/');

socket.onmessage = function(e) {
    var data = JSON.parse(e.data);
    console.log(data);

    var demoDataUpdate = demoData.data.datasets[0].data;
    demoDataUpdate.shift(data.value);
    demoDataUpdate.push(data.value);

    demoData.data.datasets[0].data = demoDataUpdate;
    myChart.update()
}
