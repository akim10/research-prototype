$( document ).ready(function() {
    var data = [['Dietrich', 5800],['SCS', 5400],['CFA', 5250],['CIT', 4500],['MCS', 4250],['Tepper', 4000],]

    var chart1 = new Highcharts.chart({
        chart: {
            renderTo: 'chart',
            type: 'column'
        },
        title: {
            text: 'Total Points'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: 0,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Points'
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Points',
            data: data,
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                align: 'right',
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });

    $(window).resize(function() {    
        chart1.setSize(
           $('.card-body').width(), 
           $('.card-body').height(), 
           false
        );   
    });
});
