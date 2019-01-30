"use strict";

// set endpoint and your access key
let endpoint = 'latest'
let access_key = 'API KEY';

//  API request for currency to website
$(document).ready(function() {
    // put all your jQuery goodness in here.
    // get the most recent exchange rates via the "latest" endpoint:
    $.ajax({
    url: 'http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key,
    dataType: 'json',
    success: function(json) {
        // exchange rate data is stored in json.rates and date in json.date
        let rates = json.rates;
        let today = json.date;

        // Types for what day the rates are showing
        document.getElementById('date').innerHTML = "Foreign exchange rate for: " + today;

        // for-loop that takes json.rate and creates a table for them to show inside
        for (const rate in rates) {
            var table = document.getElementById("tbody");
            var row = table.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.className = `${rate}`;
            cell1.className += "curStyle";
            cell2.id = `${rate}`;
            cell3.className += "rateStyle";
            cell1.innerHTML += `${rate}`;
            cell3.innerHTML += `${rates[rate]}`;
        }
    }
});
});

//  API request for symbols to website
$(document).ready(function() {
    // put all your jQuery goodness in here.
    // get the most recent exchange rates via the "latest" endpoint:
    $.ajax({
    url: 'http://data.fixer.io/api/symbols' + '?access_key=' + access_key,
    dataType: 'json',
    success: function(json) {
        // exchange rata data is stored in json.rates
        let symbols = json.symbols;

        // for-loop that takes symbols (currency name) and adds them to the table
        for (const symbol in symbols) {
            var cell2 = document.getElementById(`${symbol}`);
            if (cell2.id === `${symbol}`){
                cell2.innerHTML = `${symbols[symbol]}`;
            }
        }
    }
});
});

// Get API and currency and rates for selected search date and symbols
function searchExchange() {
    let searchDate = document.getElementById('searchDate');
    
    $(document).ready(function() {
        // get the most recent exchange rates via the "latest" endpoint:
        searchDate = searchDate.value;
        $.ajax({
        url: 'http://data.fixer.io/api/' + searchDate + '?access_key=' + access_key,
        dataType: 'json',
        success: function(json) {
            // base currency is stored in json.base
            // exchange rata data is stored in json.rates
            let rates = json.rates;

            document.getElementById('date').innerHTML = "Foreign exchange rate for: " + searchDate;



            $('#tbody').empty();
            if (searchDate < todaysDate){
                for (const rate in rates) {
                    var table = document.getElementById("tbody");
                    var row = table.insertRow();
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    cell1.className = `${rate}`;
                    cell1.className += "curStyle";
                    cell2.id = `${rate}`;
                    cell3.className += "rateStyle";
                    cell1.innerHTML += `${rate}`;
                    cell3.innerHTML += `${rates[rate]}`;
                }
            } else if (searchDate === todaysDate){
                    cell1.className = `${rate}`;
                    cell1.className += "curStyle";
                    cell2.id = `${rate}`;
                    cell3.className += "rateStyle";
                    cell1.innerHTML += `${rate}`;
                    cell3.innerHTML += `${rates[rate]}`;
            } else {
                document.getElementById('noRates').innerHTML = "There are no rates for " + searchDate + " yet";
            }
        }
    });
});

//  API request for symbols to website
$(document).ready(function() {
    // put all your jQuery goodness in here.
    // get the most recent exchange rates via the "latest" endpoint:
    $.ajax({
    url: 'http://data.fixer.io/api/symbols' + '?access_key=' + access_key,
    dataType: 'json',
    success: function(json) {
        // exchange rata data is stored in json.rates        
        let symbols = json.symbols;
        

        if (searchDate < todaysDate){
            for (const symbol in symbols) {
                var cell2 = document.getElementById(`${symbol}`);
                if (cell2.id === `${symbol}`){
                    cell2.innerHTML = `${symbols[symbol]}`;
                }
            }
        } else if (searchDate === todaysDate){
            var cell2 = document.getElementById(`${symbol}`);
            if (cell2.id === `${symbol}`){
                cell2.innerHTML = `${symbols[symbol]}`;
            }
        } else {

        }}
    });
});
};

// Sorting the table asc and desc
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("exchange");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc"; 
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount ++;      
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
}

// Getting todays date to show in the homepage
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

// If loop to get the correct the date with months
if(dd<10){
    dd='0'+dd
} 
if(mm<10){
    mm='0'+mm
} 
var todaysDate = yyyy + '-' + mm + '-' + dd;