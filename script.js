const myChart = document.getElementById("myChart").getContext("2d");

let delayed;

let gradient = myChart.createLinearGradient(0, 0, 0, 1000);
gradient.addColorStop(0, "rgba(255,255,255, 0.4)");
gradient.addColorStop(1, "rgba(255,255,255, 0.1)");

// Create JSON Data for the chart
const pseudo_res = {
  name: "Brad Traversy",
  labels: [
    "12 AM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
    "12 PM",
  ],
  data: [
    100, 750, 1750, 1344, 2700, 1350, 2550, 1700, 2120, 2560, 3900, 2000, 2389,
  ],
};

function buildChart(labels, data) {
  const json_data = {
    labels,
    datasets: [
      {
        label: "Scatter Dataset",
        data: [
          {
            x: 0.6,
            y: 0.2,
          },
          {
            x: 1.2,
            y: 3.1,
          },
          {
            x: 1.4,
            y: 2,
          },
          {
            x: 2.1,
            y: 4.5,
          },
          {
            x: 2.5,
            y: 3.8,
          },
          {
            x: 3.4,
            y: 3.5,
          },
          {
            x: 3.5,
            y: 3.5,
          },
          {
            x: 4.1,
            y: 2.5,
          },
          {
            x: 4.5,
            y: 4.9,
          },
          {
            x: 5.1,
            y: 5.2,
          },
        ],
        fill: true,
        backgroundColor: gradient,
        borderColor: "white",
      },
    ],
  };

  const config = {
    type: "scatter",
    data: json_data,
    options: {
      tooltips: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.xLabel;
          },
        },
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        title: {
          display: true,
        },
        legend: {
          display: false,
        },
      },
      radius: 5,
      hitRadius: 10,
      hoverRadius: 10,
      pointBackgroundColor: "white",
      lineTension: 0.3,
      responsive: true,
      showLine: true,
      animation: {
        tension: {
          duration: 1000,
          easing: "easeInOut",
          from: 0.4,
          to: 0.7,
          loop: true,
        },
        onComplete: () => {
          delayed: true;
        },
        delay: (context) => {
          let delay = 0;
          if (
            context.type == "data" &&
            context.mode === "default" &&
            !delayed
          ) {
            delay = context.dataIndex * 40 + context.datasetIndex * 40;
          }
          return delay;
        },
      },
      scales: {
        y: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
            drawBorder: false,
            drawOnChartArea: false,
          },
          beginAtZero: false,
        },
        x: {
          ticks: {
            display: false,
            color: "black",
          },
          grid: {
            display: false,
            drawBorder: false,
            drawOnChartArea: false,
          },
          beginAtZero: false,
        },
      },
    },
  };
  new Chart(myChart, config);
}

// Ajax Block
function getData() {
  // Creating the XMLHttpRequest object
  var request = new XMLHttpRequest();

  // Instantiating the request object
  request.open("GET", "https://api.dictionaryapi.dev/api/v2/entries/en/bat");
  // request.open("GET", "https://soulberbeta.com/getAllEvents");

  // Defining event listener for readystatechange event
  request.onreadystatechange = function () {
    // Check if the request is compete and was successful
    if (this.readyState === 4 && this.status === 200) {
      // Inserting the response from server into an HTML element
      var response = JSON.parse(this.responseText);
      //   buildChart(response.labels, response.data);
      buildChart(pseudo_res.labels, pseudo_res.data);
    }
  };

  // Sending the request to the server
  request.send();
}

getData();
