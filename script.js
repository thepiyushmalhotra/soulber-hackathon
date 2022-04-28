const myChart = document.getElementById("myChart").getContext("2d");

let delayed;

let gradient = myChart.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgba(255,255,255, 1)");
gradient.addColorStop(1, "rgba(30, 81, 123, 1)");

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
        data,
        label: "Soulber Points Chart",
        fill: true,
        backgroundColor: gradient,
        borderColor: "#44cc9c",
        pointBackgroundColor: "#FDFFFF",
      },
    ],
  };

  const config = {
    type: "line",
    data: json_data,
    options: {
      plugins: {
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
      },
      radius: 5,
      hitRadius: 25,
      hoverRadius: 10,
      lineTension: 0.3,
      responsive: true,
      animation: {
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
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
            drawOnChartArea: false,
          },
        },
      },
    },
  };
  new Chart(myChart, config);
}

// Function to make Ajax request to get the data using JSON
function getData() {
  // Creating the XMLHttpRequest object
  var request = new XMLHttpRequest();

  // Instantiating the request object
  request.open("GET", "https://api.dictionaryapi.dev/api/v2/entries/en/bat");

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
