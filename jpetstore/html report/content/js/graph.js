/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 15.0, "series": [{"data": [[200.0, 15.0]], "isOverall": false, "label": "home-5", "isController": false}, {"data": [[0.0, 12.0], [300.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "signoff-7", "isController": false}, {"data": [[200.0, 15.0]], "isOverall": false, "label": "home-4", "isController": false}, {"data": [[0.0, 3.0], [200.0, 12.0]], "isOverall": false, "label": "signoff-8", "isController": false}, {"data": [[0.0, 4.0], [200.0, 11.0]], "isOverall": false, "label": "home-3", "isController": false}, {"data": [[0.0, 4.0], [200.0, 11.0]], "isOverall": false, "label": "signoff-9", "isController": false}, {"data": [[0.0, 6.0], [200.0, 9.0]], "isOverall": false, "label": "home-2", "isController": false}, {"data": [[300.0, 10.0], [200.0, 1.0], [400.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "select", "isController": false}, {"data": [[0.0, 5.0], [200.0, 10.0]], "isOverall": false, "label": "home-1", "isController": false}, {"data": [[0.0, 13.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "signoff-3", "isController": false}, {"data": [[200.0, 14.0], [900.0, 1.0]], "isOverall": false, "label": "home-0", "isController": false}, {"data": [[0.0, 14.0], [200.0, 1.0]], "isOverall": false, "label": "signoff-4", "isController": false}, {"data": [[0.0, 12.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "signoff-5", "isController": false}, {"data": [[0.0, 12.0], [300.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "signoff-6", "isController": false}, {"data": [[0.0, 13.0], [200.0, 2.0]], "isOverall": false, "label": "signoff-0", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "signoff-1", "isController": false}, {"data": [[0.0, 13.0], [200.0, 2.0]], "isOverall": false, "label": "signoff-2", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 13.0]], "isOverall": false, "label": "home-9", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 13.0]], "isOverall": false, "label": "home-8", "isController": false}, {"data": [[0.0, 1.0], [200.0, 14.0]], "isOverall": false, "label": "home-7", "isController": false}, {"data": [[200.0, 15.0]], "isOverall": false, "label": "home-6", "isController": false}, {"data": [[300.0, 12.0], [600.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "order", "isController": false}, {"data": [[0.0, 4.0], [200.0, 11.0]], "isOverall": false, "label": "add to cart-9", "isController": false}, {"data": [[0.0, 6.0], [200.0, 9.0]], "isOverall": false, "label": "add to cart-7", "isController": false}, {"data": [[0.0, 4.0], [200.0, 11.0]], "isOverall": false, "label": "add to cart-8", "isController": false}, {"data": [[0.0, 13.0], [200.0, 2.0]], "isOverall": false, "label": "add to cart-5", "isController": false}, {"data": [[0.0, 13.0], [200.0, 2.0]], "isOverall": false, "label": "add to cart-6", "isController": false}, {"data": [[0.0, 13.0], [200.0, 2.0]], "isOverall": false, "label": "add to cart-3", "isController": false}, {"data": [[0.0, 14.0], [200.0, 1.0]], "isOverall": false, "label": "add to cart-4", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "add to cart-1", "isController": false}, {"data": [[0.0, 13.0], [200.0, 2.0]], "isOverall": false, "label": "add to cart-2", "isController": false}, {"data": [[0.0, 14.0], [200.0, 1.0]], "isOverall": false, "label": "add to cart-0", "isController": false}, {"data": [[300.0, 6.0], [600.0, 1.0], [200.0, 6.0], [500.0, 2.0]], "isOverall": false, "label": "preLogin", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [400.0, 5.0], [500.0, 7.0]], "isOverall": false, "label": "login", "isController": false}, {"data": [[300.0, 11.0], [600.0, 1.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "confirmed", "isController": false}, {"data": [[300.0, 10.0], [400.0, 2.0], [200.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "confirm", "isController": false}, {"data": [[0.0, 13.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "confirm-0", "isController": false}, {"data": [[300.0, 11.0], [200.0, 1.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "cats", "isController": false}, {"data": [[0.0, 3.0], [200.0, 12.0]], "isOverall": false, "label": "order-7", "isController": false}, {"data": [[0.0, 12.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "confirm-3", "isController": false}, {"data": [[0.0, 2.0], [200.0, 13.0]], "isOverall": false, "label": "order-8", "isController": false}, {"data": [[0.0, 13.0], [200.0, 2.0]], "isOverall": false, "label": "confirm-4", "isController": false}, {"data": [[0.0, 3.0], [200.0, 12.0]], "isOverall": false, "label": "order-9", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "confirm-1", "isController": false}, {"data": [[0.0, 12.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "confirm-2", "isController": false}, {"data": [[0.0, 13.0], [200.0, 2.0]], "isOverall": false, "label": "order-3", "isController": false}, {"data": [[0.0, 4.0], [200.0, 11.0]], "isOverall": false, "label": "confirm-7", "isController": false}, {"data": [[0.0, 13.0], [200.0, 2.0]], "isOverall": false, "label": "order-4", "isController": false}, {"data": [[0.0, 3.0], [200.0, 12.0]], "isOverall": false, "label": "confirm-8", "isController": false}, {"data": [[0.0, 13.0], [200.0, 2.0]], "isOverall": false, "label": "order-5", "isController": false}, {"data": [[0.0, 12.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "confirm-5", "isController": false}, {"data": [[0.0, 13.0], [200.0, 2.0]], "isOverall": false, "label": "order-6", "isController": false}, {"data": [[0.0, 12.0], [200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "confirm-6", "isController": false}, {"data": [[0.0, 13.0], [200.0, 2.0]], "isOverall": false, "label": "order-0", "isController": false}, {"data": [[0.0, 14.0], [200.0, 1.0]], "isOverall": false, "label": "order-1", "isController": false}, {"data": [[0.0, 2.0], [200.0, 13.0]], "isOverall": false, "label": "confirm-9", "isController": false}, {"data": [[0.0, 14.0], [200.0, 1.0]], "isOverall": false, "label": "order-2", "isController": false}, {"data": [[0.0, 13.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "signoff-16", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [200.0, 10.0]], "isOverall": false, "label": "login-10", "isController": false}, {"data": [[0.0, 2.0], [300.0, 3.0], [200.0, 10.0]], "isOverall": false, "label": "login-11", "isController": false}, {"data": [[0.0, 2.0], [300.0, 2.0], [200.0, 10.0], [400.0, 1.0]], "isOverall": false, "label": "login-12", "isController": false}, {"data": [[4100.0, 2.0], [4300.0, 2.0], [4200.0, 1.0], [4400.0, 2.0], [4500.0, 2.0], [4700.0, 3.0], [4800.0, 1.0], [5500.0, 1.0], [5900.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[0.0, 2.0], [300.0, 1.0], [200.0, 11.0], [400.0, 1.0]], "isOverall": false, "label": "login-13", "isController": false}, {"data": [[0.0, 14.0], [100.0, 1.0]], "isOverall": false, "label": "login-14", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "login-15", "isController": false}, {"data": [[0.0, 14.0], [100.0, 1.0]], "isOverall": false, "label": "login-16", "isController": false}, {"data": [[0.0, 13.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "select-0", "isController": false}, {"data": [[0.0, 9.0], [300.0, 2.0], [200.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "preLogin-8", "isController": false}, {"data": [[0.0, 13.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "select-6", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0], [200.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "preLogin-7", "isController": false}, {"data": [[0.0, 13.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "select-5", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 2.0], [200.0, 11.0]], "isOverall": false, "label": "select-8", "isController": false}, {"data": [[0.0, 6.0], [300.0, 3.0], [200.0, 6.0]], "isOverall": false, "label": "preLogin-9", "isController": false}, {"data": [[0.0, 4.0], [200.0, 11.0]], "isOverall": false, "label": "select-7", "isController": false}, {"data": [[0.0, 14.0], [100.0, 1.0]], "isOverall": false, "label": "select-2", "isController": false}, {"data": [[0.0, 12.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "select-1", "isController": false}, {"data": [[0.0, 12.0], [200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "select-4", "isController": false}, {"data": [[0.0, 13.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "select-3", "isController": false}, {"data": [[0.0, 14.0], [200.0, 1.0]], "isOverall": false, "label": "login-3", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "login-2", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "login-1", "isController": false}, {"data": [[0.0, 14.0], [200.0, 1.0]], "isOverall": false, "label": "login-0", "isController": false}, {"data": [[0.0, 2.0], [200.0, 13.0]], "isOverall": false, "label": "select-9", "isController": false}, {"data": [[0.0, 6.0], [300.0, 1.0], [200.0, 8.0]], "isOverall": false, "label": "login-9", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [200.0, 10.0]], "isOverall": false, "label": "login-8", "isController": false}, {"data": [[0.0, 14.0], [200.0, 1.0]], "isOverall": false, "label": "login-7", "isController": false}, {"data": [[0.0, 2.0], [200.0, 12.0], [100.0, 1.0]], "isOverall": false, "label": "cats-9", "isController": false}, {"data": [[0.0, 14.0], [200.0, 1.0]], "isOverall": false, "label": "login-6", "isController": false}, {"data": [[0.0, 1.0], [200.0, 14.0]], "isOverall": false, "label": "cats-8", "isController": false}, {"data": [[0.0, 14.0], [200.0, 1.0]], "isOverall": false, "label": "login-5", "isController": false}, {"data": [[0.0, 14.0], [200.0, 1.0]], "isOverall": false, "label": "login-4", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "preLogin-0", "isController": false}, {"data": [[0.0, 14.0], [100.0, 1.0]], "isOverall": false, "label": "cats-5", "isController": false}, {"data": [[0.0, 13.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "cats-4", "isController": false}, {"data": [[0.0, 14.0], [100.0, 1.0]], "isOverall": false, "label": "preLogin-2", "isController": false}, {"data": [[0.0, 1.0], [200.0, 14.0]], "isOverall": false, "label": "cats-7", "isController": false}, {"data": [[0.0, 13.0], [100.0, 2.0]], "isOverall": false, "label": "preLogin-1", "isController": false}, {"data": [[0.0, 12.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "cats-6", "isController": false}, {"data": [[0.0, 14.0], [100.0, 1.0]], "isOverall": false, "label": "preLogin-4", "isController": false}, {"data": [[0.0, 13.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "cats-1", "isController": false}, {"data": [[0.0, 14.0], [100.0, 1.0]], "isOverall": false, "label": "preLogin-3", "isController": false}, {"data": [[0.0, 14.0], [100.0, 1.0]], "isOverall": false, "label": "cats-0", "isController": false}, {"data": [[0.0, 14.0], [100.0, 1.0]], "isOverall": false, "label": "preLogin-6", "isController": false}, {"data": [[0.0, 13.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "cats-3", "isController": false}, {"data": [[0.0, 14.0], [100.0, 1.0]], "isOverall": false, "label": "preLogin-5", "isController": false}, {"data": [[0.0, 14.0], [100.0, 1.0]], "isOverall": false, "label": "cats-2", "isController": false}, {"data": [[300.0, 11.0], [200.0, 2.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "add to cart", "isController": false}, {"data": [[0.0, 3.0], [200.0, 12.0]], "isOverall": false, "label": "confirmed-8", "isController": false}, {"data": [[0.0, 5.0], [200.0, 10.0]], "isOverall": false, "label": "confirmed-9", "isController": false}, {"data": [[0.0, 13.0], [200.0, 2.0]], "isOverall": false, "label": "confirmed-6", "isController": false}, {"data": [[0.0, 4.0], [200.0, 11.0]], "isOverall": false, "label": "confirmed-7", "isController": false}, {"data": [[0.0, 13.0], [200.0, 2.0]], "isOverall": false, "label": "confirmed-4", "isController": false}, {"data": [[0.0, 13.0], [200.0, 2.0]], "isOverall": false, "label": "confirmed-5", "isController": false}, {"data": [[0.0, 14.0], [200.0, 1.0]], "isOverall": false, "label": "confirmed-2", "isController": false}, {"data": [[0.0, 13.0], [200.0, 2.0]], "isOverall": false, "label": "confirmed-3", "isController": false}, {"data": [[0.0, 13.0], [200.0, 2.0]], "isOverall": false, "label": "confirmed-0", "isController": false}, {"data": [[0.0, 14.0], [200.0, 1.0]], "isOverall": false, "label": "confirmed-1", "isController": false}, {"data": [[600.0, 4.0], [700.0, 2.0], [400.0, 5.0], [500.0, 4.0]], "isOverall": false, "label": "signoff", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [200.0, 10.0], [100.0, 2.0]], "isOverall": false, "label": "home-10", "isController": false}, {"data": [[0.0, 1.0], [300.0, 4.0], [200.0, 10.0]], "isOverall": false, "label": "home-11", "isController": false}, {"data": [[1400.0, 1.0], [700.0, 2.0], [800.0, 11.0], [1000.0, 1.0]], "isOverall": false, "label": "home", "isController": false}, {"data": [[0.0, 1.0], [300.0, 3.0], [200.0, 11.0]], "isOverall": false, "label": "home-12", "isController": false}, {"data": [[0.0, 13.0], [300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "home-13", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [200.0, 11.0], [400.0, 1.0]], "isOverall": false, "label": "signoff-12", "isController": false}, {"data": [[0.0, 14.0], [200.0, 1.0]], "isOverall": false, "label": "home-14", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [200.0, 11.0], [400.0, 1.0]], "isOverall": false, "label": "signoff-13", "isController": false}, {"data": [[300.0, 1.0], [100.0, 14.0]], "isOverall": false, "label": "home-15", "isController": false}, {"data": [[0.0, 14.0], [200.0, 1.0]], "isOverall": false, "label": "signoff-14", "isController": false}, {"data": [[0.0, 13.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "signoff-15", "isController": false}, {"data": [[0.0, 3.0], [200.0, 12.0]], "isOverall": false, "label": "signoff-10", "isController": false}, {"data": [[0.0, 5.0], [200.0, 9.0], [400.0, 1.0]], "isOverall": false, "label": "signoff-11", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 5900.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 48.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1902.0, "series": [{"data": [[0.0, 1902.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 48.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 4.616179001721166, "minX": 1.66843818E12, "maxY": 6.549855491329482, "series": [{"data": [[1.66843824E12, 6.549855491329482], [1.66843818E12, 4.616179001721166]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66843824E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 68.0, "minX": 1.0, "maxY": 5032.2, "series": [{"data": [[1.0, 267.0], [2.0, 227.0], [4.0, 217.0], [8.0, 231.33333333333334], [5.0, 220.0], [3.0, 224.0], [6.0, 216.5], [7.0, 225.4]], "isOverall": false, "label": "home-5", "isController": false}, {"data": [[5.7333333333333325, 227.2666666666667]], "isOverall": false, "label": "home-5-Aggregated", "isController": false}, {"data": [[8.0, 77.0], [4.0, 75.0], [2.0, 74.0], [1.0, 75.0], [5.0, 72.0], [6.0, 80.0], [3.0, 73.0], [7.0, 162.8]], "isOverall": false, "label": "signoff-7", "isController": false}, {"data": [[5.866666666666667, 104.73333333333333]], "isOverall": false, "label": "signoff-7-Aggregated", "isController": false}, {"data": [[1.0, 273.0], [2.0, 219.0], [4.0, 224.0], [8.0, 228.33333333333334], [5.0, 232.0], [3.0, 228.0], [6.0, 227.5], [7.0, 221.6]], "isOverall": false, "label": "home-4", "isController": false}, {"data": [[5.7333333333333325, 228.26666666666668]], "isOverall": false, "label": "home-4-Aggregated", "isController": false}, {"data": [[8.0, 225.75], [4.0, 216.0], [2.0, 72.0], [1.0, 74.0], [5.0, 74.0], [6.0, 235.0], [3.0, 220.0], [7.0, 226.4]], "isOverall": false, "label": "signoff-8", "isController": false}, {"data": [[5.866666666666667, 195.06666666666666]], "isOverall": false, "label": "signoff-8-Aggregated", "isController": false}, {"data": [[1.0, 269.0], [2.0, 234.0], [4.0, 225.0], [8.0, 228.33333333333334], [5.0, 231.0], [3.0, 69.0], [6.0, 143.5], [7.0, 162.8]], "isOverall": false, "label": "home-3", "isController": false}, {"data": [[5.7333333333333325, 187.6]], "isOverall": false, "label": "home-3-Aggregated", "isController": false}, {"data": [[8.0, 225.5], [4.0, 214.0], [2.0, 71.0], [1.0, 69.0], [5.0, 219.0], [6.0, 217.0], [3.0, 210.0], [7.0, 161.8]], "isOverall": false, "label": "signoff-9", "isController": false}, {"data": [[5.866666666666667, 180.73333333333335]], "isOverall": false, "label": "signoff-9-Aggregated", "isController": false}, {"data": [[1.0, 276.0], [2.0, 230.0], [4.0, 73.0], [8.0, 185.33333333333334], [5.0, 76.0], [3.0, 235.0], [6.0, 149.0], [7.0, 171.2]], "isOverall": false, "label": "home-2", "isController": false}, {"data": [[5.7333333333333325, 173.33333333333334]], "isOverall": false, "label": "home-2-Aggregated", "isController": false}, {"data": [[4.0, 389.0], [8.0, 423.5], [5.0, 385.0], [3.0, 560.0], [6.0, 373.8], [7.0, 352.3333333333333]], "isOverall": false, "label": "select", "isController": false}, {"data": [[6.333333333333334, 396.9333333333334]], "isOverall": false, "label": "select-Aggregated", "isController": false}, {"data": [[1.0, 75.0], [2.0, 79.0], [4.0, 229.0], [8.0, 129.0], [5.0, 218.0], [3.0, 224.0], [6.0, 222.0], [7.0, 197.2]], "isOverall": false, "label": "home-1", "isController": false}, {"data": [[5.7333333333333325, 176.13333333333335]], "isOverall": false, "label": "home-1-Aggregated", "isController": false}, {"data": [[8.0, 76.0], [4.0, 71.0], [2.0, 76.0], [1.0, 75.0], [5.0, 69.0], [6.0, 80.0], [3.0, 72.0], [7.0, 107.6]], "isOverall": false, "label": "signoff-3", "isController": false}, {"data": [[5.866666666666667, 85.66666666666667]], "isOverall": false, "label": "signoff-3-Aggregated", "isController": false}, {"data": [[1.0, 900.0], [2.0, 248.0], [4.0, 236.0], [8.0, 226.33333333333334], [5.0, 226.0], [3.0, 229.0], [6.0, 222.0], [7.0, 223.4]], "isOverall": false, "label": "home-0", "isController": false}, {"data": [[5.7333333333333325, 271.9333333333333]], "isOverall": false, "label": "home-0-Aggregated", "isController": false}, {"data": [[8.0, 76.25], [4.0, 76.0], [2.0, 71.0], [1.0, 73.0], [5.0, 75.0], [6.0, 75.0], [3.0, 76.0], [7.0, 108.6]], "isOverall": false, "label": "signoff-4", "isController": false}, {"data": [[5.866666666666667, 86.26666666666668]], "isOverall": false, "label": "signoff-4-Aggregated", "isController": false}, {"data": [[8.0, 76.25], [4.0, 76.0], [2.0, 72.0], [1.0, 75.0], [5.0, 70.0], [6.0, 75.0], [3.0, 71.0], [7.0, 123.8]], "isOverall": false, "label": "signoff-5", "isController": false}, {"data": [[5.866666666666667, 90.86666666666667]], "isOverall": false, "label": "signoff-5-Aggregated", "isController": false}, {"data": [[8.0, 76.75], [4.0, 72.0], [2.0, 71.0], [1.0, 75.0], [5.0, 76.0], [6.0, 83.0], [3.0, 75.0], [7.0, 160.0]], "isOverall": false, "label": "signoff-6", "isController": false}, {"data": [[5.866666666666667, 103.93333333333334]], "isOverall": false, "label": "signoff-6-Aggregated", "isController": false}, {"data": [[8.0, 70.75], [4.0, 72.0], [2.0, 71.0], [1.0, 71.0], [5.0, 71.0], [6.0, 72.0], [3.0, 73.0], [7.0, 133.0]], "isOverall": false, "label": "signoff-0", "isController": false}, {"data": [[5.866666666666667, 91.86666666666666]], "isOverall": false, "label": "signoff-0-Aggregated", "isController": false}, {"data": [[8.0, 75.0], [4.0, 69.0], [2.0, 73.0], [1.0, 71.0], [5.0, 70.0], [6.0, 76.0], [3.0, 73.0], [7.0, 77.6]], "isOverall": false, "label": "signoff-1", "isController": false}, {"data": [[5.866666666666667, 74.66666666666669]], "isOverall": false, "label": "signoff-1-Aggregated", "isController": false}, {"data": [[8.0, 77.5], [4.0, 68.0], [2.0, 73.0], [1.0, 68.0], [5.0, 76.0], [6.0, 84.0], [3.0, 76.0], [7.0, 136.4]], "isOverall": false, "label": "signoff-2", "isController": false}, {"data": [[5.866666666666667, 95.80000000000001]], "isOverall": false, "label": "signoff-2-Aggregated", "isController": false}, {"data": [[1.0, 77.0], [2.0, 226.0], [4.0, 216.0], [8.0, 249.0], [5.0, 219.0], [3.0, 219.0], [6.0, 216.0], [7.0, 221.4]], "isOverall": false, "label": "home-9", "isController": false}, {"data": [[5.7333333333333325, 216.20000000000002]], "isOverall": false, "label": "home-9-Aggregated", "isController": false}, {"data": [[1.0, 74.0], [2.0, 226.0], [4.0, 215.0], [8.0, 218.66666666666666], [5.0, 213.0], [3.0, 285.0], [6.0, 218.0], [7.0, 237.8]], "isOverall": false, "label": "home-8", "isController": false}, {"data": [[5.7333333333333325, 219.6]], "isOverall": false, "label": "home-8-Aggregated", "isController": false}, {"data": [[1.0, 73.0], [2.0, 224.0], [4.0, 225.0], [8.0, 221.66666666666666], [5.0, 211.0], [3.0, 215.0], [6.0, 222.0], [7.0, 227.2]], "isOverall": false, "label": "home-7", "isController": false}, {"data": [[5.7333333333333325, 212.8666666666667]], "isOverall": false, "label": "home-7-Aggregated", "isController": false}, {"data": [[1.0, 289.0], [2.0, 222.0], [4.0, 226.0], [8.0, 234.0], [5.0, 225.0], [3.0, 220.0], [6.0, 216.5], [7.0, 224.8]], "isOverall": false, "label": "home-6", "isController": false}, {"data": [[5.7333333333333325, 229.4]], "isOverall": false, "label": "home-6-Aggregated", "isController": false}, {"data": [[4.0, 522.0], [8.0, 368.0], [5.0, 360.5], [6.0, 372.0], [3.0, 369.0], [7.0, 424.85714285714283]], "isOverall": false, "label": "order", "isController": false}, {"data": [[6.133333333333334, 404.6666666666667]], "isOverall": false, "label": "order-Aggregated", "isController": false}, {"data": [[4.0, 74.0], [8.0, 217.0], [5.0, 218.5], [6.0, 168.0], [7.0, 202.7142857142857]], "isOverall": false, "label": "add to cart-9", "isController": false}, {"data": [[6.2, 181.66666666666666]], "isOverall": false, "label": "add to cart-9-Aggregated", "isController": false}, {"data": [[4.0, 72.0], [8.0, 216.0], [5.0, 147.5], [6.0, 167.0], [7.0, 181.14285714285717]], "isOverall": false, "label": "add to cart-7", "isController": false}, {"data": [[6.2, 161.6]], "isOverall": false, "label": "add to cart-7-Aggregated", "isController": false}, {"data": [[4.0, 71.5], [8.0, 211.0], [5.0, 216.5], [6.0, 167.66666666666666], [7.0, 207.42857142857142]], "isOverall": false, "label": "add to cart-8", "isController": false}, {"data": [[6.2, 182.8]], "isOverall": false, "label": "add to cart-8-Aggregated", "isController": false}, {"data": [[4.0, 156.0], [8.0, 76.0], [5.0, 78.5], [6.0, 75.33333333333333], [7.0, 95.99999999999999]], "isOverall": false, "label": "add to cart-5", "isController": false}, {"data": [[6.2, 96.2]], "isOverall": false, "label": "add to cart-5-Aggregated", "isController": false}, {"data": [[4.0, 158.0], [8.0, 77.0], [5.0, 81.5], [6.0, 76.33333333333333], [7.0, 97.57142857142857]], "isOverall": false, "label": "add to cart-6", "isController": false}, {"data": [[6.2, 97.86666666666667]], "isOverall": false, "label": "add to cart-6-Aggregated", "isController": false}, {"data": [[4.0, 152.0], [8.0, 72.0], [5.0, 79.0], [6.0, 73.66666666666667], [7.0, 94.57142857142857]], "isOverall": false, "label": "add to cart-3", "isController": false}, {"data": [[6.2, 94.46666666666667]], "isOverall": false, "label": "add to cart-3-Aggregated", "isController": false}, {"data": [[4.0, 154.5], [8.0, 71.0], [5.0, 79.5], [6.0, 75.0], [7.0, 74.28571428571429]], "isOverall": false, "label": "add to cart-4", "isController": false}, {"data": [[6.2, 85.60000000000001]], "isOverall": false, "label": "add to cart-4-Aggregated", "isController": false}, {"data": [[4.0, 71.5], [8.0, 74.0], [5.0, 79.0], [6.0, 72.66666666666667], [7.0, 73.14285714285715]], "isOverall": false, "label": "add to cart-1", "isController": false}, {"data": [[6.2, 73.66666666666667]], "isOverall": false, "label": "add to cart-1-Aggregated", "isController": false}, {"data": [[4.0, 155.5], [8.0, 72.0], [5.0, 81.5], [6.0, 71.33333333333333], [7.0, 94.28571428571429]], "isOverall": false, "label": "add to cart-2", "isController": false}, {"data": [[6.2, 94.66666666666666]], "isOverall": false, "label": "add to cart-2-Aggregated", "isController": false}, {"data": [[4.0, 154.0], [8.0, 72.0], [5.0, 73.5], [6.0, 74.33333333333333], [7.0, 72.85714285714286]], "isOverall": false, "label": "add to cart-0", "isController": false}, {"data": [[6.2, 84.0]], "isOverall": false, "label": "add to cart-0-Aggregated", "isController": false}, {"data": [[1.0, 248.0], [2.0, 242.0], [4.0, 228.0], [8.0, 298.5], [5.0, 222.0], [3.0, 543.0], [6.0, 301.5], [7.0, 440.16666666666663]], "isOverall": false, "label": "preLogin", "isController": false}, {"data": [[5.666666666666666, 354.93333333333334]], "isOverall": false, "label": "preLogin-Aggregated", "isController": false}, {"data": [[2.0, 672.0], [4.0, 469.0], [8.0, 511.0], [3.0, 514.5], [6.0, 552.6666666666666], [7.0, 552.0]], "isOverall": false, "label": "login", "isController": false}, {"data": [[5.866666666666665, 544.1333333333333]], "isOverall": false, "label": "login-Aggregated", "isController": false}, {"data": [[8.0, 362.0], [2.0, 219.0], [5.0, 235.0], [6.0, 400.2], [3.0, 378.0], [7.0, 422.33333333333337]], "isOverall": false, "label": "confirmed", "isController": false}, {"data": [[6.0, 381.93333333333334]], "isOverall": false, "label": "confirmed-Aggregated", "isController": false}, {"data": [[8.0, 426.3333333333333], [5.0, 412.25], [6.0, 367.0], [3.0, 223.0], [7.0, 404.4]], "isOverall": false, "label": "confirm", "isController": false}, {"data": [[6.266666666666667, 393.79999999999995]], "isOverall": false, "label": "confirm-Aggregated", "isController": false}, {"data": [[8.0, 73.33333333333333], [5.0, 114.5], [6.0, 73.5], [3.0, 75.0], [7.0, 84.8]], "isOverall": false, "label": "confirm-0", "isController": false}, {"data": [[6.266666666666667, 88.26666666666668]], "isOverall": false, "label": "confirm-0-Aggregated", "isController": false}, {"data": [[4.0, 370.0], [8.0, 362.0], [5.0, 372.0], [3.0, 299.0], [6.0, 363.0], [7.0, 422.42857142857144]], "isOverall": false, "label": "cats", "isController": false}, {"data": [[6.0, 383.2]], "isOverall": false, "label": "cats-Aggregated", "isController": false}, {"data": [[4.0, 70.0], [8.0, 221.0], [5.0, 212.5], [6.0, 167.0], [3.0, 226.0], [7.0, 201.2857142857143]], "isOverall": false, "label": "order-7", "isController": false}, {"data": [[6.133333333333334, 190.13333333333338]], "isOverall": false, "label": "order-7-Aggregated", "isController": false}, {"data": [[8.0, 123.66666666666667], [5.0, 109.75], [6.0, 71.5], [3.0, 70.0], [7.0, 85.0]], "isOverall": false, "label": "confirm-3", "isController": false}, {"data": [[6.266666666666667, 96.53333333333332]], "isOverall": false, "label": "confirm-3-Aggregated", "isController": false}, {"data": [[4.0, 69.0], [8.0, 217.0], [5.0, 214.5], [6.0, 169.66666666666666], [3.0, 217.0], [7.0, 228.28571428571428]], "isOverall": false, "label": "order-8", "isController": false}, {"data": [[6.133333333333334, 202.6]], "isOverall": false, "label": "order-8-Aggregated", "isController": false}, {"data": [[8.0, 126.66666666666667], [5.0, 114.0], [6.0, 72.5], [3.0, 72.0], [7.0, 76.2]], "isOverall": false, "label": "confirm-4", "isController": false}, {"data": [[6.266666666666667, 95.60000000000001]], "isOverall": false, "label": "confirm-4-Aggregated", "isController": false}, {"data": [[4.0, 69.0], [8.0, 222.0], [5.0, 140.5], [6.0, 221.0], [3.0, 216.0], [7.0, 207.99999999999997]], "isOverall": false, "label": "order-9", "isController": false}, {"data": [[6.133333333333334, 193.8]], "isOverall": false, "label": "order-9-Aggregated", "isController": false}, {"data": [[8.0, 73.0], [5.0, 72.0], [6.0, 72.0], [3.0, 75.0], [7.0, 77.4]], "isOverall": false, "label": "confirm-1", "isController": false}, {"data": [[6.266666666666667, 74.2]], "isOverall": false, "label": "confirm-1-Aggregated", "isController": false}, {"data": [[8.0, 124.33333333333333], [5.0, 109.5], [6.0, 74.0], [3.0, 71.0], [7.0, 84.4]], "isOverall": false, "label": "confirm-2", "isController": false}, {"data": [[6.266666666666667, 96.8]], "isOverall": false, "label": "confirm-2-Aggregated", "isController": false}, {"data": [[4.0, 227.0], [8.0, 72.0], [5.0, 73.5], [6.0, 75.66666666666667], [3.0, 75.0], [7.0, 97.57142857142857]], "isOverall": false, "label": "order-3", "isController": false}, {"data": [[6.133333333333334, 95.4]], "isOverall": false, "label": "order-3-Aggregated", "isController": false}, {"data": [[8.0, 227.66666666666666], [5.0, 143.25], [6.0, 214.0], [3.0, 71.0], [7.0, 197.8]], "isOverall": false, "label": "confirm-7", "isController": false}, {"data": [[6.266666666666667, 182.9333333333333]], "isOverall": false, "label": "confirm-7-Aggregated", "isController": false}, {"data": [[4.0, 230.0], [8.0, 71.0], [5.0, 73.0], [6.0, 73.33333333333333], [3.0, 69.0], [7.0, 97.28571428571429]], "isOverall": false, "label": "order-4", "isController": false}, {"data": [[6.133333333333334, 94.46666666666665]], "isOverall": false, "label": "order-4-Aggregated", "isController": false}, {"data": [[8.0, 229.33333333333334], [5.0, 147.25], [6.0, 215.5], [3.0, 72.0], [7.0, 237.6]], "isOverall": false, "label": "confirm-8", "isController": false}, {"data": [[6.266666666666667, 197.8666666666667]], "isOverall": false, "label": "confirm-8-Aggregated", "isController": false}, {"data": [[4.0, 224.0], [8.0, 74.0], [5.0, 75.0], [6.0, 74.0], [3.0, 73.0], [7.0, 97.42857142857143]], "isOverall": false, "label": "order-5", "isController": false}, {"data": [[6.133333333333334, 95.0]], "isOverall": false, "label": "order-5-Aggregated", "isController": false}, {"data": [[8.0, 124.33333333333333], [5.0, 111.75], [6.0, 76.5], [3.0, 72.0], [7.0, 84.4]], "isOverall": false, "label": "confirm-5", "isController": false}, {"data": [[6.266666666666667, 97.8]], "isOverall": false, "label": "confirm-5-Aggregated", "isController": false}, {"data": [[4.0, 217.0], [8.0, 77.0], [5.0, 77.0], [6.0, 76.0], [3.0, 73.0], [7.0, 100.85714285714286]], "isOverall": false, "label": "order-6", "isController": false}, {"data": [[6.133333333333334, 96.99999999999999]], "isOverall": false, "label": "order-6-Aggregated", "isController": false}, {"data": [[8.0, 98.33333333333333], [5.0, 113.0], [6.0, 73.5], [3.0, 73.0], [7.0, 84.2]], "isOverall": false, "label": "confirm-6", "isController": false}, {"data": [[6.266666666666667, 92.53333333333333]], "isOverall": false, "label": "confirm-6-Aggregated", "isController": false}, {"data": [[4.0, 237.0], [8.0, 73.0], [5.0, 72.0], [6.0, 73.33333333333333], [3.0, 71.0], [7.0, 95.28571428571428]], "isOverall": false, "label": "order-0", "isController": false}, {"data": [[6.133333333333334, 94.13333333333334]], "isOverall": false, "label": "order-0-Aggregated", "isController": false}, {"data": [[4.0, 75.0], [8.0, 72.0], [5.0, 72.5], [6.0, 72.0], [3.0, 73.0], [7.0, 97.28571428571429]], "isOverall": false, "label": "order-1", "isController": false}, {"data": [[6.133333333333334, 84.13333333333334]], "isOverall": false, "label": "order-1-Aggregated", "isController": false}, {"data": [[8.0, 224.0], [5.0, 183.75], [6.0, 217.0], [3.0, 70.0], [7.0, 229.8]], "isOverall": false, "label": "confirm-9", "isController": false}, {"data": [[6.266666666666667, 204.0]], "isOverall": false, "label": "confirm-9-Aggregated", "isController": false}, {"data": [[4.0, 221.0], [8.0, 71.0], [5.0, 71.5], [6.0, 74.66666666666667], [3.0, 68.0], [7.0, 71.57142857142857]], "isOverall": false, "label": "order-2", "isController": false}, {"data": [[6.133333333333334, 81.86666666666667]], "isOverall": false, "label": "order-2-Aggregated", "isController": false}, {"data": [[8.0, 127.5], [4.0, 68.0], [2.0, 69.0], [1.0, 70.0], [5.0, 71.0], [6.0, 73.0], [3.0, 70.0], [7.0, 70.6]], "isOverall": false, "label": "signoff-16", "isController": false}, {"data": [[5.866666666666667, 85.6]], "isOverall": false, "label": "signoff-16-Aggregated", "isController": false}, {"data": [[2.0, 71.0], [4.0, 71.0], [8.0, 158.0], [3.0, 142.0], [6.0, 282.0], [7.0, 225.5]], "isOverall": false, "label": "login-10", "isController": false}, {"data": [[5.866666666666665, 196.06666666666666]], "isOverall": false, "label": "login-10-Aggregated", "isController": false}, {"data": [[2.0, 75.0], [4.0, 235.0], [8.0, 232.0], [3.0, 228.5], [6.0, 257.0], [7.0, 247.33333333333331]], "isOverall": false, "label": "login-11", "isController": false}, {"data": [[5.866666666666665, 232.4]], "isOverall": false, "label": "login-11-Aggregated", "isController": false}, {"data": [[2.0, 71.0], [4.0, 237.0], [8.0, 236.0], [3.0, 229.0], [6.0, 212.0], [7.0, 280.5]], "isOverall": false, "label": "login-12", "isController": false}, {"data": [[5.866666666666665, 237.13333333333333]], "isOverall": false, "label": "login-12-Aggregated", "isController": false}, {"data": [[8.0, 4522.75], [4.0, 4770.0], [2.0, 4378.0], [1.0, 4246.0], [5.0, 4564.0], [6.0, 4713.0], [3.0, 4197.0], [7.0, 5032.2]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[5.866666666666667, 4674.666666666666]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[2.0, 71.0], [4.0, 214.0], [8.0, 233.0], [3.0, 228.5], [6.0, 219.66666666666666], [7.0, 262.3333333333333]], "isOverall": false, "label": "login-13", "isController": false}, {"data": [[5.866666666666665, 229.39999999999998]], "isOverall": false, "label": "login-13-Aggregated", "isController": false}, {"data": [[2.0, 71.0], [4.0, 70.0], [8.0, 72.0], [3.0, 71.0], [6.0, 69.66666666666667], [7.0, 76.83333333333333]], "isOverall": false, "label": "login-14", "isController": false}, {"data": [[5.866666666666665, 73.13333333333334]], "isOverall": false, "label": "login-14-Aggregated", "isController": false}, {"data": [[2.0, 71.0], [4.0, 73.0], [8.0, 69.5], [3.0, 70.5], [6.0, 71.0], [7.0, 75.83333333333333]], "isOverall": false, "label": "login-15", "isController": false}, {"data": [[5.866666666666665, 72.8]], "isOverall": false, "label": "login-15-Aggregated", "isController": false}, {"data": [[2.0, 70.0], [4.0, 73.0], [8.0, 71.5], [3.0, 70.0], [6.0, 71.0], [7.0, 78.33333333333333]], "isOverall": false, "label": "login-16", "isController": false}, {"data": [[5.866666666666665, 73.93333333333334]], "isOverall": false, "label": "login-16-Aggregated", "isController": false}, {"data": [[4.0, 72.0], [8.0, 80.5], [5.0, 74.0], [3.0, 235.0], [6.0, 73.0], [7.0, 72.66666666666667]], "isOverall": false, "label": "select-0", "isController": false}, {"data": [[6.333333333333334, 85.73333333333333]], "isOverall": false, "label": "select-0-Aggregated", "isController": false}, {"data": [[1.0, 71.0], [2.0, 72.0], [4.0, 72.0], [8.0, 73.5], [5.0, 70.0], [3.0, 353.0], [6.0, 144.5], [7.0, 177.0]], "isOverall": false, "label": "preLogin-8", "isController": false}, {"data": [[5.666666666666666, 142.4]], "isOverall": false, "label": "preLogin-8-Aggregated", "isController": false}, {"data": [[4.0, 72.0], [8.0, 82.25], [5.0, 73.0], [3.0, 220.0], [6.0, 78.8], [7.0, 73.66666666666667]], "isOverall": false, "label": "select-6", "isController": false}, {"data": [[6.333333333333334, 87.26666666666668]], "isOverall": false, "label": "select-6-Aggregated", "isController": false}, {"data": [[1.0, 73.0], [2.0, 70.0], [4.0, 72.0], [8.0, 74.5], [5.0, 71.0], [3.0, 295.0], [6.0, 70.0], [7.0, 202.16666666666666]], "isOverall": false, "label": "preLogin-7", "isController": false}, {"data": [[5.666666666666666, 138.86666666666667]], "isOverall": false, "label": "preLogin-7-Aggregated", "isController": false}, {"data": [[4.0, 75.0], [8.0, 82.75], [5.0, 69.0], [3.0, 234.0], [6.0, 79.0], [7.0, 73.33333333333333]], "isOverall": false, "label": "select-5", "isController": false}, {"data": [[6.333333333333334, 88.26666666666668]], "isOverall": false, "label": "select-5-Aggregated", "isController": false}, {"data": [[4.0, 229.0], [8.0, 257.75], [5.0, 228.0], [3.0, 152.0], [6.0, 222.0], [7.0, 151.66666666666666]], "isOverall": false, "label": "select-8", "isController": false}, {"data": [[6.333333333333334, 213.66666666666669]], "isOverall": false, "label": "select-8-Aggregated", "isController": false}, {"data": [[1.0, 71.0], [2.0, 76.0], [4.0, 71.0], [8.0, 150.0], [5.0, 74.0], [3.0, 365.0], [6.0, 148.0], [7.0, 266.1666666666667]], "isOverall": false, "label": "preLogin-9", "isController": false}, {"data": [[5.666666666666666, 190.0]], "isOverall": false, "label": "preLogin-9-Aggregated", "isController": false}, {"data": [[4.0, 241.0], [8.0, 147.25], [5.0, 222.0], [3.0, 71.0], [6.0, 218.8], [7.0, 179.33333333333334]], "isOverall": false, "label": "select-7", "isController": false}, {"data": [[6.333333333333334, 183.66666666666669]], "isOverall": false, "label": "select-7-Aggregated", "isController": false}, {"data": [[4.0, 72.0], [8.0, 80.0], [5.0, 76.0], [3.0, 74.0], [6.0, 77.2], [7.0, 71.66666666666667]], "isOverall": false, "label": "select-2", "isController": false}, {"data": [[6.333333333333334, 76.2]], "isOverall": false, "label": "select-2-Aggregated", "isController": false}, {"data": [[4.0, 71.0], [8.0, 81.0], [5.0, 72.0], [3.0, 223.0], [6.0, 72.4], [7.0, 121.33333333333333]], "isOverall": false, "label": "select-1", "isController": false}, {"data": [[6.333333333333334, 94.4]], "isOverall": false, "label": "select-1-Aggregated", "isController": false}, {"data": [[4.0, 70.0], [8.0, 80.75], [5.0, 75.0], [3.0, 234.0], [6.0, 75.2], [7.0, 93.66666666666667]], "isOverall": false, "label": "select-4", "isController": false}, {"data": [[6.333333333333334, 90.60000000000001]], "isOverall": false, "label": "select-4-Aggregated", "isController": false}, {"data": [[4.0, 73.0], [8.0, 80.5], [5.0, 70.0], [3.0, 213.0], [6.0, 76.2], [7.0, 75.66666666666667]], "isOverall": false, "label": "select-3", "isController": false}, {"data": [[6.333333333333334, 85.73333333333333]], "isOverall": false, "label": "select-3-Aggregated", "isController": false}, {"data": [[2.0, 240.0], [4.0, 71.0], [8.0, 78.0], [3.0, 73.0], [6.0, 72.0], [7.0, 74.33333333333334]], "isOverall": false, "label": "login-3", "isController": false}, {"data": [[5.866666666666665, 85.0]], "isOverall": false, "label": "login-3-Aggregated", "isController": false}, {"data": [[2.0, 74.0], [4.0, 75.0], [8.0, 76.0], [3.0, 75.0], [6.0, 73.66666666666667], [7.0, 73.33333333333334]], "isOverall": false, "label": "login-2", "isController": false}, {"data": [[5.866666666666665, 74.13333333333334]], "isOverall": false, "label": "login-2-Aggregated", "isController": false}, {"data": [[2.0, 74.0], [4.0, 74.0], [8.0, 73.5], [3.0, 79.5], [6.0, 73.33333333333333], [7.0, 70.83333333333333]], "isOverall": false, "label": "login-1", "isController": false}, {"data": [[5.866666666666665, 73.26666666666668]], "isOverall": false, "label": "login-1-Aggregated", "isController": false}, {"data": [[2.0, 231.0], [4.0, 72.0], [8.0, 81.0], [3.0, 78.5], [6.0, 77.33333333333333], [7.0, 73.83333333333334]], "isOverall": false, "label": "login-0", "isController": false}, {"data": [[5.866666666666665, 86.46666666666667]], "isOverall": false, "label": "login-0-Aggregated", "isController": false}, {"data": [[4.0, 243.0], [8.0, 220.25], [5.0, 231.0], [3.0, 94.0], [6.0, 217.4], [7.0, 179.66666666666666]], "isOverall": false, "label": "select-9", "isController": false}, {"data": [[6.333333333333334, 204.99999999999997]], "isOverall": false, "label": "select-9-Aggregated", "isController": false}, {"data": [[2.0, 70.0], [4.0, 71.0], [8.0, 160.0], [3.0, 160.0], [6.0, 196.33333333333334], [7.0, 196.33333333333334]], "isOverall": false, "label": "login-9", "isController": false}, {"data": [[5.866666666666665, 169.86666666666667]], "isOverall": false, "label": "login-9-Aggregated", "isController": false}, {"data": [[2.0, 72.0], [4.0, 71.0], [8.0, 160.0], [3.0, 146.5], [6.0, 246.33333333333334], [7.0, 240.0]], "isOverall": false, "label": "login-8", "isController": false}, {"data": [[5.866666666666665, 195.66666666666669]], "isOverall": false, "label": "login-8-Aggregated", "isController": false}, {"data": [[2.0, 217.0], [4.0, 72.0], [8.0, 79.0], [3.0, 74.5], [6.0, 74.66666666666667], [7.0, 76.33333333333334]], "isOverall": false, "label": "login-7", "isController": false}, {"data": [[5.866666666666665, 85.19999999999999]], "isOverall": false, "label": "login-7-Aggregated", "isController": false}, {"data": [[4.0, 219.0], [8.0, 217.0], [5.0, 221.0], [3.0, 143.5], [6.0, 215.0], [7.0, 193.28571428571428]], "isOverall": false, "label": "cats-9", "isController": false}, {"data": [[6.0, 196.13333333333333]], "isOverall": false, "label": "cats-9-Aggregated", "isController": false}, {"data": [[2.0, 232.0], [4.0, 75.0], [8.0, 77.5], [3.0, 71.5], [6.0, 71.0], [7.0, 74.5]], "isOverall": false, "label": "login-6", "isController": false}, {"data": [[5.866666666666665, 84.33333333333334]], "isOverall": false, "label": "login-6-Aggregated", "isController": false}, {"data": [[4.0, 212.0], [8.0, 212.0], [5.0, 223.0], [3.0, 146.0], [6.0, 212.0], [7.0, 237.28571428571428]], "isOverall": false, "label": "cats-8", "isController": false}, {"data": [[6.0, 215.73333333333332]], "isOverall": false, "label": "cats-8-Aggregated", "isController": false}, {"data": [[2.0, 234.0], [4.0, 73.0], [8.0, 77.5], [3.0, 78.0], [6.0, 75.33333333333333], [7.0, 71.16666666666667]], "isOverall": false, "label": "login-5", "isController": false}, {"data": [[5.866666666666665, 84.73333333333335]], "isOverall": false, "label": "login-5-Aggregated", "isController": false}, {"data": [[2.0, 229.0], [4.0, 73.0], [8.0, 78.5], [3.0, 72.0], [6.0, 71.0], [7.0, 76.0]], "isOverall": false, "label": "login-4", "isController": false}, {"data": [[5.866666666666665, 84.80000000000001]], "isOverall": false, "label": "login-4-Aggregated", "isController": false}, {"data": [[1.0, 78.0], [2.0, 74.0], [4.0, 72.0], [8.0, 72.5], [5.0, 72.0], [3.0, 83.0], [6.0, 73.5], [7.0, 75.83333333333333]], "isOverall": false, "label": "preLogin-0", "isController": false}, {"data": [[5.666666666666666, 75.06666666666668]], "isOverall": false, "label": "preLogin-0-Aggregated", "isController": false}, {"data": [[4.0, 71.0], [8.0, 81.0], [5.0, 71.0], [3.0, 72.5], [6.0, 72.66666666666667], [7.0, 82.28571428571429]], "isOverall": false, "label": "cats-5", "isController": false}, {"data": [[6.0, 77.46666666666667]], "isOverall": false, "label": "cats-5-Aggregated", "isController": false}, {"data": [[4.0, 70.0], [8.0, 72.0], [5.0, 69.0], [3.0, 74.0], [6.0, 74.66666666666667], [7.0, 102.42857142857143]], "isOverall": false, "label": "cats-4", "isController": false}, {"data": [[6.0, 86.66666666666666]], "isOverall": false, "label": "cats-4-Aggregated", "isController": false}, {"data": [[1.0, 79.0], [2.0, 77.0], [4.0, 76.0], [8.0, 69.5], [5.0, 70.0], [3.0, 82.0], [6.0, 78.5], [7.0, 90.0]], "isOverall": false, "label": "preLogin-2", "isController": false}, {"data": [[5.666666666666666, 81.33333333333333]], "isOverall": false, "label": "preLogin-2-Aggregated", "isController": false}, {"data": [[4.0, 223.0], [8.0, 215.0], [5.0, 226.0], [3.0, 141.5], [6.0, 214.33333333333334], [7.0, 236.0]], "isOverall": false, "label": "cats-7", "isController": false}, {"data": [[6.0, 216.13333333333335]], "isOverall": false, "label": "cats-7-Aggregated", "isController": false}, {"data": [[1.0, 78.0], [2.0, 78.0], [4.0, 72.0], [8.0, 82.5], [5.0, 73.0], [3.0, 82.0], [6.0, 72.5], [7.0, 92.5]], "isOverall": false, "label": "preLogin-1", "isController": false}, {"data": [[5.666666666666666, 83.2]], "isOverall": false, "label": "preLogin-1-Aggregated", "isController": false}, {"data": [[4.0, 78.0], [8.0, 75.0], [5.0, 74.0], [3.0, 112.5], [6.0, 76.0], [7.0, 105.14285714285715]], "isOverall": false, "label": "cats-6", "isController": false}, {"data": [[6.0, 94.39999999999999]], "isOverall": false, "label": "cats-6-Aggregated", "isController": false}, {"data": [[1.0, 77.0], [2.0, 74.0], [4.0, 75.0], [8.0, 81.5], [5.0, 74.0], [3.0, 82.0], [6.0, 79.5], [7.0, 87.66666666666666]], "isOverall": false, "label": "preLogin-4", "isController": false}, {"data": [[5.666666666666666, 82.0]], "isOverall": false, "label": "preLogin-4-Aggregated", "isController": false}, {"data": [[4.0, 75.0], [8.0, 68.0], [5.0, 76.0], [3.0, 75.5], [6.0, 71.33333333333333], [7.0, 103.85714285714286]], "isOverall": false, "label": "cats-1", "isController": false}, {"data": [[6.0, 87.39999999999999]], "isOverall": false, "label": "cats-1-Aggregated", "isController": false}, {"data": [[1.0, 70.0], [2.0, 76.0], [4.0, 73.0], [8.0, 73.0], [5.0, 77.0], [3.0, 81.0], [6.0, 76.5], [7.0, 86.66666666666666]], "isOverall": false, "label": "preLogin-3", "isController": false}, {"data": [[5.666666666666666, 79.73333333333333]], "isOverall": false, "label": "preLogin-3-Aggregated", "isController": false}, {"data": [[4.0, 74.0], [8.0, 71.0], [5.0, 71.0], [3.0, 73.0], [6.0, 72.33333333333333], [7.0, 80.42857142857143]], "isOverall": false, "label": "cats-0", "isController": false}, {"data": [[6.0, 76.13333333333334]], "isOverall": false, "label": "cats-0-Aggregated", "isController": false}, {"data": [[1.0, 76.0], [2.0, 78.0], [4.0, 76.0], [8.0, 82.5], [5.0, 79.0], [3.0, 81.0], [6.0, 77.0], [7.0, 92.16666666666667]], "isOverall": false, "label": "preLogin-6", "isController": false}, {"data": [[5.666666666666666, 84.13333333333333]], "isOverall": false, "label": "preLogin-6-Aggregated", "isController": false}, {"data": [[4.0, 70.0], [8.0, 75.0], [5.0, 75.0], [3.0, 73.0], [6.0, 72.66666666666667], [7.0, 104.14285714285714]], "isOverall": false, "label": "cats-3", "isController": false}, {"data": [[6.0, 87.53333333333333]], "isOverall": false, "label": "cats-3-Aggregated", "isController": false}, {"data": [[1.0, 78.0], [2.0, 72.0], [4.0, 75.0], [8.0, 76.0], [5.0, 74.0], [3.0, 81.0], [6.0, 74.0], [7.0, 88.0]], "isOverall": false, "label": "preLogin-5", "isController": false}, {"data": [[5.666666666666666, 80.53333333333335]], "isOverall": false, "label": "preLogin-5-Aggregated", "isController": false}, {"data": [[4.0, 74.0], [8.0, 72.0], [5.0, 72.0], [3.0, 76.0], [6.0, 75.0], [7.0, 81.85714285714286]], "isOverall": false, "label": "cats-2", "isController": false}, {"data": [[6.0, 77.86666666666667]], "isOverall": false, "label": "cats-2-Aggregated", "isController": false}, {"data": [[4.0, 380.5], [8.0, 377.0], [5.0, 377.5], [6.0, 321.0], [7.0, 381.85714285714283]], "isOverall": false, "label": "add to cart", "isController": false}, {"data": [[6.2, 368.6]], "isOverall": false, "label": "add to cart-Aggregated", "isController": false}, {"data": [[8.0, 213.0], [2.0, 71.0], [5.0, 86.0], [6.0, 186.2], [3.0, 231.0], [7.0, 217.5]], "isOverall": false, "label": "confirmed-8", "isController": false}, {"data": [[6.0, 189.13333333333335]], "isOverall": false, "label": "confirmed-8-Aggregated", "isController": false}, {"data": [[8.0, 71.0], [2.0, 72.0], [5.0, 79.0], [6.0, 188.2], [3.0, 220.0], [7.0, 194.0]], "isOverall": false, "label": "confirmed-9", "isController": false}, {"data": [[6.0, 169.79999999999998]], "isOverall": false, "label": "confirmed-9-Aggregated", "isController": false}, {"data": [[8.0, 77.0], [2.0, 76.0], [5.0, 76.0], [6.0, 104.8], [3.0, 77.0], [7.0, 103.33333333333333]], "isOverall": false, "label": "confirmed-6", "isController": false}, {"data": [[6.0, 96.66666666666669]], "isOverall": false, "label": "confirmed-6-Aggregated", "isController": false}, {"data": [[8.0, 216.0], [2.0, 68.0], [5.0, 86.0], [6.0, 157.4], [3.0, 221.0], [7.0, 217.33333333333334]], "isOverall": false, "label": "confirmed-7", "isController": false}, {"data": [[6.0, 178.79999999999998]], "isOverall": false, "label": "confirmed-7-Aggregated", "isController": false}, {"data": [[8.0, 73.0], [2.0, 72.0], [5.0, 77.0], [6.0, 104.6], [3.0, 71.0], [7.0, 98.83333333333334]], "isOverall": false, "label": "confirmed-4", "isController": false}, {"data": [[6.0, 93.93333333333335]], "isOverall": false, "label": "confirmed-4-Aggregated", "isController": false}, {"data": [[8.0, 74.0], [2.0, 73.0], [5.0, 76.0], [6.0, 104.0], [3.0, 71.0], [7.0, 101.83333333333333]], "isOverall": false, "label": "confirmed-5", "isController": false}, {"data": [[6.0, 95.0]], "isOverall": false, "label": "confirmed-5-Aggregated", "isController": false}, {"data": [[8.0, 68.0], [2.0, 70.0], [5.0, 71.0], [6.0, 102.4], [3.0, 75.0], [7.0, 71.0]], "isOverall": false, "label": "confirmed-2", "isController": false}, {"data": [[6.0, 81.46666666666667]], "isOverall": false, "label": "confirmed-2-Aggregated", "isController": false}, {"data": [[8.0, 81.0], [2.0, 70.0], [5.0, 71.0], [6.0, 105.8], [3.0, 75.0], [7.0, 99.16666666666666]], "isOverall": false, "label": "confirmed-3", "isController": false}, {"data": [[6.0, 94.73333333333333]], "isOverall": false, "label": "confirmed-3-Aggregated", "isController": false}, {"data": [[8.0, 75.0], [2.0, 73.0], [5.0, 75.0], [6.0, 108.0], [3.0, 73.0], [7.0, 99.5]], "isOverall": false, "label": "confirmed-0", "isController": false}, {"data": [[6.0, 95.53333333333333]], "isOverall": false, "label": "confirmed-0-Aggregated", "isController": false}, {"data": [[8.0, 81.0], [2.0, 76.0], [5.0, 77.0], [6.0, 70.8], [3.0, 69.0], [7.0, 98.83333333333333]], "isOverall": false, "label": "confirmed-1", "isController": false}, {"data": [[6.0, 83.33333333333334]], "isOverall": false, "label": "confirmed-1-Aggregated", "isController": false}, {"data": [[8.0, 663.75], [4.0, 495.0], [2.0, 444.0], [1.0, 440.0], [5.0, 500.0], [6.0, 536.0], [3.0, 448.0], [7.0, 594.4]], "isOverall": false, "label": "signoff", "isController": false}, {"data": [[5.866666666666667, 566.0]], "isOverall": false, "label": "signoff-Aggregated", "isController": false}, {"data": [[1.0, 78.0], [2.0, 226.0], [4.0, 223.0], [8.0, 250.0], [5.0, 138.0], [3.0, 282.0], [6.0, 186.0], [7.0, 239.0]], "isOverall": false, "label": "home-10", "isController": false}, {"data": [[5.7333333333333325, 217.6]], "isOverall": false, "label": "home-10-Aggregated", "isController": false}, {"data": [[1.0, 77.0], [2.0, 223.0], [4.0, 213.0], [8.0, 248.33333333333334], [5.0, 327.0], [3.0, 277.0], [6.0, 267.5], [7.0, 237.6]], "isOverall": false, "label": "home-11", "isController": false}, {"data": [[5.7333333333333325, 239.00000000000003]], "isOverall": false, "label": "home-11-Aggregated", "isController": false}, {"data": [[1.0, 1498.0], [2.0, 866.0], [4.0, 826.0], [8.0, 825.0], [5.0, 810.0], [3.0, 822.0], [6.0, 928.5], [7.0, 810.6]], "isOverall": false, "label": "home", "isController": false}, {"data": [[5.7333333333333325, 880.4666666666665]], "isOverall": false, "label": "home-Aggregated", "isController": false}, {"data": [[1.0, 85.0], [2.0, 219.0], [4.0, 220.0], [8.0, 271.6666666666667], [5.0, 327.0], [3.0, 288.0], [6.0, 258.0], [7.0, 237.8]], "isOverall": false, "label": "home-12", "isController": false}, {"data": [[5.7333333333333325, 243.93333333333334]], "isOverall": false, "label": "home-12-Aggregated", "isController": false}, {"data": [[1.0, 83.0], [2.0, 71.0], [4.0, 71.0], [8.0, 71.66666666666667], [5.0, 268.0], [3.0, 87.0], [6.0, 189.0], [7.0, 70.0]], "isOverall": false, "label": "home-13", "isController": false}, {"data": [[5.7333333333333325, 101.53333333333333]], "isOverall": false, "label": "home-13-Aggregated", "isController": false}, {"data": [[8.0, 330.5], [4.0, 215.0], [2.0, 220.0], [1.0, 220.0], [5.0, 221.0], [6.0, 231.0], [3.0, 221.0], [7.0, 161.6]], "isOverall": false, "label": "signoff-12", "isController": false}, {"data": [[5.866666666666667, 230.53333333333333]], "isOverall": false, "label": "signoff-12-Aggregated", "isController": false}, {"data": [[1.0, 81.0], [2.0, 74.0], [4.0, 72.0], [8.0, 72.0], [5.0, 70.0], [3.0, 71.0], [6.0, 155.5], [7.0, 70.4]], "isOverall": false, "label": "home-14", "isController": false}, {"data": [[5.7333333333333325, 83.13333333333333]], "isOverall": false, "label": "home-14-Aggregated", "isController": false}, {"data": [[8.0, 325.25], [4.0, 223.0], [2.0, 218.0], [1.0, 215.0], [5.0, 223.0], [6.0, 231.0], [3.0, 223.0], [7.0, 160.2]], "isOverall": false, "label": "signoff-13", "isController": false}, {"data": [[5.866666666666667, 228.99999999999997]], "isOverall": false, "label": "signoff-13-Aggregated", "isController": false}, {"data": [[1.0, 154.0], [2.0, 153.0], [4.0, 155.0], [8.0, 142.66666666666666], [5.0, 145.0], [3.0, 144.0], [6.0, 272.5], [7.0, 151.4]], "isOverall": false, "label": "home-15", "isController": false}, {"data": [[5.7333333333333325, 165.39999999999998]], "isOverall": false, "label": "home-15-Aggregated", "isController": false}, {"data": [[8.0, 116.0], [4.0, 70.0], [2.0, 70.0], [1.0, 70.0], [5.0, 72.0], [6.0, 68.0], [3.0, 69.0], [7.0, 71.0]], "isOverall": false, "label": "signoff-14", "isController": false}, {"data": [[5.866666666666667, 82.53333333333333]], "isOverall": false, "label": "signoff-14-Aggregated", "isController": false}, {"data": [[8.0, 131.25], [4.0, 69.0], [2.0, 71.0], [1.0, 69.0], [5.0, 70.0], [6.0, 68.0], [3.0, 70.0], [7.0, 68.8]], "isOverall": false, "label": "signoff-15", "isController": false}, {"data": [[5.866666666666667, 85.73333333333333]], "isOverall": false, "label": "signoff-15-Aggregated", "isController": false}, {"data": [[8.0, 228.5], [4.0, 70.0], [2.0, 211.0], [1.0, 216.0], [5.0, 217.0], [6.0, 224.0], [3.0, 71.0], [7.0, 191.2]], "isOverall": false, "label": "signoff-10", "isController": false}, {"data": [[5.866666666666667, 191.93333333333334]], "isOverall": false, "label": "signoff-10-Aggregated", "isController": false}, {"data": [[8.0, 282.0], [4.0, 218.0], [2.0, 72.0], [1.0, 73.0], [5.0, 218.0], [6.0, 230.0], [3.0, 71.0], [7.0, 162.4]], "isOverall": false, "label": "signoff-11", "isController": false}, {"data": [[5.866666666666667, 188.1333333333333]], "isOverall": false, "label": "signoff-11-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 8.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 10509.8, "minX": 1.66843818E12, "maxY": 36878.333333333336, "series": [{"data": [[1.66843824E12, 36878.333333333336], [1.66843818E12, 21510.3]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66843824E12, 25504.7], [1.66843818E12, 10509.8]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66843824E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 69.0, "minX": 1.66843818E12, "maxY": 4713.166666666667, "series": [{"data": [[1.66843824E12, 227.375], [1.66843818E12, 227.14285714285714]], "isOverall": false, "label": "home-5", "isController": false}, {"data": [[1.66843824E12, 87.92857142857143], [1.66843818E12, 340.0]], "isOverall": false, "label": "signoff-7", "isController": false}, {"data": [[1.66843824E12, 224.625], [1.66843818E12, 232.42857142857142]], "isOverall": false, "label": "home-4", "isController": false}, {"data": [[1.66843824E12, 189.64285714285714], [1.66843818E12, 271.0]], "isOverall": false, "label": "signoff-8", "isController": false}, {"data": [[1.66843824E12, 184.375], [1.66843818E12, 191.28571428571428]], "isOverall": false, "label": "home-3", "isController": false}, {"data": [[1.66843824E12, 188.7142857142857], [1.66843818E12, 69.0]], "isOverall": false, "label": "signoff-9", "isController": false}, {"data": [[1.66843824E12, 157.375], [1.66843818E12, 191.57142857142856]], "isOverall": false, "label": "home-2", "isController": false}, {"data": [[1.66843824E12, 385.40000000000003], [1.66843818E12, 420.0]], "isOverall": false, "label": "select", "isController": false}, {"data": [[1.66843824E12, 190.0], [1.66843818E12, 160.2857142857143]], "isOverall": false, "label": "home-1", "isController": false}, {"data": [[1.66843824E12, 86.85714285714286], [1.66843818E12, 69.0]], "isOverall": false, "label": "signoff-3", "isController": false}, {"data": [[1.66843824E12, 222.875], [1.66843818E12, 328.0]], "isOverall": false, "label": "home-0", "isController": false}, {"data": [[1.66843824E12, 76.14285714285714], [1.66843818E12, 228.0]], "isOverall": false, "label": "signoff-4", "isController": false}, {"data": [[1.66843824E12, 87.42857142857143], [1.66843818E12, 139.0]], "isOverall": false, "label": "signoff-5", "isController": false}, {"data": [[1.66843824E12, 88.57142857142857], [1.66843818E12, 319.0]], "isOverall": false, "label": "signoff-6", "isController": false}, {"data": [[1.66843824E12, 83.28571428571428], [1.66843818E12, 212.0]], "isOverall": false, "label": "signoff-0", "isController": false}, {"data": [[1.66843824E12, 75.0], [1.66843818E12, 70.0]], "isOverall": false, "label": "signoff-1", "isController": false}, {"data": [[1.66843824E12, 86.21428571428571], [1.66843818E12, 230.0]], "isOverall": false, "label": "signoff-2", "isController": false}, {"data": [[1.66843824E12, 230.25], [1.66843818E12, 200.14285714285717]], "isOverall": false, "label": "home-9", "isController": false}, {"data": [[1.66843824E12, 230.875], [1.66843818E12, 206.7142857142857]], "isOverall": false, "label": "home-8", "isController": false}, {"data": [[1.66843824E12, 222.875], [1.66843818E12, 201.42857142857142]], "isOverall": false, "label": "home-7", "isController": false}, {"data": [[1.66843824E12, 227.62499999999997], [1.66843818E12, 231.42857142857142]], "isOverall": false, "label": "home-6", "isController": false}, {"data": [[1.66843824E12, 403.1818181818182], [1.66843818E12, 408.75]], "isOverall": false, "label": "order", "isController": false}, {"data": [[1.66843824E12, 194.8181818181818], [1.66843818E12, 145.5]], "isOverall": false, "label": "add to cart-9", "isController": false}, {"data": [[1.66843824E12, 167.63636363636365], [1.66843818E12, 145.0]], "isOverall": false, "label": "add to cart-7", "isController": false}, {"data": [[1.66843824E12, 196.36363636363637], [1.66843818E12, 145.5]], "isOverall": false, "label": "add to cart-8", "isController": false}, {"data": [[1.66843824E12, 89.90909090909092], [1.66843818E12, 113.5]], "isOverall": false, "label": "add to cart-5", "isController": false}, {"data": [[1.66843824E12, 90.54545454545453], [1.66843818E12, 118.0]], "isOverall": false, "label": "add to cart-6", "isController": false}, {"data": [[1.66843824E12, 88.0909090909091], [1.66843818E12, 112.0]], "isOverall": false, "label": "add to cart-3", "isController": false}, {"data": [[1.66843824E12, 75.36363636363636], [1.66843818E12, 113.75]], "isOverall": false, "label": "add to cart-4", "isController": false}, {"data": [[1.66843824E12, 74.27272727272727], [1.66843818E12, 72.0]], "isOverall": false, "label": "add to cart-1", "isController": false}, {"data": [[1.66843824E12, 87.18181818181819], [1.66843818E12, 115.25]], "isOverall": false, "label": "add to cart-2", "isController": false}, {"data": [[1.66843824E12, 73.09090909090911], [1.66843818E12, 114.0]], "isOverall": false, "label": "add to cart-0", "isController": false}, {"data": [[1.66843824E12, 405.375], [1.66843818E12, 297.2857142857143]], "isOverall": false, "label": "preLogin", "isController": false}, {"data": [[1.66843824E12, 548.5555555555555], [1.66843818E12, 537.5]], "isOverall": false, "label": "login", "isController": false}, {"data": [[1.66843824E12, 371.6153846153846], [1.66843818E12, 449.0]], "isOverall": false, "label": "confirmed", "isController": false}, {"data": [[1.66843824E12, 385.08333333333337], [1.66843818E12, 428.6666666666667]], "isOverall": false, "label": "confirm", "isController": false}, {"data": [[1.66843824E12, 78.33333333333334], [1.66843818E12, 128.0]], "isOverall": false, "label": "confirm-0", "isController": false}, {"data": [[1.66843824E12, 404.40000000000003], [1.66843818E12, 340.8]], "isOverall": false, "label": "cats", "isController": false}, {"data": [[1.66843824E12, 194.72727272727272], [1.66843818E12, 177.5]], "isOverall": false, "label": "order-7", "isController": false}, {"data": [[1.66843824E12, 89.75], [1.66843818E12, 123.66666666666667]], "isOverall": false, "label": "confirm-3", "isController": false}, {"data": [[1.66843824E12, 210.45454545454547], [1.66843818E12, 181.0]], "isOverall": false, "label": "order-8", "isController": false}, {"data": [[1.66843824E12, 88.75], [1.66843818E12, 123.0]], "isOverall": false, "label": "confirm-4", "isController": false}, {"data": [[1.66843824E12, 198.1818181818182], [1.66843818E12, 181.75]], "isOverall": false, "label": "order-9", "isController": false}, {"data": [[1.66843824E12, 74.41666666666667], [1.66843818E12, 73.33333333333333]], "isOverall": false, "label": "confirm-1", "isController": false}, {"data": [[1.66843824E12, 90.33333333333334], [1.66843818E12, 122.66666666666667]], "isOverall": false, "label": "confirm-2", "isController": false}, {"data": [[1.66843824E12, 88.99999999999999], [1.66843818E12, 113.0]], "isOverall": false, "label": "order-3", "isController": false}, {"data": [[1.66843824E12, 185.91666666666666], [1.66843818E12, 171.0]], "isOverall": false, "label": "confirm-7", "isController": false}, {"data": [[1.66843824E12, 88.18181818181817], [1.66843818E12, 111.75]], "isOverall": false, "label": "order-4", "isController": false}, {"data": [[1.66843824E12, 203.58333333333331], [1.66843818E12, 175.0]], "isOverall": false, "label": "confirm-8", "isController": false}, {"data": [[1.66843824E12, 89.18181818181819], [1.66843818E12, 111.0]], "isOverall": false, "label": "order-5", "isController": false}, {"data": [[1.66843824E12, 90.75000000000001], [1.66843818E12, 126.0]], "isOverall": false, "label": "confirm-5", "isController": false}, {"data": [[1.66843824E12, 91.72727272727272], [1.66843818E12, 111.5]], "isOverall": false, "label": "order-6", "isController": false}, {"data": [[1.66843824E12, 84.16666666666666], [1.66843818E12, 126.0]], "isOverall": false, "label": "confirm-6", "isController": false}, {"data": [[1.66843824E12, 86.81818181818181], [1.66843818E12, 114.25]], "isOverall": false, "label": "order-0", "isController": false}, {"data": [[1.66843824E12, 88.0], [1.66843818E12, 73.5]], "isOverall": false, "label": "order-1", "isController": false}, {"data": [[1.66843824E12, 211.49999999999997], [1.66843818E12, 174.0]], "isOverall": false, "label": "confirm-9", "isController": false}, {"data": [[1.66843824E12, 71.63636363636365], [1.66843818E12, 110.0]], "isOverall": false, "label": "order-2", "isController": false}, {"data": [[1.66843824E12, 86.78571428571429], [1.66843818E12, 69.0]], "isOverall": false, "label": "signoff-16", "isController": false}, {"data": [[1.66843824E12, 231.33333333333334], [1.66843818E12, 143.16666666666666]], "isOverall": false, "label": "login-10", "isController": false}, {"data": [[1.66843824E12, 243.66666666666666], [1.66843818E12, 215.5]], "isOverall": false, "label": "login-11", "isController": false}, {"data": [[1.66843824E12, 249.88888888888889], [1.66843818E12, 218.0]], "isOverall": false, "label": "login-12", "isController": false}, {"data": [[1.66843824E12, 4649.0], [1.66843818E12, 4713.166666666667]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.66843824E12, 239.77777777777777], [1.66843818E12, 213.83333333333334]], "isOverall": false, "label": "login-13", "isController": false}, {"data": [[1.66843824E12, 74.88888888888889], [1.66843818E12, 70.5]], "isOverall": false, "label": "login-14", "isController": false}, {"data": [[1.66843824E12, 74.0], [1.66843818E12, 71.0]], "isOverall": false, "label": "login-15", "isController": false}, {"data": [[1.66843824E12, 76.0], [1.66843818E12, 70.83333333333334]], "isOverall": false, "label": "login-16", "isController": false}, {"data": [[1.66843824E12, 75.5], [1.66843818E12, 106.2]], "isOverall": false, "label": "select-0", "isController": false}, {"data": [[1.66843824E12, 151.25], [1.66843818E12, 132.28571428571428]], "isOverall": false, "label": "preLogin-8", "isController": false}, {"data": [[1.66843824E12, 78.8], [1.66843818E12, 104.2]], "isOverall": false, "label": "select-6", "isController": false}, {"data": [[1.66843824E12, 152.375], [1.66843818E12, 123.42857142857143]], "isOverall": false, "label": "preLogin-7", "isController": false}, {"data": [[1.66843824E12, 78.7], [1.66843818E12, 107.4]], "isOverall": false, "label": "select-5", "isController": false}, {"data": [[1.66843824E12, 214.29999999999998], [1.66843818E12, 212.4]], "isOverall": false, "label": "select-8", "isController": false}, {"data": [[1.66843824E12, 238.5], [1.66843818E12, 134.57142857142858]], "isOverall": false, "label": "preLogin-9", "isController": false}, {"data": [[1.66843824E12, 178.1], [1.66843818E12, 194.8]], "isOverall": false, "label": "select-7", "isController": false}, {"data": [[1.66843824E12, 76.4], [1.66843818E12, 75.8]], "isOverall": false, "label": "select-2", "isController": false}, {"data": [[1.66843824E12, 90.5], [1.66843818E12, 102.2]], "isOverall": false, "label": "select-1", "isController": false}, {"data": [[1.66843824E12, 83.39999999999999], [1.66843818E12, 105.0]], "isOverall": false, "label": "select-4", "isController": false}, {"data": [[1.66843824E12, 78.2], [1.66843818E12, 100.8]], "isOverall": false, "label": "select-3", "isController": false}, {"data": [[1.66843824E12, 74.66666666666667], [1.66843818E12, 100.5]], "isOverall": false, "label": "login-3", "isController": false}, {"data": [[1.66843824E12, 73.33333333333331], [1.66843818E12, 75.33333333333334]], "isOverall": false, "label": "login-2", "isController": false}, {"data": [[1.66843824E12, 72.0], [1.66843818E12, 75.16666666666667]], "isOverall": false, "label": "login-1", "isController": false}, {"data": [[1.66843824E12, 77.11111111111111], [1.66843818E12, 100.5]], "isOverall": false, "label": "login-0", "isController": false}, {"data": [[1.66843824E12, 206.7], [1.66843818E12, 201.6]], "isOverall": false, "label": "select-9", "isController": false}, {"data": [[1.66843824E12, 185.11111111111111], [1.66843818E12, 147.0]], "isOverall": false, "label": "login-9", "isController": false}, {"data": [[1.66843824E12, 230.22222222222223], [1.66843818E12, 143.83333333333331]], "isOverall": false, "label": "login-8", "isController": false}, {"data": [[1.66843824E12, 76.55555555555554], [1.66843818E12, 98.16666666666667]], "isOverall": false, "label": "login-7", "isController": false}, {"data": [[1.66843824E12, 200.5], [1.66843818E12, 187.4]], "isOverall": false, "label": "cats-9", "isController": false}, {"data": [[1.66843824E12, 73.55555555555556], [1.66843818E12, 100.5]], "isOverall": false, "label": "login-6", "isController": false}, {"data": [[1.66843824E12, 229.4], [1.66843818E12, 188.4]], "isOverall": false, "label": "cats-8", "isController": false}, {"data": [[1.66843824E12, 72.44444444444444], [1.66843818E12, 103.16666666666667]], "isOverall": false, "label": "login-5", "isController": false}, {"data": [[1.66843824E12, 75.77777777777779], [1.66843818E12, 98.33333333333334]], "isOverall": false, "label": "login-4", "isController": false}, {"data": [[1.66843824E12, 74.75], [1.66843818E12, 75.42857142857143]], "isOverall": false, "label": "preLogin-0", "isController": false}, {"data": [[1.66843824E12, 79.9], [1.66843818E12, 72.6]], "isOverall": false, "label": "cats-5", "isController": false}, {"data": [[1.66843824E12, 93.50000000000001], [1.66843818E12, 73.0]], "isOverall": false, "label": "cats-4", "isController": false}, {"data": [[1.66843824E12, 85.375], [1.66843818E12, 76.71428571428571]], "isOverall": false, "label": "preLogin-2", "isController": false}, {"data": [[1.66843824E12, 230.2], [1.66843818E12, 188.0]], "isOverall": false, "label": "cats-7", "isController": false}, {"data": [[1.66843824E12, 89.125], [1.66843818E12, 76.42857142857143]], "isOverall": false, "label": "preLogin-1", "isController": false}, {"data": [[1.66843824E12, 95.6], [1.66843818E12, 92.0]], "isOverall": false, "label": "cats-6", "isController": false}, {"data": [[1.66843824E12, 86.625], [1.66843818E12, 76.71428571428571]], "isOverall": false, "label": "preLogin-4", "isController": false}, {"data": [[1.66843824E12, 93.5], [1.66843818E12, 75.2]], "isOverall": false, "label": "cats-1", "isController": false}, {"data": [[1.66843824E12, 83.375], [1.66843818E12, 75.57142857142857]], "isOverall": false, "label": "preLogin-3", "isController": false}, {"data": [[1.66843824E12, 77.9], [1.66843818E12, 72.6]], "isOverall": false, "label": "cats-0", "isController": false}, {"data": [[1.66843824E12, 88.74999999999999], [1.66843818E12, 78.85714285714286]], "isOverall": false, "label": "preLogin-6", "isController": false}, {"data": [[1.66843824E12, 94.30000000000001], [1.66843818E12, 74.0]], "isOverall": false, "label": "cats-3", "isController": false}, {"data": [[1.66843824E12, 84.875], [1.66843818E12, 75.57142857142857]], "isOverall": false, "label": "preLogin-5", "isController": false}, {"data": [[1.66843824E12, 78.9], [1.66843818E12, 75.8]], "isOverall": false, "label": "cats-2", "isController": false}, {"data": [[1.66843824E12, 365.6363636363636], [1.66843818E12, 376.75]], "isOverall": false, "label": "add to cart", "isController": false}, {"data": [[1.66843824E12, 196.23076923076925], [1.66843818E12, 143.0]], "isOverall": false, "label": "confirmed-8", "isController": false}, {"data": [[1.66843824E12, 174.2307692307692], [1.66843818E12, 141.0]], "isOverall": false, "label": "confirmed-9", "isController": false}, {"data": [[1.66843824E12, 88.3076923076923], [1.66843818E12, 151.0]], "isOverall": false, "label": "confirmed-6", "isController": false}, {"data": [[1.66843824E12, 184.76923076923077], [1.66843818E12, 140.0]], "isOverall": false, "label": "confirmed-7", "isController": false}, {"data": [[1.66843824E12, 85.23076923076924], [1.66843818E12, 150.5]], "isOverall": false, "label": "confirmed-4", "isController": false}, {"data": [[1.66843824E12, 86.53846153846155], [1.66843818E12, 150.0]], "isOverall": false, "label": "confirmed-5", "isController": false}, {"data": [[1.66843824E12, 71.84615384615384], [1.66843818E12, 144.0]], "isOverall": false, "label": "confirmed-2", "isController": false}, {"data": [[1.66843824E12, 86.38461538461537], [1.66843818E12, 149.0]], "isOverall": false, "label": "confirmed-3", "isController": false}, {"data": [[1.66843824E12, 85.23076923076923], [1.66843818E12, 162.5]], "isOverall": false, "label": "confirmed-0", "isController": false}, {"data": [[1.66843824E12, 85.23076923076923], [1.66843818E12, 71.0]], "isOverall": false, "label": "confirmed-1", "isController": false}, {"data": [[1.66843824E12, 558.3571428571429], [1.66843818E12, 673.0]], "isOverall": false, "label": "signoff", "isController": false}, {"data": [[1.66843824E12, 232.87500000000003], [1.66843818E12, 200.14285714285717]], "isOverall": false, "label": "home-10", "isController": false}, {"data": [[1.66843824E12, 251.37499999999994], [1.66843818E12, 224.85714285714286]], "isOverall": false, "label": "home-11", "isController": false}, {"data": [[1.66843824E12, 844.2500000000001], [1.66843818E12, 921.8571428571428]], "isOverall": false, "label": "home", "isController": false}, {"data": [[1.66843824E12, 259.625], [1.66843818E12, 226.0]], "isOverall": false, "label": "home-12", "isController": false}, {"data": [[1.66843824E12, 99.87499999999999], [1.66843818E12, 103.42857142857143]], "isOverall": false, "label": "home-13", "isController": false}, {"data": [[1.66843824E12, 242.0], [1.66843818E12, 70.0]], "isOverall": false, "label": "signoff-12", "isController": false}, {"data": [[1.66843824E12, 92.5], [1.66843818E12, 72.42857142857142]], "isOverall": false, "label": "home-14", "isController": false}, {"data": [[1.66843824E12, 240.42857142857144], [1.66843818E12, 69.0]], "isOverall": false, "label": "signoff-13", "isController": false}, {"data": [[1.66843824E12, 179.625], [1.66843818E12, 149.14285714285714]], "isOverall": false, "label": "home-15", "isController": false}, {"data": [[1.66843824E12, 83.42857142857142], [1.66843818E12, 70.0]], "isOverall": false, "label": "signoff-14", "isController": false}, {"data": [[1.66843824E12, 86.85714285714285], [1.66843818E12, 70.0]], "isOverall": false, "label": "signoff-15", "isController": false}, {"data": [[1.66843824E12, 200.07142857142858], [1.66843818E12, 78.0]], "isOverall": false, "label": "signoff-10", "isController": false}, {"data": [[1.66843824E12, 196.57142857142856], [1.66843818E12, 70.0]], "isOverall": false, "label": "signoff-11", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66843824E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66843818E12, "maxY": 1191.3333333333335, "series": [{"data": [[1.66843824E12, 227.25], [1.66843818E12, 227.14285714285714]], "isOverall": false, "label": "home-5", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-7", "isController": false}, {"data": [[1.66843824E12, 224.625], [1.66843818E12, 232.28571428571428]], "isOverall": false, "label": "home-4", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-8", "isController": false}, {"data": [[1.66843824E12, 184.375], [1.66843818E12, 191.14285714285714]], "isOverall": false, "label": "home-3", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-9", "isController": false}, {"data": [[1.66843824E12, 157.375], [1.66843818E12, 190.71428571428572]], "isOverall": false, "label": "home-2", "isController": false}, {"data": [[1.66843824E12, 75.5], [1.66843818E12, 106.0]], "isOverall": false, "label": "select", "isController": false}, {"data": [[1.66843824E12, 189.375], [1.66843818E12, 159.71428571428572]], "isOverall": false, "label": "home-1", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-3", "isController": false}, {"data": [[1.66843824E12, 222.75], [1.66843818E12, 326.85714285714283]], "isOverall": false, "label": "home-0", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-4", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-5", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-6", "isController": false}, {"data": [[1.66843824E12, 83.28571428571428], [1.66843818E12, 212.0]], "isOverall": false, "label": "signoff-0", "isController": false}, {"data": [[1.66843824E12, 74.85714285714285], [1.66843818E12, 70.0]], "isOverall": false, "label": "signoff-1", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-2", "isController": false}, {"data": [[1.66843824E12, 230.25], [1.66843818E12, 200.14285714285717]], "isOverall": false, "label": "home-9", "isController": false}, {"data": [[1.66843824E12, 230.875], [1.66843818E12, 206.57142857142858]], "isOverall": false, "label": "home-8", "isController": false}, {"data": [[1.66843824E12, 222.875], [1.66843818E12, 201.28571428571428]], "isOverall": false, "label": "home-7", "isController": false}, {"data": [[1.66843824E12, 227.62499999999997], [1.66843818E12, 231.14285714285714]], "isOverall": false, "label": "home-6", "isController": false}, {"data": [[1.66843824E12, 86.72727272727273], [1.66843818E12, 113.75]], "isOverall": false, "label": "order", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "add to cart-9", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "add to cart-7", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "add to cart-8", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "add to cart-5", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "add to cart-6", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "add to cart-3", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "add to cart-4", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "add to cart-1", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "add to cart-2", "isController": false}, {"data": [[1.66843824E12, 72.9090909090909], [1.66843818E12, 113.75]], "isOverall": false, "label": "add to cart-0", "isController": false}, {"data": [[1.66843824E12, 74.75], [1.66843818E12, 75.28571428571428]], "isOverall": false, "label": "preLogin", "isController": false}, {"data": [[1.66843824E12, 77.11111111111111], [1.66843818E12, 100.5]], "isOverall": false, "label": "login", "isController": false}, {"data": [[1.66843824E12, 85.23076923076923], [1.66843818E12, 162.0]], "isOverall": false, "label": "confirmed", "isController": false}, {"data": [[1.66843824E12, 78.08333333333333], [1.66843818E12, 127.66666666666667]], "isOverall": false, "label": "confirm", "isController": false}, {"data": [[1.66843824E12, 78.08333333333333], [1.66843818E12, 127.66666666666667]], "isOverall": false, "label": "confirm-0", "isController": false}, {"data": [[1.66843824E12, 77.9], [1.66843818E12, 72.6]], "isOverall": false, "label": "cats", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "order-7", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirm-3", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "order-8", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirm-4", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "order-9", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirm-1", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirm-2", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "order-3", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirm-7", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "order-4", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirm-8", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "order-5", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirm-5", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "order-6", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirm-6", "isController": false}, {"data": [[1.66843824E12, 86.72727272727273], [1.66843818E12, 113.75]], "isOverall": false, "label": "order-0", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "order-1", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirm-9", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "order-2", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-16", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-10", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-11", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-12", "isController": false}, {"data": [[1.66843824E12, 951.8888888888889], [1.66843818E12, 1191.3333333333335]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-13", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-14", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-15", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-16", "isController": false}, {"data": [[1.66843824E12, 75.5], [1.66843818E12, 106.0]], "isOverall": false, "label": "select-0", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "preLogin-8", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "select-6", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "preLogin-7", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "select-5", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "select-8", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "preLogin-9", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "select-7", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "select-2", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "select-1", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "select-4", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "select-3", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-3", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-2", "isController": false}, {"data": [[1.66843824E12, 72.0], [1.66843818E12, 75.0]], "isOverall": false, "label": "login-1", "isController": false}, {"data": [[1.66843824E12, 77.11111111111111], [1.66843818E12, 100.5]], "isOverall": false, "label": "login-0", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "select-9", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-9", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-8", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-7", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "cats-9", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-6", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "cats-8", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-5", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-4", "isController": false}, {"data": [[1.66843824E12, 74.75], [1.66843818E12, 75.28571428571428]], "isOverall": false, "label": "preLogin-0", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "cats-5", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "cats-4", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "preLogin-2", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "cats-7", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "preLogin-1", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "cats-6", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "preLogin-4", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "cats-1", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "preLogin-3", "isController": false}, {"data": [[1.66843824E12, 77.9], [1.66843818E12, 72.6]], "isOverall": false, "label": "cats-0", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "preLogin-6", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "cats-3", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "preLogin-5", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "cats-2", "isController": false}, {"data": [[1.66843824E12, 72.9090909090909], [1.66843818E12, 113.75]], "isOverall": false, "label": "add to cart", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirmed-8", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirmed-9", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirmed-6", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirmed-7", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirmed-4", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirmed-5", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirmed-2", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirmed-3", "isController": false}, {"data": [[1.66843824E12, 85.23076923076923], [1.66843818E12, 162.0]], "isOverall": false, "label": "confirmed-0", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirmed-1", "isController": false}, {"data": [[1.66843824E12, 83.28571428571428], [1.66843818E12, 212.0]], "isOverall": false, "label": "signoff", "isController": false}, {"data": [[1.66843824E12, 232.625], [1.66843818E12, 200.14285714285717]], "isOverall": false, "label": "home-10", "isController": false}, {"data": [[1.66843824E12, 251.37499999999994], [1.66843818E12, 224.85714285714286]], "isOverall": false, "label": "home-11", "isController": false}, {"data": [[1.66843824E12, 222.75], [1.66843818E12, 326.85714285714283]], "isOverall": false, "label": "home", "isController": false}, {"data": [[1.66843824E12, 259.625], [1.66843818E12, 225.85714285714283]], "isOverall": false, "label": "home-12", "isController": false}, {"data": [[1.66843824E12, 99.625], [1.66843818E12, 103.14285714285714]], "isOverall": false, "label": "home-13", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-12", "isController": false}, {"data": [[1.66843824E12, 92.5], [1.66843818E12, 72.42857142857142]], "isOverall": false, "label": "home-14", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-13", "isController": false}, {"data": [[1.66843824E12, 103.12500000000001], [1.66843818E12, 74.28571428571429]], "isOverall": false, "label": "home-15", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-14", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-15", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-10", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-11", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66843824E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66843818E12, "maxY": 453.1666666666667, "series": [{"data": [[1.66843824E12, 153.75], [1.66843818E12, 156.14285714285714]], "isOverall": false, "label": "home-5", "isController": false}, {"data": [[1.66843824E12, 10.714285714285715], [1.66843818E12, 269.0]], "isOverall": false, "label": "signoff-7", "isController": false}, {"data": [[1.66843824E12, 153.125], [1.66843818E12, 162.14285714285714]], "isOverall": false, "label": "home-4", "isController": false}, {"data": [[1.66843824E12, 107.57142857142854], [1.66843818E12, 201.0]], "isOverall": false, "label": "signoff-8", "isController": false}, {"data": [[1.66843824E12, 113.125], [1.66843818E12, 118.14285714285712]], "isOverall": false, "label": "home-3", "isController": false}, {"data": [[1.66843824E12, 117.14285714285717], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-9", "isController": false}, {"data": [[1.66843824E12, 78.75], [1.66843818E12, 114.57142857142857]], "isOverall": false, "label": "home-2", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 32.2]], "isOverall": false, "label": "select", "isController": false}, {"data": [[1.66843824E12, 116.5], [1.66843818E12, 86.0]], "isOverall": false, "label": "home-1", "isController": false}, {"data": [[1.66843824E12, 10.928571428571429], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-3", "isController": false}, {"data": [[1.66843824E12, 150.87500000000003], [1.66843818E12, 250.14285714285714]], "isOverall": false, "label": "home-0", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 156.0]], "isOverall": false, "label": "signoff-4", "isController": false}, {"data": [[1.66843824E12, 10.428571428571429], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-5", "isController": false}, {"data": [[1.66843824E12, 11.0], [1.66843818E12, 251.0]], "isOverall": false, "label": "signoff-6", "isController": false}, {"data": [[1.66843824E12, 10.214285714285714], [1.66843818E12, 143.0]], "isOverall": false, "label": "signoff-0", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-1", "isController": false}, {"data": [[1.66843824E12, 10.214285714285714], [1.66843818E12, 158.0]], "isOverall": false, "label": "signoff-2", "isController": false}, {"data": [[1.66843824E12, 158.25000000000003], [1.66843818E12, 127.14285714285714]], "isOverall": false, "label": "home-9", "isController": false}, {"data": [[1.66843824E12, 158.75], [1.66843818E12, 134.85714285714286]], "isOverall": false, "label": "home-8", "isController": false}, {"data": [[1.66843824E12, 152.125], [1.66843818E12, 128.57142857142858]], "isOverall": false, "label": "home-7", "isController": false}, {"data": [[1.66843824E12, 153.375], [1.66843818E12, 160.0]], "isOverall": false, "label": "home-6", "isController": false}, {"data": [[1.66843824E12, 13.454545454545453], [1.66843818E12, 41.5]], "isOverall": false, "label": "order", "isController": false}, {"data": [[1.66843824E12, 122.54545454545455], [1.66843818E12, 73.25]], "isOverall": false, "label": "add to cart-9", "isController": false}, {"data": [[1.66843824E12, 96.9090909090909], [1.66843818E12, 74.25]], "isOverall": false, "label": "add to cart-7", "isController": false}, {"data": [[1.66843824E12, 120.63636363636363], [1.66843818E12, 74.0]], "isOverall": false, "label": "add to cart-8", "isController": false}, {"data": [[1.66843824E12, 14.09090909090909], [1.66843818E12, 42.75]], "isOverall": false, "label": "add to cart-5", "isController": false}, {"data": [[1.66843824E12, 14.09090909090909], [1.66843818E12, 43.25]], "isOverall": false, "label": "add to cart-6", "isController": false}, {"data": [[1.66843824E12, 13.545454545454547], [1.66843818E12, 41.25]], "isOverall": false, "label": "add to cart-3", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 41.5]], "isOverall": false, "label": "add to cart-4", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "add to cart-1", "isController": false}, {"data": [[1.66843824E12, 13.818181818181817], [1.66843818E12, 41.0]], "isOverall": false, "label": "add to cart-2", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 39.75]], "isOverall": false, "label": "add to cart-0", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "preLogin", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 26.333333333333336]], "isOverall": false, "label": "login", "isController": false}, {"data": [[1.66843824E12, 11.0], [1.66843818E12, 89.5]], "isOverall": false, "label": "confirmed", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 51.66666666666667]], "isOverall": false, "label": "confirm", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 51.66666666666667]], "isOverall": false, "label": "confirm-0", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "cats", "isController": false}, {"data": [[1.66843824E12, 123.00000000000001], [1.66843818E12, 108.0]], "isOverall": false, "label": "order-7", "isController": false}, {"data": [[1.66843824E12, 12.25], [1.66843818E12, 49.66666666666667]], "isOverall": false, "label": "confirm-3", "isController": false}, {"data": [[1.66843824E12, 136.9090909090909], [1.66843818E12, 110.5]], "isOverall": false, "label": "order-8", "isController": false}, {"data": [[1.66843824E12, 12.25], [1.66843818E12, 51.0]], "isOverall": false, "label": "confirm-4", "isController": false}, {"data": [[1.66843824E12, 125.18181818181819], [1.66843818E12, 110.25]], "isOverall": false, "label": "order-9", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirm-1", "isController": false}, {"data": [[1.66843824E12, 11.916666666666666], [1.66843818E12, 49.33333333333333]], "isOverall": false, "label": "confirm-2", "isController": false}, {"data": [[1.66843824E12, 14.454545454545455], [1.66843818E12, 39.25]], "isOverall": false, "label": "order-3", "isController": false}, {"data": [[1.66843824E12, 114.16666666666667], [1.66843818E12, 101.33333333333333]], "isOverall": false, "label": "confirm-7", "isController": false}, {"data": [[1.66843824E12, 13.636363636363638], [1.66843818E12, 39.5]], "isOverall": false, "label": "order-4", "isController": false}, {"data": [[1.66843824E12, 129.58333333333334], [1.66843818E12, 104.66666666666667]], "isOverall": false, "label": "confirm-8", "isController": false}, {"data": [[1.66843824E12, 14.454545454545455], [1.66843818E12, 39.0]], "isOverall": false, "label": "order-5", "isController": false}, {"data": [[1.66843824E12, 12.0], [1.66843818E12, 51.66666666666667]], "isOverall": false, "label": "confirm-5", "isController": false}, {"data": [[1.66843824E12, 14.63636363636364], [1.66843818E12, 37.0]], "isOverall": false, "label": "order-6", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 51.66666666666667]], "isOverall": false, "label": "confirm-6", "isController": false}, {"data": [[1.66843824E12, 13.454545454545453], [1.66843818E12, 41.5]], "isOverall": false, "label": "order-0", "isController": false}, {"data": [[1.66843824E12, 14.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "order-1", "isController": false}, {"data": [[1.66843824E12, 139.25], [1.66843818E12, 103.0]], "isOverall": false, "label": "confirm-9", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 37.75]], "isOverall": false, "label": "order-2", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-16", "isController": false}, {"data": [[1.66843824E12, 155.11111111111111], [1.66843818E12, 72.0]], "isOverall": false, "label": "login-10", "isController": false}, {"data": [[1.66843824E12, 165.0], [1.66843818E12, 144.16666666666666]], "isOverall": false, "label": "login-11", "isController": false}, {"data": [[1.66843824E12, 170.66666666666666], [1.66843818E12, 145.5]], "isOverall": false, "label": "login-12", "isController": false}, {"data": [[1.66843824E12, 199.33333333333334], [1.66843818E12, 453.1666666666667]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.66843824E12, 162.22222222222223], [1.66843818E12, 143.0]], "isOverall": false, "label": "login-13", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-14", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-15", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-16", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 32.2]], "isOverall": false, "label": "select-0", "isController": false}, {"data": [[1.66843824E12, 69.375], [1.66843818E12, 61.57142857142857]], "isOverall": false, "label": "preLogin-8", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 29.6]], "isOverall": false, "label": "select-6", "isController": false}, {"data": [[1.66843824E12, 69.125], [1.66843818E12, 52.71428571428572]], "isOverall": false, "label": "preLogin-7", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 32.0]], "isOverall": false, "label": "select-5", "isController": false}, {"data": [[1.66843824E12, 137.0], [1.66843818E12, 126.2]], "isOverall": false, "label": "select-8", "isController": false}, {"data": [[1.66843824E12, 158.875], [1.66843818E12, 62.42857142857143]], "isOverall": false, "label": "preLogin-9", "isController": false}, {"data": [[1.66843824E12, 106.9], [1.66843818E12, 124.6]], "isOverall": false, "label": "select-7", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "select-2", "isController": false}, {"data": [[1.66843824E12, 14.799999999999999], [1.66843818E12, 29.6]], "isOverall": false, "label": "select-1", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 30.6]], "isOverall": false, "label": "select-4", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 28.8]], "isOverall": false, "label": "select-3", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 27.666666666666668]], "isOverall": false, "label": "login-3", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-2", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "login-1", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 26.333333333333336]], "isOverall": false, "label": "login-0", "isController": false}, {"data": [[1.66843824E12, 136.0], [1.66843818E12, 126.6]], "isOverall": false, "label": "select-9", "isController": false}, {"data": [[1.66843824E12, 108.33333333333334], [1.66843818E12, 74.83333333333333]], "isOverall": false, "label": "login-9", "isController": false}, {"data": [[1.66843824E12, 154.11111111111114], [1.66843818E12, 72.16666666666666]], "isOverall": false, "label": "login-8", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 24.666666666666668]], "isOverall": false, "label": "login-7", "isController": false}, {"data": [[1.66843824E12, 117.19999999999999], [1.66843818E12, 115.8]], "isOverall": false, "label": "cats-9", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 26.333333333333336]], "isOverall": false, "label": "login-6", "isController": false}, {"data": [[1.66843824E12, 149.7], [1.66843818E12, 118.2]], "isOverall": false, "label": "cats-8", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 27.166666666666668]], "isOverall": false, "label": "login-5", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 26.333333333333336]], "isOverall": false, "label": "login-4", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "preLogin-0", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "cats-5", "isController": false}, {"data": [[1.66843824E12, 15.7], [1.66843818E12, 0.0]], "isOverall": false, "label": "cats-4", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "preLogin-2", "isController": false}, {"data": [[1.66843824E12, 149.70000000000002], [1.66843818E12, 117.6]], "isOverall": false, "label": "cats-7", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "preLogin-1", "isController": false}, {"data": [[1.66843824E12, 15.6], [1.66843818E12, 0.0]], "isOverall": false, "label": "cats-6", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "preLogin-4", "isController": false}, {"data": [[1.66843824E12, 16.2], [1.66843818E12, 0.0]], "isOverall": false, "label": "cats-1", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "preLogin-3", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "cats-0", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "preLogin-6", "isController": false}, {"data": [[1.66843824E12, 16.599999999999998], [1.66843818E12, 0.0]], "isOverall": false, "label": "cats-3", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "preLogin-5", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "cats-2", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 39.75]], "isOverall": false, "label": "add to cart", "isController": false}, {"data": [[1.66843824E12, 124.38461538461536], [1.66843818E12, 73.0]], "isOverall": false, "label": "confirmed-8", "isController": false}, {"data": [[1.66843824E12, 102.61538461538461], [1.66843818E12, 71.5]], "isOverall": false, "label": "confirmed-9", "isController": false}, {"data": [[1.66843824E12, 12.692307692307692], [1.66843818E12, 77.5]], "isOverall": false, "label": "confirmed-6", "isController": false}, {"data": [[1.66843824E12, 101.76923076923077], [1.66843818E12, 71.0]], "isOverall": false, "label": "confirmed-7", "isController": false}, {"data": [[1.66843824E12, 11.69230769230769], [1.66843818E12, 78.0]], "isOverall": false, "label": "confirmed-4", "isController": false}, {"data": [[1.66843824E12, 12.0], [1.66843818E12, 76.5]], "isOverall": false, "label": "confirmed-5", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 74.0]], "isOverall": false, "label": "confirmed-2", "isController": false}, {"data": [[1.66843824E12, 12.0], [1.66843818E12, 76.5]], "isOverall": false, "label": "confirmed-3", "isController": false}, {"data": [[1.66843824E12, 11.0], [1.66843818E12, 89.5]], "isOverall": false, "label": "confirmed-0", "isController": false}, {"data": [[1.66843824E12, 12.692307692307692], [1.66843818E12, 0.0]], "isOverall": false, "label": "confirmed-1", "isController": false}, {"data": [[1.66843824E12, 10.214285714285714], [1.66843818E12, 143.0]], "isOverall": false, "label": "signoff", "isController": false}, {"data": [[1.66843824E12, 151.75000000000003], [1.66843818E12, 118.42857142857143]], "isOverall": false, "label": "home-10", "isController": false}, {"data": [[1.66843824E12, 180.87500000000003], [1.66843818E12, 152.0]], "isOverall": false, "label": "home-11", "isController": false}, {"data": [[1.66843824E12, 150.87500000000003], [1.66843818E12, 250.14285714285714]], "isOverall": false, "label": "home", "isController": false}, {"data": [[1.66843824E12, 187.875], [1.66843818E12, 151.57142857142856]], "isOverall": false, "label": "home-12", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 27.714285714285708]], "isOverall": false, "label": "home-13", "isController": false}, {"data": [[1.66843824E12, 169.8571428571429], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-12", "isController": false}, {"data": [[1.66843824E12, 0.0], [1.66843818E12, 0.0]], "isOverall": false, "label": "home-14", "isController": false}, {"data": [[1.66843824E12, 169.57142857142856], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-13", "isController": false}, {"data": [[1.66843824E12, 31.625000000000004], [1.66843818E12, 0.0]], "isOverall": false, "label": "home-15", "isController": false}, {"data": [[1.66843824E12, 10.428571428571429], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-14", "isController": false}, {"data": [[1.66843824E12, 10.428571428571429], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-15", "isController": false}, {"data": [[1.66843824E12, 128.7142857142857], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-10", "isController": false}, {"data": [[1.66843824E12, 124.28571428571428], [1.66843818E12, 0.0]], "isOverall": false, "label": "signoff-11", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66843824E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 67.0, "minX": 1.66843818E12, "maxY": 1498.0, "series": [{"data": [[1.66843824E12, 1044.0], [1.66843818E12, 1498.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66843824E12, 67.0], [1.66843818E12, 68.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66843824E12, 285.2000000000003], [1.66843818E12, 268.4]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66843824E12, 667.24], [1.66843818E12, 818.96]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66843824E12, 78.0], [1.66843818E12, 79.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.66843824E12, 376.0], [1.66843818E12, 376.5999999999998]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66843824E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 72.0, "minX": 3.0, "maxY": 222.0, "series": [{"data": [[32.0, 216.5], [33.0, 77.0], [35.0, 76.5], [36.0, 83.5], [37.0, 216.0], [39.0, 85.5], [40.0, 82.0], [41.0, 91.0], [43.0, 76.0], [45.0, 213.0], [47.0, 77.0], [46.0, 213.0], [49.0, 216.0], [3.0, 222.0], [51.0, 78.0], [53.0, 212.0], [4.0, 213.0], [69.0, 75.0], [6.0, 72.0], [7.0, 215.0], [11.0, 73.5], [12.0, 76.0], [14.0, 73.0], [15.0, 76.0], [16.0, 75.5], [17.0, 210.0], [18.0, 72.0], [19.0, 75.0], [20.0, 75.5], [21.0, 146.0], [22.0, 75.0], [23.0, 75.0], [25.0, 76.0], [28.0, 121.0], [29.0, 77.0], [30.0, 131.5], [31.0, 81.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 69.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 3.0, "maxY": 78.0, "series": [{"data": [[32.0, 0.0], [33.0, 0.0], [35.0, 0.0], [36.0, 72.0], [37.0, 0.0], [39.0, 0.0], [40.0, 0.0], [41.0, 0.0], [43.0, 0.0], [45.0, 0.0], [47.0, 0.0], [46.0, 0.0], [49.0, 0.0], [3.0, 0.0], [51.0, 0.0], [53.0, 0.0], [4.0, 0.0], [69.0, 0.0], [6.0, 35.5], [7.0, 0.0], [11.0, 0.0], [12.0, 0.0], [14.0, 0.0], [15.0, 0.0], [16.0, 0.0], [17.0, 78.0], [18.0, 0.0], [19.0, 0.0], [20.0, 0.0], [21.0, 0.0], [22.0, 0.0], [23.0, 0.0], [25.0, 0.0], [28.0, 0.0], [29.0, 0.0], [30.0, 0.0], [31.0, 72.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 69.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 9.616666666666667, "minX": 1.66843818E12, "maxY": 22.883333333333333, "series": [{"data": [[1.66843824E12, 22.883333333333333], [1.66843818E12, 9.616666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66843824E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.11666666666666667, "minX": 1.66843818E12, "maxY": 17.0, "series": [{"data": [[1.66843824E12, 5.533333333333333], [1.66843818E12, 3.216666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66843824E12, 0.38333333333333336], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.66843824E12, 17.0], [1.66843818E12, 6.25]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66843824E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66843818E12, "maxY": 0.23333333333333334, "series": [{"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "select-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "select-8-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "cats-1-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "order-6-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-9-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "home-12-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-2-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-13-success", "isController": false}, {"data": [[1.66843824E12, 0.2], [1.66843818E12, 0.05]], "isOverall": false, "label": "confirm-7-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "add to cart-3-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "home-4-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "select-4-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-2-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "Test-success", "isController": true}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "preLogin-6-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "add to cart-success", "isController": false}, {"data": [[1.66843824E12, 0.21666666666666667], [1.66843818E12, 0.03333333333333333]], "isOverall": false, "label": "confirmed-9-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-9-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "select-1-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "add to cart-7-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "cats-8-success", "isController": false}, {"data": [[1.66843824E12, 0.21666666666666667], [1.66843818E12, 0.03333333333333333]], "isOverall": false, "label": "confirmed-4-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "home-9-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "home-0-success", "isController": false}, {"data": [[1.66843824E12, 0.2], [1.66843818E12, 0.05]], "isOverall": false, "label": "confirm-3-success", "isController": false}, {"data": [[1.66843824E12, 0.21666666666666667], [1.66843818E12, 0.03333333333333333]], "isOverall": false, "label": "confirmed-0-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-16-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "cats-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "order-2-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-5-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-6-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "order-7-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "cats-4-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "select-7-success", "isController": false}, {"data": [[1.66843824E12, 0.2], [1.66843818E12, 0.05]], "isOverall": false, "label": "confirm-0-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-12-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "home-7-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-14-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-1-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "cats-0-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "select-3-success", "isController": false}, {"data": [[1.66843824E12, 0.2], [1.66843818E12, 0.05]], "isOverall": false, "label": "confirm-8-success", "isController": false}, {"data": [[1.66843824E12, 0.21666666666666667], [1.66843818E12, 0.03333333333333333]], "isOverall": false, "label": "confirmed-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "home-13-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "preLogin-2-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "add to cart-4-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "select-0-success", "isController": false}, {"data": [[1.66843824E12, 0.21666666666666667], [1.66843818E12, 0.03333333333333333]], "isOverall": false, "label": "confirmed-7-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-10-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "home-3-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-4-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "add to cart-8-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-8-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-3-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "preLogin-5-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "cats-7-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-7-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "order-3-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "preLogin-9-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "preLogin-success", "isController": false}, {"data": [[1.66843824E12, 0.2], [1.66843818E12, 0.05]], "isOverall": false, "label": "confirm-4-success", "isController": false}, {"data": [[1.66843824E12, 0.21666666666666667], [1.66843818E12, 0.03333333333333333]], "isOverall": false, "label": "confirmed-3-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "order-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-15-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "order-8-success", "isController": false}, {"data": [[1.66843824E12, 0.2], [1.66843818E12, 0.05]], "isOverall": false, "label": "confirm-1-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "cats-3-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-11-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "select-6-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-15-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "home-10-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "add to cart-1-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "home-6-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "preLogin-1-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-11-success", "isController": false}, {"data": [[1.66843824E12, 0.2], [1.66843818E12, 0.05]], "isOverall": false, "label": "confirm-9-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-0-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-0-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "home-2-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "add to cart-5-success", "isController": false}, {"data": [[1.66843824E12, 0.21666666666666667], [1.66843818E12, 0.03333333333333333]], "isOverall": false, "label": "confirmed-6-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "preLogin-4-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-7-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "home-14-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-4-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "order-0-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-3-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "preLogin-8-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-14-success", "isController": false}, {"data": [[1.66843824E12, 0.2], [1.66843818E12, 0.05]], "isOverall": false, "label": "confirm-5-success", "isController": false}, {"data": [[1.66843824E12, 0.21666666666666667], [1.66843818E12, 0.03333333333333333]], "isOverall": false, "label": "confirmed-2-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "cats-6-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "add to cart-0-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-8-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "order-4-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "add to cart-9-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "order-9-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "select-9-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-10-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-16-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "order-5-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "cats-2-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "add to cart-2-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "select-5-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "home-11-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "home-5-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-12-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "add to cart-6-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-6-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "preLogin-3-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-1-success", "isController": false}, {"data": [[1.66843824E12, 0.21666666666666667], [1.66843818E12, 0.03333333333333333]], "isOverall": false, "label": "confirmed-8-success", "isController": false}, {"data": [[1.66843824E12, 0.18333333333333332], [1.66843818E12, 0.06666666666666667]], "isOverall": false, "label": "order-1-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "select-2-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "home-1-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "cats-9-success", "isController": false}, {"data": [[1.66843824E12, 0.21666666666666667], [1.66843818E12, 0.03333333333333333]], "isOverall": false, "label": "confirmed-5-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "home-15-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "preLogin-0-success", "isController": false}, {"data": [[1.66843824E12, 0.2], [1.66843818E12, 0.05]], "isOverall": false, "label": "confirm-6-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "home-8-success", "isController": false}, {"data": [[1.66843824E12, 0.23333333333333334], [1.66843818E12, 0.016666666666666666]], "isOverall": false, "label": "signoff-13-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "preLogin-7-success", "isController": false}, {"data": [[1.66843824E12, 0.15], [1.66843818E12, 0.1]], "isOverall": false, "label": "login-5-success", "isController": false}, {"data": [[1.66843824E12, 0.13333333333333333], [1.66843818E12, 0.11666666666666667]], "isOverall": false, "label": "home-success", "isController": false}, {"data": [[1.66843824E12, 0.16666666666666666], [1.66843818E12, 0.08333333333333333]], "isOverall": false, "label": "cats-5-success", "isController": false}, {"data": [[1.66843824E12, 0.2], [1.66843818E12, 0.05]], "isOverall": false, "label": "confirm-2-success", "isController": false}, {"data": [[1.66843824E12, 0.21666666666666667], [1.66843818E12, 0.03333333333333333]], "isOverall": false, "label": "confirmed-1-success", "isController": false}, {"data": [[1.66843824E12, 0.2], [1.66843818E12, 0.05]], "isOverall": false, "label": "confirm-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66843824E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 9.683333333333334, "minX": 1.66843818E12, "maxY": 23.066666666666666, "series": [{"data": [[1.66843824E12, 23.066666666666666], [1.66843818E12, 9.683333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66843824E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
