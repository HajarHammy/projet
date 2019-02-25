const baseurl = "http://jobmymy-001-site2.ftempurl.com/api/";
function callApi(method, url, data, SessionKey, doneFunction, errorFunction, alwaysFunction) {
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": baseurl + url,
		"method": method,
		"headers": {
			"authorization": "Basic " + SessionKey,
			"content-type": "application/json"
		},
		"processData": false,
		"data": data,

	}

	$.ajax(settings).done(function (response) {
		doneFunction(response);

	}).fail(function (response) {
		errorFunction(response);
	}).always(function (response) {
		alwaysFunction(response);
	});
}



