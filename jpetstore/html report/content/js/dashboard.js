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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9801526717557252, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "home-5"], "isController": false}, {"data": [1.0, 500, 1500, "signoff-7"], "isController": false}, {"data": [1.0, 500, 1500, "home-4"], "isController": false}, {"data": [1.0, 500, 1500, "signoff-8"], "isController": false}, {"data": [1.0, 500, 1500, "home-3"], "isController": false}, {"data": [1.0, 500, 1500, "signoff-9"], "isController": false}, {"data": [1.0, 500, 1500, "home-2"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "select"], "isController": false}, {"data": [1.0, 500, 1500, "home-1"], "isController": false}, {"data": [1.0, 500, 1500, "signoff-3"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "home-0"], "isController": false}, {"data": [1.0, 500, 1500, "signoff-4"], "isController": false}, {"data": [1.0, 500, 1500, "signoff-5"], "isController": false}, {"data": [1.0, 500, 1500, "signoff-6"], "isController": false}, {"data": [1.0, 500, 1500, "signoff-0"], "isController": false}, {"data": [1.0, 500, 1500, "signoff-1"], "isController": false}, {"data": [1.0, 500, 1500, "signoff-2"], "isController": false}, {"data": [1.0, 500, 1500, "home-9"], "isController": false}, {"data": [1.0, 500, 1500, "home-8"], "isController": false}, {"data": [1.0, 500, 1500, "home-7"], "isController": false}, {"data": [1.0, 500, 1500, "home-6"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "order"], "isController": false}, {"data": [1.0, 500, 1500, "add to cart-9"], "isController": false}, {"data": [1.0, 500, 1500, "add to cart-7"], "isController": false}, {"data": [1.0, 500, 1500, "add to cart-8"], "isController": false}, {"data": [1.0, 500, 1500, "add to cart-5"], "isController": false}, {"data": [1.0, 500, 1500, "add to cart-6"], "isController": false}, {"data": [1.0, 500, 1500, "add to cart-3"], "isController": false}, {"data": [1.0, 500, 1500, "add to cart-4"], "isController": false}, {"data": [1.0, 500, 1500, "add to cart-1"], "isController": false}, {"data": [1.0, 500, 1500, "add to cart-2"], "isController": false}, {"data": [1.0, 500, 1500, "add to cart-0"], "isController": false}, {"data": [0.9, 500, 1500, "preLogin"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "login"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "confirmed"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "confirm"], "isController": false}, {"data": [1.0, 500, 1500, "confirm-0"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "cats"], "isController": false}, {"data": [1.0, 500, 1500, "order-7"], "isController": false}, {"data": [1.0, 500, 1500, "confirm-3"], "isController": false}, {"data": [1.0, 500, 1500, "order-8"], "isController": false}, {"data": [1.0, 500, 1500, "confirm-4"], "isController": false}, {"data": [1.0, 500, 1500, "order-9"], "isController": false}, {"data": [1.0, 500, 1500, "confirm-1"], "isController": false}, {"data": [1.0, 500, 1500, "confirm-2"], "isController": false}, {"data": [1.0, 500, 1500, "order-3"], "isController": false}, {"data": [1.0, 500, 1500, "confirm-7"], "isController": false}, {"data": [1.0, 500, 1500, "order-4"], "isController": false}, {"data": [1.0, 500, 1500, "confirm-8"], "isController": false}, {"data": [1.0, 500, 1500, "order-5"], "isController": false}, {"data": [1.0, 500, 1500, "confirm-5"], "isController": false}, {"data": [1.0, 500, 1500, "order-6"], "isController": false}, {"data": [1.0, 500, 1500, "confirm-6"], "isController": false}, {"data": [1.0, 500, 1500, "order-0"], "isController": false}, {"data": [1.0, 500, 1500, "order-1"], "isController": false}, {"data": [1.0, 500, 1500, "confirm-9"], "isController": false}, {"data": [1.0, 500, 1500, "order-2"], "isController": false}, {"data": [1.0, 500, 1500, "signoff-16"], "isController": false}, {"data": [1.0, 500, 1500, "login-10"], "isController": false}, {"data": [1.0, 500, 1500, "login-11"], "isController": false}, {"data": [1.0, 500, 1500, "login-12"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "login-13"], "isController": false}, {"data": [1.0, 500, 1500, "login-14"], "isController": false}, {"data": [1.0, 500, 1500, "login-15"], "isController": false}, {"data": [1.0, 500, 1500, "login-16"], "isController": false}, {"data": [1.0, 500, 1500, "select-0"], "isController": false}, {"data": [1.0, 500, 1500, "preLogin-8"], "isController": false}, {"data": [1.0, 500, 1500, "select-6"], "isController": false}, {"data": [1.0, 500, 1500, "preLogin-7"], "isController": false}, {"data": [1.0, 500, 1500, "select-5"], "isController": false}, {"data": [1.0, 500, 1500, "select-8"], "isController": false}, {"data": [1.0, 500, 1500, "preLogin-9"], "isController": false}, {"data": [1.0, 500, 1500, "select-7"], "isController": false}, {"data": [1.0, 500, 1500, "select-2"], "isController": false}, {"data": [1.0, 500, 1500, "select-1"], "isController": false}, {"data": [1.0, 500, 1500, "select-4"], "isController": false}, {"data": [1.0, 500, 1500, "select-3"], "isController": false}, {"data": [1.0, 500, 1500, "login-3"], "isController": false}, {"data": [1.0, 500, 1500, "login-2"], "isController": false}, {"data": [1.0, 500, 1500, "login-1"], "isController": false}, {"data": [1.0, 500, 1500, "login-0"], "isController": false}, {"data": [1.0, 500, 1500, "select-9"], "isController": false}, {"data": [1.0, 500, 1500, "login-9"], "isController": false}, {"data": [1.0, 500, 1500, "login-8"], "isController": false}, {"data": [1.0, 500, 1500, "login-7"], "isController": false}, {"data": [1.0, 500, 1500, "cats-9"], "isController": false}, {"data": [1.0, 500, 1500, "login-6"], "isController": false}, {"data": [1.0, 500, 1500, "cats-8"], "isController": false}, {"data": [1.0, 500, 1500, "login-5"], "isController": false}, {"data": [1.0, 500, 1500, "login-4"], "isController": false}, {"data": [1.0, 500, 1500, "preLogin-0"], "isController": false}, {"data": [1.0, 500, 1500, "cats-5"], "isController": false}, {"data": [1.0, 500, 1500, "cats-4"], "isController": false}, {"data": [1.0, 500, 1500, "preLogin-2"], "isController": false}, {"data": [1.0, 500, 1500, "cats-7"], "isController": false}, {"data": [1.0, 500, 1500, "preLogin-1"], "isController": false}, {"data": [1.0, 500, 1500, "cats-6"], "isController": false}, {"data": [1.0, 500, 1500, "preLogin-4"], "isController": false}, {"data": [1.0, 500, 1500, "cats-1"], "isController": false}, {"data": [1.0, 500, 1500, "preLogin-3"], "isController": false}, {"data": [1.0, 500, 1500, "cats-0"], "isController": false}, {"data": [1.0, 500, 1500, "preLogin-6"], "isController": false}, {"data": [1.0, 500, 1500, "cats-3"], "isController": false}, {"data": [1.0, 500, 1500, "preLogin-5"], "isController": false}, {"data": [1.0, 500, 1500, "cats-2"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "add to cart"], "isController": false}, {"data": [1.0, 500, 1500, "confirmed-8"], "isController": false}, {"data": [1.0, 500, 1500, "confirmed-9"], "isController": false}, {"data": [1.0, 500, 1500, "confirmed-6"], "isController": false}, {"data": [1.0, 500, 1500, "confirmed-7"], "isController": false}, {"data": [1.0, 500, 1500, "confirmed-4"], "isController": false}, {"data": [1.0, 500, 1500, "confirmed-5"], "isController": false}, {"data": [1.0, 500, 1500, "confirmed-2"], "isController": false}, {"data": [1.0, 500, 1500, "confirmed-3"], "isController": false}, {"data": [1.0, 500, 1500, "confirmed-0"], "isController": false}, {"data": [1.0, 500, 1500, "confirmed-1"], "isController": false}, {"data": [0.7, 500, 1500, "signoff"], "isController": false}, {"data": [1.0, 500, 1500, "home-10"], "isController": false}, {"data": [1.0, 500, 1500, "home-11"], "isController": false}, {"data": [0.5, 500, 1500, "home"], "isController": false}, {"data": [1.0, 500, 1500, "home-12"], "isController": false}, {"data": [1.0, 500, 1500, "home-13"], "isController": false}, {"data": [1.0, 500, 1500, "signoff-12"], "isController": false}, {"data": [1.0, 500, 1500, "home-14"], "isController": false}, {"data": [1.0, 500, 1500, "signoff-13"], "isController": false}, {"data": [1.0, 500, 1500, "home-15"], "isController": false}, {"data": [1.0, 500, 1500, "signoff-14"], "isController": false}, {"data": [1.0, 500, 1500, "signoff-15"], "isController": false}, {"data": [1.0, 500, 1500, "signoff-10"], "isController": false}, {"data": [1.0, 500, 1500, "signoff-11"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1950, 0, 0.0, 157.3733333333333, 67, 1498, 78.0, 270.9000000000001, 376.0, 687.7000000000003, 22.95116697856714, 40.26704547126396, 24.836983267716537], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["home-5", 15, 0, 0.0, 227.2666666666667, 211, 267, 224.0, 255.0, 267.0, 267.0, 0.2711839892972719, 0.1472444316887531, 0.1347975103049916], "isController": false}, {"data": ["signoff-7", 15, 0, 0.0, 104.73333333333333, 72, 340, 75.0, 267.40000000000003, 340.0, 340.0, 0.25433643623785546, 0.04247219784831375, 0.15001875731217254], "isController": false}, {"data": ["home-4", 15, 0, 0.0, 228.26666666666668, 214, 273, 225.0, 255.0, 273.0, 273.0, 0.2712722669319107, 0.08715681232480332, 0.13537121914277964], "isController": false}, {"data": ["signoff-8", 15, 0, 0.0, 195.06666666666666, 72, 271, 216.0, 264.4, 271.0, 271.0, 0.2543450614667232, 0.042473638194150065, 0.1510173802458669], "isController": false}, {"data": ["home-3", 15, 0, 0.0, 187.6, 68, 269, 222.0, 248.0, 269.0, 269.0, 0.27201015504578835, 0.10067563355698612, 0.13441126802067277], "isController": false}, {"data": ["signoff-9", 15, 0, 0.0, 180.73333333333335, 69, 265, 214.0, 245.20000000000002, 265.0, 265.0, 0.25464731347084285, 0.04252411191749427, 0.1502021263050675], "isController": false}, {"data": ["home-2", 15, 0, 0.0, 173.33333333333334, 71, 276, 227.0, 264.6, 276.0, 276.0, 0.27111046847888953, 1.084177117598684, 0.1358199905563187], "isController": false}, {"data": ["select", 15, 0, 0.0, 396.9333333333334, 295, 560, 384.0, 519.2, 560.0, 560.0, 0.2695369355447341, 1.4721875786149394, 1.5782651030529549], "isController": false}, {"data": ["home-1", 15, 0, 0.0, 176.13333333333335, 70, 240, 221.0, 235.2, 240.0, 240.0, 0.27122812093157816, 1.5802216498806596, 0.13455457561840012], "isController": false}, {"data": ["signoff-3", 15, 0, 0.0, 85.66666666666667, 69, 223, 75.0, 150.40000000000003, 223.0, 223.0, 0.25433643623785546, 0.04272057327432728, 0.1512606344422402], "isController": false}, {"data": ["home-0", 15, 0, 0.0, 271.9333333333333, 216, 900, 228.0, 508.80000000000024, 900.0, 900.0, 0.26760387490410864, 1.4161576153372701, 0.12021267817958005], "isController": false}, {"data": ["signoff-4", 15, 0, 0.0, 86.26666666666668, 68, 228, 75.0, 149.40000000000003, 228.0, 228.0, 0.2543450614667232, 0.04222525434506146, 0.14903030945315812], "isController": false}, {"data": ["signoff-5", 15, 0, 0.0, 90.86666666666667, 69, 216, 76.0, 169.8, 216.0, 216.0, 0.25433643623785546, 0.042223822422300224, 0.1502671327381861], "isController": false}, {"data": ["signoff-6", 15, 0, 0.0, 103.93333333333334, 71, 319, 76.0, 263.20000000000005, 319.0, 319.0, 0.25433643623785546, 0.04247219784831375, 0.15001875731217254], "isController": false}, {"data": ["signoff-0", 15, 0, 0.0, 91.86666666666666, 69, 213, 72.0, 212.4, 213.0, 213.0, 0.2537555826228177, 0.054022184581810795, 0.13109053047604546], "isController": false}, {"data": ["signoff-1", 15, 0, 0.0, 74.66666666666669, 69, 96, 72.0, 90.0, 96.0, 96.0, 0.25436231367960527, 1.1930685474640077, 0.12916836241542454], "isController": false}, {"data": ["signoff-2", 15, 0, 0.0, 95.80000000000001, 68, 230, 76.0, 218.6, 230.0, 230.0, 0.25436662709852464, 0.042725644395455314, 0.1500365652026454], "isController": false}, {"data": ["home-9", 15, 0, 0.0, 216.20000000000002, 77, 315, 219.0, 262.20000000000005, 315.0, 315.0, 0.27150304083405735, 0.1421148729365769, 0.13522124104039965], "isController": false}, {"data": ["home-8", 15, 0, 0.0, 219.6, 74, 304, 219.0, 292.6, 304.0, 304.0, 0.27150304083405735, 0.15219018109252824, 0.13495610135208516], "isController": false}, {"data": ["home-7", 15, 0, 0.0, 212.8666666666667, 73, 250, 219.0, 241.0, 250.0, 250.0, 0.27212365298791774, 0.18150435057690215, 0.13632757224882988], "isController": false}, {"data": ["home-6", 15, 0, 0.0, 229.4, 210, 289, 225.0, 263.8, 289.0, 289.0, 0.2711790866688361, 0.15651058615359584, 0.13479507335394295], "isController": false}, {"data": ["order", 15, 0, 0.0, 404.6666666666667, 357, 660, 370.0, 577.2, 660.0, 660.0, 0.26975506240333774, 1.8234809980038125, 1.5740102518163508], "isController": false}, {"data": ["add to cart-9", 15, 0, 0.0, 181.66666666666666, 71, 259, 216.0, 240.4, 259.0, 259.0, 0.27162595295438496, 0.045359412065624834, 0.16048213040762002], "isController": false}, {"data": ["add to cart-7", 15, 0, 0.0, 161.6, 68, 238, 213.0, 233.2, 238.0, 238.0, 0.2716013616281596, 0.04535530550626494, 0.16126330846671977], "isController": false}, {"data": ["add to cart-8", 15, 0, 0.0, 182.8, 71, 295, 215.0, 250.60000000000002, 295.0, 295.0, 0.2712575500018084, 0.04529789165069261, 0.15999957050887917], "isController": false}, {"data": ["add to cart-5", 15, 0, 0.0, 96.2, 70, 242, 76.0, 234.8, 242.0, 242.0, 0.2716062795371829, 0.04535612675865066, 0.16020526644576025], "isController": false}, {"data": ["add to cart-6", 15, 0, 0.0, 97.86666666666667, 72, 244, 77.0, 235.6, 244.0, 244.0, 0.27161119762430735, 0.045356948040777896, 0.16020816734871257], "isController": false}, {"data": ["add to cart-3", 15, 0, 0.0, 94.46666666666667, 67, 234, 74.0, 224.4, 234.0, 234.0, 0.2716013616281596, 0.045090069801549934, 0.1591414228289998], "isController": false}, {"data": ["add to cart-4", 15, 0, 0.0, 85.60000000000001, 70, 236, 74.0, 145.40000000000006, 236.0, 236.0, 0.2716062795371829, 0.04509088625129013, 0.16047050695312076], "isController": false}, {"data": ["add to cart-1", 15, 0, 0.0, 73.66666666666667, 70, 86, 73.0, 80.60000000000001, 86.0, 86.0, 0.2715964438972279, 0.0456197151858625, 0.16019946495500553], "isController": false}, {"data": ["add to cart-2", 15, 0, 0.0, 94.66666666666666, 69, 234, 73.0, 229.8, 234.0, 234.0, 0.2715964438972279, 0.0456197151858625, 0.16152561946622246], "isController": false}, {"data": ["add to cart-0", 15, 0, 0.0, 84.0, 70, 233, 73.0, 138.80000000000007, 233.0, 233.0, 0.27085101388562866, 1.2222681007475489, 0.1462701276159694], "isController": false}, {"data": ["preLogin", 15, 0, 0.0, 354.93333333333334, 222, 628, 366.0, 577.0, 628.0, 628.0, 0.27010966452379664, 1.4213114274395404, 1.576079341337583], "isController": false}, {"data": ["login", 15, 0, 0.0, 544.1333333333333, 453, 703, 525.0, 684.4, 703.0, 703.0, 0.27610580374399474, 2.086971602518085, 2.9789227732066927], "isController": false}, {"data": ["confirmed", 15, 0, 0.0, 381.93333333333334, 219, 668, 369.0, 587.0, 668.0, 668.0, 0.2632040708896297, 1.7396144060361467, 1.5386128597122302], "isController": false}, {"data": ["confirm", 15, 0, 0.0, 393.79999999999995, 223, 527, 376.0, 525.8, 527.0, 527.0, 0.26265102433899495, 1.55769499102609, 1.7472449001926107], "isController": false}, {"data": ["confirm-0", 15, 0, 0.0, 88.26666666666668, 72, 231, 75.0, 157.20000000000005, 231.0, 231.0, 0.2633334503704224, 1.1659705702924756, 0.23864593939819528], "isController": false}, {"data": ["cats", 15, 0, 0.0, 383.2, 231, 511, 370.0, 509.8, 511.0, 511.0, 0.2757555702625193, 1.3871259203342157, 1.6138702466633577], "isController": false}, {"data": ["order-7", 15, 0, 0.0, 190.13333333333338, 70, 243, 214.0, 240.0, 243.0, 243.0, 0.2712869854590176, 0.045302807142082034, 0.16107664761629167], "isController": false}, {"data": ["confirm-3", 15, 0, 0.0, 96.53333333333332, 70, 222, 75.0, 220.8, 222.0, 222.0, 0.2633519435373433, 0.04372053750131676, 0.16690958140208575], "isController": false}, {"data": ["order-8", 15, 0, 0.0, 202.6, 69, 287, 217.0, 252.20000000000002, 287.0, 287.0, 0.27167022856521894, 0.0453668057467309, 0.16024298638026588], "isController": false}, {"data": ["confirm-4", 15, 0, 0.0, 95.60000000000001, 69, 227, 76.0, 225.2, 227.0, 227.0, 0.2633426966292135, 0.04371900237008427, 0.16818957382373595], "isController": false}, {"data": ["order-9", 15, 0, 0.0, 193.8, 69, 284, 216.0, 254.00000000000003, 284.0, 284.0, 0.2719953579458911, 0.04542109981322985, 0.1607003823801407], "isController": false}, {"data": ["confirm-1", 15, 0, 0.0, 74.2, 68, 91, 73.0, 84.4, 91.0, 91.0, 0.2633334503704224, 0.04423179049190688, 0.16792650692566974], "isController": false}, {"data": ["confirm-2", 15, 0, 0.0, 96.8, 71, 220, 76.0, 219.4, 220.0, 220.0, 0.2633519435373433, 0.04423489676603813, 0.16922419809333195], "isController": false}, {"data": ["order-3", 15, 0, 0.0, 95.4, 69, 231, 75.0, 228.6, 231.0, 231.0, 0.2719953579458911, 0.04515547934648582, 0.15937228004642054], "isController": false}, {"data": ["confirm-7", 15, 0, 0.0, 182.9333333333333, 68, 255, 215.0, 245.4, 255.0, 255.0, 0.26334732000210676, 0.043976945039414315, 0.1689640519935392], "isController": false}, {"data": ["order-4", 15, 0, 0.0, 94.46666666666665, 69, 230, 75.0, 224.0, 230.0, 230.0, 0.27202988701692027, 0.0451612117117934, 0.16072078285667651], "isController": false}, {"data": ["confirm-8", 15, 0, 0.0, 197.8666666666667, 70, 271, 223.0, 254.20000000000002, 271.0, 271.0, 0.26334732000210676, 0.043976945039414315, 0.16793535152478098], "isController": false}, {"data": ["order-5", 15, 0, 0.0, 95.0, 71, 229, 74.0, 226.0, 229.0, 229.0, 0.27201015504578835, 0.04542357081331036, 0.16044348989028923], "isController": false}, {"data": ["confirm-5", 15, 0, 0.0, 97.8, 72, 228, 76.0, 222.6, 228.0, 228.0, 0.2633426966292135, 0.04397617297226124, 0.16793240322155897], "isController": false}, {"data": ["order-6", 15, 0, 0.0, 96.99999999999999, 73, 231, 78.0, 222.6, 231.0, 231.0, 0.27200522250027204, 0.04542274711674464, 0.1604405804591448], "isController": false}, {"data": ["confirm-6", 15, 0, 0.0, 92.53333333333333, 72, 227, 76.0, 171.80000000000004, 227.0, 227.0, 0.2633334503704224, 0.043974628919279515, 0.16792650692566974], "isController": false}, {"data": ["order-0", 15, 0, 0.0, 94.13333333333334, 71, 237, 73.0, 226.20000000000002, 237.0, 237.0, 0.2712085050987199, 1.4256986161586027, 0.14090129366456933], "isController": false}, {"data": ["order-1", 15, 0, 0.0, 84.13333333333334, 71, 224, 73.0, 141.20000000000005, 224.0, 224.0, 0.27200522250027204, 0.04568837721684256, 0.1604405804591448], "isController": false}, {"data": ["confirm-9", 15, 0, 0.0, 204.0, 70, 246, 221.0, 244.2, 246.0, 246.0, 0.2633519435373433, 0.04397771713367745, 0.1681954795638892], "isController": false}, {"data": ["order-2", 15, 0, 0.0, 81.86666666666667, 68, 221, 72.0, 135.80000000000007, 221.0, 221.0, 0.27202988701692027, 0.045692520084873324, 0.16178339960283636], "isController": false}, {"data": ["signoff-16", 15, 0, 0.0, 85.6, 68, 221, 70.0, 171.8, 221.0, 221.0, 0.25510204081632654, 0.043098294005102046, 0.1507194674744898], "isController": false}, {"data": ["login-10", 15, 0, 0.0, 196.06666666666666, 69, 374, 217.0, 308.00000000000006, 374.0, 374.0, 0.2788622420524261, 0.046567815811489124, 0.17810147099832682], "isController": false}, {"data": ["login-11", 15, 0, 0.0, 232.4, 70, 383, 233.0, 344.0, 383.0, 383.0, 0.2798246432235799, 0.04672852928831266, 0.17898939581195786], "isController": false}, {"data": ["login-12", 15, 0, 0.0, 237.13333333333333, 68, 476, 232.0, 388.40000000000003, 476.0, 476.0, 0.27899709843017634, 0.04659033577300796, 0.17846005807789597], "isController": false}, {"data": ["Test", 15, 0, 0.0, 4674.666666666666, 4195, 5993, 4564.0, 5732.0, 5993.0, 5993.0, 0.2489667878305034, 28.392247044556754, 17.51252808656575], "isController": true}, {"data": ["login-13", 15, 0, 0.0, 229.39999999999998, 71, 476, 220.0, 386.6, 476.0, 476.0, 0.27889853671234405, 0.04657387673614339, 0.17839701322908724], "isController": false}, {"data": ["login-14", 15, 0, 0.0, 73.13333333333334, 69, 101, 71.0, 86.00000000000001, 101.0, 101.0, 0.2795586700462203, 0.04668411384560907, 0.17991129253951096], "isController": false}, {"data": ["login-15", 15, 0, 0.0, 72.8, 68, 92, 71.0, 85.4, 92.0, 92.0, 0.2795586700462203, 0.04668411384560907, 0.17909227299835992], "isController": false}, {"data": ["login-16", 15, 0, 0.0, 73.93333333333334, 68, 102, 72.0, 89.4, 102.0, 102.0, 0.27947012464367554, 0.047215167542339724, 0.17848970851266], "isController": false}, {"data": ["select-0", 15, 0, 0.0, 85.73333333333333, 71, 235, 73.0, 155.80000000000004, 235.0, 235.0, 0.27096844120888053, 1.0727598248640642, 0.1463335429575302], "isController": false}, {"data": ["preLogin-8", 15, 0, 0.0, 142.4, 68, 360, 72.0, 355.8, 360.0, 360.0, 0.27102229610089257, 0.04525860608716077, 0.15986080746576087], "isController": false}, {"data": ["select-6", 15, 0, 0.0, 87.26666666666668, 70, 220, 76.0, 148.60000000000005, 220.0, 220.0, 0.27183762232693004, 0.04539475919717289, 0.16034172254440016], "isController": false}, {"data": ["preLogin-7", 15, 0, 0.0, 138.86666666666667, 68, 370, 73.0, 325.0, 370.0, 370.0, 0.2709341810562821, 0.0452438915631096, 0.1608671700021675], "isController": false}, {"data": ["select-5", 15, 0, 0.0, 88.26666666666668, 69, 234, 77.0, 154.20000000000005, 234.0, 234.0, 0.2718474754431114, 0.045396404590597704, 0.16034753434339774], "isController": false}, {"data": ["select-8", 15, 0, 0.0, 213.66666666666669, 72, 342, 220.0, 285.6, 342.0, 342.0, 0.27148338521682475, 0.04533560436726272, 0.16013277799898645], "isController": false}, {"data": ["preLogin-9", 15, 0, 0.0, 190.0, 71, 396, 215.0, 377.40000000000003, 396.0, 396.0, 0.2711839892972719, 0.04528560758772802, 0.16022100930161082], "isController": false}, {"data": ["select-7", 15, 0, 0.0, 183.66666666666669, 68, 248, 219.0, 243.8, 248.0, 248.0, 0.2711349709885581, 0.045277421913128356, 0.16098638902445636], "isController": false}, {"data": ["select-2", 15, 0, 0.0, 76.2, 69, 101, 75.0, 89.0, 101.0, 101.0, 0.2718129926610492, 0.04565608861103561, 0.16165440676814352], "isController": false}, {"data": ["select-1", 15, 0, 0.0, 94.4, 69, 223, 74.0, 220.6, 223.0, 223.0, 0.2718326960366793, 0.04565939816241098, 0.16033881680288506], "isController": false}, {"data": ["select-4", 15, 0, 0.0, 90.60000000000001, 70, 234, 75.0, 178.20000000000005, 234.0, 234.0, 0.2718425487957375, 0.045130110639917356, 0.16061009963029413], "isController": false}, {"data": ["select-3", 15, 0, 0.0, 85.73333333333333, 68, 213, 76.0, 145.80000000000004, 213.0, 213.0, 0.2718326960366793, 0.04512847492796434, 0.15927697033399177], "isController": false}, {"data": ["login-3", 15, 0, 0.0, 85.0, 69, 240, 75.0, 144.00000000000006, 240.0, 240.0, 0.27906976744186046, 0.046875, 0.17932412790697674], "isController": false}, {"data": ["login-2", 15, 0, 0.0, 74.13333333333334, 69, 78, 75.0, 77.4, 78.0, 78.0, 0.27904380987815086, 0.04687063994047065, 0.177944929541438], "isController": false}, {"data": ["login-1", 15, 0, 0.0, 73.26666666666668, 70, 82, 72.0, 79.0, 82.0, 82.0, 0.27902304730370725, 1.3501554681541694, 0.15504307999590766], "isController": false}, {"data": ["login-0", 15, 0, 0.0, 86.46666666666667, 69, 231, 73.0, 145.80000000000007, 231.0, 231.0, 0.2782157099137531, 0.059229516368357604, 0.17959041430956135], "isController": false}, {"data": ["select-9", 15, 0, 0.0, 204.99999999999997, 71, 246, 219.0, 244.2, 246.0, 246.0, 0.27183762232693004, 0.04539475919717289, 0.1606071889724538], "isController": false}, {"data": ["login-9", 15, 0, 0.0, 169.86666666666667, 70, 307, 209.0, 273.40000000000003, 307.0, 307.0, 0.27947012464367554, 0.04666932745514504, 0.17821678846906266], "isController": false}, {"data": ["login-8", 15, 0, 0.0, 195.66666666666669, 69, 305, 224.0, 281.0, 305.0, 305.0, 0.27812801305347473, 0.0464452053048283, 0.1784473677501298], "isController": false}, {"data": ["login-7", 15, 0, 0.0, 85.19999999999999, 72, 217, 76.0, 134.80000000000004, 217.0, 217.0, 0.2790593838368805, 0.04660073694932281, 0.17795486098191696], "isController": false}, {"data": ["cats-9", 15, 0, 0.0, 196.13333333333333, 72, 292, 214.0, 258.40000000000003, 292.0, 292.0, 0.27655377127159425, 0.04618231922601818, 0.16339358556573683], "isController": false}, {"data": ["login-6", 15, 0, 0.0, 84.33333333333334, 68, 232, 73.0, 142.00000000000006, 232.0, 232.0, 0.2790749595341309, 0.04660333796907849, 0.17796479353104244], "isController": false}, {"data": ["cats-8", 15, 0, 0.0, 215.73333333333332, 72, 295, 219.0, 265.0, 295.0, 295.0, 0.27657416797271134, 0.04618572531575551, 0.16313554439015396], "isController": false}, {"data": ["login-5", 15, 0, 0.0, 84.73333333333335, 69, 234, 74.0, 142.80000000000007, 234.0, 234.0, 0.2790541923241493, 0.04632735614756386, 0.17822406423827508], "isController": false}, {"data": ["login-4", 15, 0, 0.0, 84.80000000000001, 70, 229, 73.0, 140.20000000000005, 229.0, 229.0, 0.27906457554278064, 0.046329079924094435, 0.17686807571021934], "isController": false}, {"data": ["preLogin-0", 15, 0, 0.0, 75.06666666666668, 71, 87, 74.0, 84.6, 87.0, 87.0, 0.2723311546840959, 1.0237062851761076, 0.14148454520697168], "isController": false}, {"data": ["cats-5", 15, 0, 0.0, 77.46666666666667, 69, 127, 75.0, 99.40000000000002, 127.0, 127.0, 0.2772387025228722, 0.0462966973939562, 0.16352751594122542], "isController": false}, {"data": ["cats-4", 15, 0, 0.0, 86.66666666666666, 68, 228, 72.0, 168.00000000000003, 228.0, 228.0, 0.2772438267041254, 0.04602680716767707, 0.1638012843320272], "isController": false}, {"data": ["preLogin-2", 15, 0, 0.0, 81.33333333333333, 69, 151, 76.0, 115.60000000000002, 151.0, 151.0, 0.2723558783477077, 0.04574727644121652, 0.16197727530640035], "isController": false}, {"data": ["cats-7", 15, 0, 0.0, 216.13333333333335, 72, 298, 217.0, 268.0, 298.0, 298.0, 0.27654357404915103, 0.04618061636953596, 0.16419774709168342], "isController": false}, {"data": ["preLogin-1", 15, 0, 0.0, 83.2, 69, 150, 76.0, 127.80000000000001, 150.0, 150.0, 0.2722520691157253, 0.045729839734281984, 0.1605861813924786], "isController": false}, {"data": ["cats-6", 15, 0, 0.0, 94.39999999999999, 72, 227, 76.0, 181.40000000000003, 227.0, 227.0, 0.2772438267041254, 0.046297553092192814, 0.16353053840751147], "isController": false}, {"data": ["preLogin-4", 15, 0, 0.0, 82.0, 70, 151, 75.0, 116.20000000000002, 151.0, 151.0, 0.2724102862124074, 0.045224363921981696, 0.16094553042822898], "isController": false}, {"data": ["cats-1", 15, 0, 0.0, 87.39999999999999, 68, 232, 75.0, 170.20000000000005, 232.0, 232.0, 0.2772694504519492, 0.04657260300560084, 0.16354565241501692], "isController": false}, {"data": ["preLogin-3", 15, 0, 0.0, 79.73333333333333, 70, 151, 73.0, 109.60000000000002, 151.0, 151.0, 0.27240533914464726, 0.045223542631435576, 0.15961250340506675], "isController": false}, {"data": ["cats-0", 15, 0, 0.0, 76.13333333333334, 71, 131, 72.0, 96.80000000000001, 131.0, 131.0, 0.2772233311155467, 0.9778619843646041, 0.14889925011088934], "isController": false}, {"data": ["preLogin-6", 15, 0, 0.0, 84.13333333333333, 73, 150, 78.0, 115.20000000000002, 150.0, 150.0, 0.2723657690701433, 0.04548295557714306, 0.16065324659996733], "isController": false}, {"data": ["cats-3", 15, 0, 0.0, 87.53333333333333, 69, 235, 75.0, 170.80000000000004, 235.0, 235.0, 0.2772592003844661, 0.046029359438827376, 0.1624565627252731], "isController": false}, {"data": ["preLogin-5", 15, 0, 0.0, 80.53333333333335, 72, 151, 74.0, 109.60000000000002, 151.0, 151.0, 0.2724102862124074, 0.045490389592111, 0.16067950475809967], "isController": false}, {"data": ["cats-2", 15, 0, 0.0, 77.86666666666667, 71, 129, 73.0, 100.20000000000002, 129.0, 129.0, 0.27722845472859337, 0.046565717005193415, 0.1648751259079232], "isController": false}, {"data": ["add to cart", 15, 0, 0.0, 368.6, 222, 531, 375.0, 481.8, 531.0, 531.0, 0.26937719991379927, 1.620472218231449, 1.5773297760577545], "isController": false}, {"data": ["confirmed-8", 15, 0, 0.0, 189.13333333333335, 69, 233, 215.0, 231.8, 233.0, 233.0, 0.2638986629134413, 0.044069014998240674, 0.1556589769528501], "isController": false}, {"data": ["confirmed-9", 15, 0, 0.0, 169.79999999999998, 69, 226, 214.0, 225.4, 226.0, 226.0, 0.26389402016150315, 0.04406823969493851, 0.15591394745870057], "isController": false}, {"data": ["confirmed-6", 15, 0, 0.0, 96.66666666666669, 70, 238, 76.0, 231.4, 238.0, 238.0, 0.26388009288579267, 0.044065913948701706, 0.15564802353810428], "isController": false}, {"data": ["confirmed-7", 15, 0, 0.0, 178.79999999999998, 68, 225, 214.0, 224.4, 225.0, 225.0, 0.2639079489074211, 0.04407056568668848, 0.15669534466378127], "isController": false}, {"data": ["confirmed-4", 15, 0, 0.0, 93.93333333333335, 70, 231, 74.0, 223.8, 231.0, 231.0, 0.26389402016150315, 0.043810530690874545, 0.15591394745870057], "isController": false}, {"data": ["confirmed-5", 15, 0, 0.0, 95.0, 71, 231, 75.0, 227.4, 231.0, 231.0, 0.26388937757292147, 0.04406746441891559, 0.15565350005277787], "isController": false}, {"data": ["confirmed-2", 15, 0, 0.0, 81.46666666666667, 68, 216, 71.0, 133.20000000000005, 216.0, 216.0, 0.26390330582874433, 0.0443275084009219, 0.15695030590791534], "isController": false}, {"data": ["confirmed-3", 15, 0, 0.0, 94.73333333333333, 70, 231, 74.0, 228.0, 231.0, 231.0, 0.26390330582874433, 0.043812072256725135, 0.1546308432590299], "isController": false}, {"data": ["confirmed-0", 15, 0, 0.0, 95.53333333333333, 71, 250, 75.0, 229.0, 250.0, 250.0, 0.26388009288579267, 1.3474892633787208, 0.13992860394236858], "isController": false}, {"data": ["confirmed-1", 15, 0, 0.0, 83.33333333333334, 69, 235, 72.0, 142.60000000000005, 235.0, 235.0, 0.2638754507872284, 0.044322829624417276, 0.15564528542527928], "isController": false}, {"data": ["signoff", 15, 0, 0.0, 566.0, 436, 745, 536.0, 721.6, 745.0, 745.0, 0.2521813688404701, 1.8687033464467644, 2.4952164346598074], "isController": false}, {"data": ["home-10", 15, 0, 0.0, 217.6, 78, 309, 225.0, 306.6, 309.0, 309.0, 0.27139005988673987, 0.19188125327929656, 0.1354300005880118], "isController": false}, {"data": ["home-11", 15, 0, 0.0, 239.00000000000003, 77, 327, 223.0, 319.8, 327.0, 327.0, 0.2715472763808179, 0.1996827139792538, 0.13550845530331831], "isController": false}, {"data": ["home", 15, 0, 0.0, 880.4666666666665, 778, 1498, 818.0, 1225.6000000000001, 1498.0, 1498.0, 0.2646015981936531, 15.347409495228352, 2.0971743856832896], "isController": false}, {"data": ["home-12", 15, 0, 0.0, 243.93333333333334, 85, 369, 222.0, 343.8, 369.0, 369.0, 0.2717391304347826, 0.18390157948369565, 0.13560419497282608], "isController": false}, {"data": ["home-13", 15, 0, 0.0, 101.53333333333333, 68, 302, 72.0, 281.6, 302.0, 302.0, 0.27213352685050796, 0.25353064903846156, 0.13686402961719885], "isController": false}, {"data": ["signoff-12", 15, 0, 0.0, 230.53333333333333, 69, 429, 221.0, 409.2, 429.0, 429.0, 0.2543838822372214, 0.042480120959536, 0.15054358655835565], "isController": false}, {"data": ["home-14", 15, 0, 0.0, 83.13333333333333, 67, 240, 71.0, 144.60000000000005, 240.0, 240.0, 0.2717637467161881, 0.20063807863031072, 0.13588187335809404], "isController": false}, {"data": ["signoff-13", 15, 0, 0.0, 228.99999999999997, 68, 424, 223.0, 398.8, 424.0, 424.0, 0.2546429905272808, 0.042523390019692395, 0.15069692603469936], "isController": false}, {"data": ["home-15", 15, 0, 0.0, 165.39999999999998, 142, 397, 145.0, 266.80000000000007, 397.0, 397.0, 0.27102719306170386, 9.630464303460114, 0.13445489655795465], "isController": false}, {"data": ["signoff-14", 15, 0, 0.0, 82.53333333333333, 68, 216, 70.0, 144.00000000000006, 216.0, 216.0, 0.25503264417845484, 0.04258845913526931, 0.1519237431141186], "isController": false}, {"data": ["signoff-15", 15, 0, 0.0, 85.73333333333333, 68, 216, 70.0, 184.20000000000002, 216.0, 216.0, 0.2550456531719178, 0.04259063153554486, 0.15118428855015048], "isController": false}, {"data": ["signoff-10", 15, 0, 0.0, 191.93333333333334, 70, 265, 216.0, 241.0, 265.0, 265.0, 0.2543062525430625, 0.04246715740709345, 0.1502492995981961], "isController": false}, {"data": ["signoff-11", 15, 0, 0.0, 188.1333333333333, 68, 432, 218.0, 328.80000000000007, 432.0, 432.0, 0.2550066301723845, 0.04258411499948998, 0.15091212684029784], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1950, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
