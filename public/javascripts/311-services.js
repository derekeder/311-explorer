var Open311Chicago = Open311Chicago || {};
var Open311Chicago = {

  api_key: '49589380b3ca4b05e5cd877ccf35ff0d',

  getServiceTypes: function(callback) {
    // get a list of all services
    $.ajax({
      type: "GET",
      url: "http://311api.cityofchicago.org/open311/v2/services.json",
      data: { callback: callback },
      dataType: "jsonp"
    });
  },

  displayServiceTypes: function(json) { 
    //console.log(json);
    var results = $("#service_types");
    results.hide().empty(); //hide the existing list and empty it out first

    for (var i = 0; i < json.length; i++) {
        var row = json[i];
        console.log(row['service_name']);
        results.append("<tr><td>" + row['service_name'] + "</td><td data-code='" + row['service_code'] + "'></td></tr>");

        Open311Chicago.getServiceList(row['service_code'], "Open311Chicago.displayServiceList")
    }

    results.fadeIn(); //tada!
  },

  getServiceList: function(service_code, callback) {
    console.log("fetching count for " + service_code);
    $.ajax({
      type: "GET",
      url: "http://311api.cityofchicago.org/open311/v2/requests.json",
      data: { page_size: 500, service_code: service_code, start_date: '2012-09-07T00:00:00Z', callback: callback },
      dataType: "jsonp"
    });
  },

  displayServiceList: function(json) { 
    console.log(json.length);
    var element = $("[data-code='" + json[0]['service_code'] + "']");
    element.hide().empty(); //hide the existing list and empty it out first

    output = json.length
    if(json.length == 500)
      output = "500+"
    element.html("<span class='label label-info'>" + output + "</span>");
    element.fadeIn(); //tada!
  }
}


//ul[data-group='Companies']
//ChartHelper.create(FusionTables.convertToSlug(row[0]), row[3], row[4], row[5], dataArray, startDate, row[8]);