$(document).ready(function () {
  var TotalSeconds = 60 * 60 * 3;


  var data = [
				{ y: 5452343, label: "Completed: \n{y}", color: "#62c462" },
				{ y: 3499200, label: "Remaining: \n{y}", color: "#DBFFDB" },
				{ y: 203000, label: "Processing: \n{y}", color: "#fbb450" }
				];

  var donut = new CanvasJS.Chart("chartContainer",
		{
		  title: {
		    text: "SFPD Data Crunchin'",
            fontSize: 21,
            fontWeight: "normal",
            fontColor: "#eee",
            horizontalAlign: "left"
		  },
		  data: [
			{
			  type: "doughnut",
			  startAngle: 60,
			  toolTipContent: "{y} jobs",
			  indexLabelFontColor: '#eee',
			  indexLabelLineColor: 'transparent',
			  dataPoints: data,
              indexLabelFontWeight: "bold",
              indexLabelFontSize: 20
			}
			]

		});

  $('#chartContainer canvas').css("background-color", "transparent")
  //update function
  var updateDonut = function (new_completed, new_current) {

    // updating the dataPoints
    data[0].y = data[0].y + new_completed; //completed
    data[1].y = data[1].y - new_current; //remaining
    data[2].y = data[2].y + new_current - new_completed; //current

    donut.render();
  };


  function updateTimer() {
    var Seconds = TotalSeconds;

    var Hours = Math.floor(Seconds / 3600);
    Seconds -= Hours * (3600);

    var Minutes = Math.floor(Seconds / 60);
    Seconds -= Minutes * (60);

    var TimeStr = LeadingZero(Hours) + ":" + LeadingZero(Minutes) + ":" + LeadingZero(Seconds)
    $('#timer').html(TimeStr);
   
  }
  function LeadingZero(Time) {

    return (Time < 10) ? "0" + Time : +Time;

  }


  var updateCharts = function () {
    var new_completed = Math.floor(Math.random() * (10000));
    var new_current = Math.floor(Math.random() * (10000));

    updateDonut(new_completed, new_current);

    TotalSeconds -= 1;
    updateTimer();
  }

  updateCharts();

  // update chart after specified interval
  var updateInterval = 1000;
  setInterval(function () { updateCharts() }, updateInterval);

});