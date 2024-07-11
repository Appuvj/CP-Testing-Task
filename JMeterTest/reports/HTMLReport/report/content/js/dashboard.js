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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7580645161290323, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "Aboutuspage-1"], "isController": false}, {"data": [1.0, 500, 1500, "Aboutuspage-0"], "isController": false}, {"data": [1.0, 500, 1500, "Infrastructure-0"], "isController": false}, {"data": [1.0, 500, 1500, "Infrastructure-1"], "isController": false}, {"data": [0.5, 500, 1500, "Admissionpage"], "isController": false}, {"data": [1.0, 500, 1500, "Academicpage-0"], "isController": false}, {"data": [1.0, 500, 1500, "Academicpage-1"], "isController": false}, {"data": [0.5, 500, 1500, "Placement"], "isController": false}, {"data": [0.5, 500, 1500, "Infrastructure"], "isController": false}, {"data": [1.0, 500, 1500, "Admissionpage-0"], "isController": false}, {"data": [1.0, 500, 1500, "Admissionpage-1"], "isController": false}, {"data": [0.0, 500, 1500, "Homepage-1"], "isController": false}, {"data": [0.5, 500, 1500, "Aboutuspage"], "isController": false}, {"data": [1.0, 500, 1500, "Admissionpage-2"], "isController": false}, {"data": [0.5, 500, 1500, "Homepage-0"], "isController": false}, {"data": [0.0, 500, 1500, "Homepage"], "isController": false}, {"data": [1.0, 500, 1500, "Placement-0"], "isController": false}, {"data": [1.0, 500, 1500, "Placement-1"], "isController": false}, {"data": [0.5, 500, 1500, "Gallery-1"], "isController": false}, {"data": [1.0, 500, 1500, "Certificatecourses-1"], "isController": false}, {"data": [1.0, 500, 1500, "Certificatecourses-0"], "isController": false}, {"data": [1.0, 500, 1500, "Gallery-0"], "isController": false}, {"data": [1.0, 500, 1500, "Facultypage-0"], "isController": false}, {"data": [0.5, 500, 1500, "Certificatecourses"], "isController": false}, {"data": [1.0, 500, 1500, "Facultypage-1"], "isController": false}, {"data": [0.5, 500, 1500, "Gallery"], "isController": false}, {"data": [0.5, 500, 1500, "Iqacpage"], "isController": false}, {"data": [1.0, 500, 1500, "Iqacpage-1"], "isController": false}, {"data": [0.5, 500, 1500, "Academicpage"], "isController": false}, {"data": [1.0, 500, 1500, "Iqacpage-0"], "isController": false}, {"data": [0.5, 500, 1500, "Facultypage"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 31, 0, 0.0, 637.1290322580644, 271, 3017, 386.0, 1225.4, 2636.599999999999, 3017.0, 3.1309968690031313, 280.5623327189173, 0.5290658771841228], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Aboutuspage-1", 1, 0, 0.0, 398.0, 398, 398, 398.0, 398.0, 398.0, 398.0, 2.512562814070352, 253.13824984296483, 0.2993483040201005], "isController": false}, {"data": ["Aboutuspage-0", 1, 0, 0.0, 275.0, 275, 275, 275.0, 275.0, 275.0, 275.0, 3.6363636363636362, 1.7258522727272725, 0.43323863636363635], "isController": false}, {"data": ["Infrastructure-0", 1, 0, 0.0, 278.0, 278, 278, 278.0, 278.0, 278.0, 278.0, 3.5971223021582737, 1.8196380395683451, 0.4847684352517985], "isController": false}, {"data": ["Infrastructure-1", 1, 0, 0.0, 391.0, 391, 391, 391.0, 391.0, 391.0, 391.0, 2.557544757033248, 275.1533527813299, 0.3446691176470588], "isController": false}, {"data": ["Admissionpage", 1, 0, 0.0, 941.0, 941, 941, 941.0, 941.0, 941.0, 941.0, 1.0626992561105206, 105.62960779755579, 0.41719248140276305], "isController": false}, {"data": ["Academicpage-0", 1, 0, 0.0, 271.0, 271, 271, 271.0, 271.0, 271.0, 271.0, 3.6900369003690034, 1.7945687269372692, 0.46125461254612543], "isController": false}, {"data": ["Academicpage-1", 1, 0, 0.0, 383.0, 383, 383, 383.0, 383.0, 383.0, 383.0, 2.6109660574412534, 260.6299975522193, 0.3263707571801567], "isController": false}, {"data": ["Placement", 1, 0, 0.0, 649.0, 649, 649, 649.0, 649.0, 649.0, 649.0, 1.5408320493066257, 154.34352128274267, 0.4153023882896764], "isController": false}, {"data": ["Infrastructure", 1, 0, 0.0, 669.0, 669, 669, 669.0, 669.0, 669.0, 669.0, 1.4947683109118086, 161.57073290358744, 0.4028867713004484], "isController": false}, {"data": ["Admissionpage-0", 1, 0, 0.0, 277.0, 277, 277, 277.0, 277.0, 277.0, 277.0, 3.6101083032490977, 1.8191561371841154, 0.48299300541516244], "isController": false}, {"data": ["Admissionpage-1", 1, 0, 0.0, 293.0, 293, 293, 293.0, 293.0, 293.0, 293.0, 3.4129692832764507, 1.299861348122867, 0.45661796075085326], "isController": false}, {"data": ["Homepage-1", 1, 0, 0.0, 2383.0, 2383, 2383, 2383.0, 2383.0, 2383.0, 2383.0, 0.419639110365086, 82.7270968841796, 0.04507842005874948], "isController": false}, {"data": ["Aboutuspage", 1, 0, 0.0, 673.0, 673, 673, 673.0, 673.0, 673.0, 673.0, 1.4858841010401187, 150.40658664561664, 0.3540583209509658], "isController": false}, {"data": ["Admissionpage-2", 1, 0, 0.0, 371.0, 371, 371, 371.0, 371.0, 371.0, 371.0, 2.6954177897574128, 265.53287146226415, 0.33692722371967654], "isController": false}, {"data": ["Homepage-0", 1, 0, 0.0, 630.0, 630, 630, 630.0, 630.0, 630.0, 630.0, 1.5873015873015872, 0.7176959325396826, 0.1705109126984127], "isController": false}, {"data": ["Homepage", 1, 0, 0.0, 3017.0, 3017, 3017, 3017.0, 3017.0, 3017.0, 3017.0, 0.33145508783559824, 65.4924827021876, 0.07121105402717932], "isController": false}, {"data": ["Placement-0", 1, 0, 0.0, 277.0, 277, 277, 277.0, 277.0, 277.0, 277.0, 3.6101083032490977, 1.8262071299638987, 0.4865185018050541], "isController": false}, {"data": ["Placement-1", 1, 0, 0.0, 372.0, 372, 372, 372.0, 372.0, 372.0, 372.0, 2.688172043010753, 267.91152133736557, 0.362273185483871], "isController": false}, {"data": ["Gallery-1", 1, 0, 0.0, 1003.0, 1003, 1003, 1003.0, 1003.0, 1003.0, 1003.0, 0.9970089730807576, 357.75291313559325, 0.11488970588235295], "isController": false}, {"data": ["Certificatecourses-1", 1, 0, 0.0, 386.0, 386, 386, 386.0, 386.0, 386.0, 386.0, 2.5906735751295336, 250.5464702072539, 0.3263641515544041], "isController": false}, {"data": ["Certificatecourses-0", 1, 0, 0.0, 280.0, 280, 280, 280.0, 280.0, 280.0, 280.0, 3.571428571428571, 1.743861607142857, 0.4499162946428571], "isController": false}, {"data": ["Gallery-0", 1, 0, 0.0, 277.0, 277, 277, 277.0, 277.0, 277.0, 277.0, 3.6101083032490977, 1.6851872743682308, 0.4160085740072202], "isController": false}, {"data": ["Facultypage-0", 1, 0, 0.0, 286.0, 286, 286, 286.0, 286.0, 286.0, 286.0, 3.4965034965034967, 1.7209353146853148, 0.4473065996503497], "isController": false}, {"data": ["Certificatecourses", 1, 0, 0.0, 666.0, 666, 666, 666.0, 666.0, 666.0, 666.0, 1.5015015015015014, 145.94477289789788, 0.3783079954954955], "isController": false}, {"data": ["Facultypage-1", 1, 0, 0.0, 383.0, 383, 383, 383.0, 383.0, 383.0, 383.0, 2.6109660574412534, 327.2274804177546, 0.33402007180156656], "isController": false}, {"data": ["Gallery", 1, 0, 0.0, 1281.0, 1281, 1281, 1281.0, 1281.0, 1281.0, 1281.0, 0.78064012490242, 280.4785080015613, 0.17991315378610462], "isController": false}, {"data": ["Iqacpage", 1, 0, 0.0, 659.0, 659, 659, 659.0, 659.0, 659.0, 659.0, 1.5174506828528074, 151.49018399089528, 0.37343512898330805], "isController": false}, {"data": ["Iqacpage-1", 1, 0, 0.0, 378.0, 378, 378, 378.0, 378.0, 378.0, 378.0, 2.6455026455026456, 262.8296544312169, 0.3255208333333333], "isController": false}, {"data": ["Academicpage", 1, 0, 0.0, 654.0, 654, 654, 654.0, 654.0, 654.0, 654.0, 1.529051987767584, 153.37556144877675, 0.382262996941896], "isController": false}, {"data": ["Iqacpage-0", 1, 0, 0.0, 281.0, 281, 281, 281.0, 281.0, 281.0, 281.0, 3.558718861209964, 1.7168038256227756, 0.4378892348754448], "isController": false}, {"data": ["Facultypage", 1, 0, 0.0, 669.0, 669, 669, 669.0, 669.0, 669.0, 669.0, 1.4947683109118086, 188.07221599402092, 0.38245048579970103], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 31, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
