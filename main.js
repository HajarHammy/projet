

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

		$("#idEmployee").html(data.Id);// todo use query for the rest 
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
		$("#spiner").hide();
	}

}

function UserAction() {
	// Create a request variable and assign a new XMLHttpRequest object to it.
	var request = new XMLHttpRequest();
	var data = JSON.stringify({
		Email: $('#mail').val(),
		Password: $('#pass').val(),
	});
	var toLoad = $(this).attr('user.html')+' #pageContent';
				$('#pageContent2').hide('fast');
				$('#root2').append('<span id="load">LOADING...</span>');
				$('#loading2').css('visibility','visible');
				function hideLoader() {
					$('#root2').fadeOut('normal');
					$('#loading2').css('visibility','hidden');
				} fff

	// Open a new connection, using the GET request on the URL endpoint
	request.open('POST', 'http://jobmymy-001-site2.ftempurl.com/api/Employees/Login', true);

	request.onreadystatechange = function () {
		// Begin accessing JSON data here
		if (this.readyState == 4 && this.status == 200) {
			var data2 = this.responseText;
			var json = JSON.parse(data2);
			var sessionkey = json.SessionKey;
			localStorage.setItem('SessionKeyStore', sessionkey);
			function loadContent() {
				$('#pageContent2').load(toLoad,'')
			}
			window.location = 'user.html';

		}
		if(this.status == 400)
		{
			function loadContent() {
				$('#pageContent2').load(toLoad,'',showNewContent())
			}
			function showNewContent() {
				$('#pageContent2').show('normal',hideLoader());
			}
			window.location = 'home.html';
			alert("Connexion échoué!!");
		}
	}

	request.setRequestHeader("Content-type", "application/json");

	// Send request
	request.send(data);

}
function logOut() {
	// Create a request variable and assign a new XMLHttpRequest object to it.
	
	localStorage.removeItem('SessionKeyStore');
	window.location = 'home.html';

}


