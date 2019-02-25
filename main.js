function httpGetAsync() 
{
	let SessionKey = localStorage.getItem('SessionKeyStore');
	var settings = callApi("GET", "Employees/Current?=", "", SessionKey,doneFunction,errorFunction,alwaysFunction);
			
	function doneFunction(response) 
	{
		console.log("done function reaced");
		renderHTML(response);
	}

	function errorFunction(response) 
	{
		console.log("error function reaced");
		alert(JSON.stringify(response));
	}

	function alwaysFunction(response) 
	{
		console.log("always function reaced");
		window.title = "done";
	}
}

function renderHTML(data) 
{
	if (typeof data !== 'undefined') {
		console.log(data.Id);

		$("#idEmployee").html(data.Id); 
		$("#firstNameEmployee").html(data.FirstName);
		$("#lastNameEmployee").html(data.LastName);
		$("#genderEmployee").html(data.Gender);
		$("#phoneNumberEmployee").html(data.PhoneNumber);
		$("#EmailEmployee").html(data.Email);
		console.log(data.FirstName);

	} else {
		console.log("undefined");
	}
}

function editCurentEmployee() {
	var load = {
		FirstName: $('#firstNameEmployee-edit').val(),
		LastName: $('#lastNameEmployee-edit').val(),
		Gender: $('#genderEmployee-edit').val(),
		PhoneNumber: $('#phoneNumberEmployee-edit').val(),
		Email: $('#EmailEmployee-edit').val()
	};
	var data = JSON.stringify(load);
	let SessionKey = localStorage.getItem('SessionKeyStore');

	callApi("PUT", "Employees/", data, SessionKey,doneFunction,errorFunction,alwaysFunction);
	
	function doneFunction(response) 
	{
		console.log("done function reaced");
		renderHTML(response);
	}

	function errorFunction(response) 
	{
		console.log("error function reaced");
		alert("Remplissez correctement les champs!");
	}
	function alwaysFunction(response) 
	{
		console.log("always function reaced");
		window.title = "done";
	}

}

function login() {
	var data = JSON.stringify({
		Email: $('#mail').val(),
		Password: $('#pass').val()
	});
	// Open a new connection, using the POST request on the URL endpoint
	callApi("POST","api/Employees/LogIn", data, '', doneFunction, errorFunction, alwaysFunction); 

	function doneFunction(response) {
		var data2 = this.responseText;
		var json = JSON.parse(data2);
		var sessionkey = json.SessionKey;
		localStorage.setItem('SessionKeyStore', sessionkey);

		window.location = 'user.html';
	}

	function errorFunction(response) {
		console.log("error function reaced");
		alert("Erreur de connexion!");
	}
	function alwaysFunction(response) {
		console.log("always function reaced");
		window.title = "done";
	}

}
function logOut() {
	
	localStorage.removeItem('SessionKeyStore');
	window.location = 'home.html';

}


