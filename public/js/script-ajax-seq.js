getData();
function getData() {
	axios.get("/seq").then(function(res){
		var html = '';
		for(var i in res.data) {
			html += '<div class="p-2 d-flex align-items-center rounded border m-2">';
			html += '<span class="mr-2 user-id">'+res.data[i].id+'</span>';
			html += '<span class="mr-3 user-name">'+res.data[i].username+'</span>';
			html += '<div>';
			html += '<button class="btn btn-success btn-sm" onclick="chgData(this);">수정</button>';
			html += '<button class="btn btn-danger btn-sm" onclick="revData('+res.data[i].id+');">삭제</button>';
			html += '</div>';
			html += '</div>';
		}
		document.querySelector(".list-wrap").innerHTML = html;
	});
}

function revData(id) {
	if(confirm("정말로 삭제하시겠습니까?")) {
		axios.delete("/seq", {data: {id: id}}).then(function(res){
			if(res.status == 200) getData();
		}).catch(function(err){
			console.log(err);
		});
	}
}


function sendData(f) {
	if(f.username.value.trim() === "") {
		alert("이름을 입력하세요.");
		f.username.focus();
		return false;
	}
	axios.post("/seq", {
		username: f.username.value
	}).then(function(res){
		//console.log(res);
		if(res.status == 200) getData();
	});
}

function chgData(btn) {
	var username = btn.parentNode.parentNode.querySelector(".user-name").innerHTML;
	var userid = btn.parentNode.parentNode.querySelector(".user-id").innerHTML;
	document.upForm.id.value = userid;
	document.upForm.username.value = username;
}

function putData(f) {
	if(f.username.value.trim() === "") {
		alert("이름을 입력하세요.");
		f.username.focus();
		return false;
	}
	axios.put("/seq", {
		id: f.id.value,
		username: f.username.value
	}).then(function(res) {
		if(res.status == 200) getData();
	});
}

// axios.post();
// axios.delete();
// axios.put();



/*
var xhr = new XMLHttpRequest();
function getData() {
 	xhr.open("get", "/seq");
 	xhr.send();
}
getData();

// var json = JSON.stringfy(JS Object[자바스크립트 객체])
// var obj = JSON.parse(JSON[문자열])

xhr.addEventListener("load", function(){
	var html = '';
	var datas = JSON.parse(this.responseText);
	for(var i in datas) {
		html += '<div class="p-2 d-flex align-items-center rounded border m-2">';
		html += '<span class="mr-2 user-id">'+datas[i].id+'</span>';
		html += '<span class="mr-3 user-name">'+datas[i].username+'</span>';
		html += '<div>';
		html += '<button class="btn btn-success btn-sm" onclick="chgData(this);">수정</button>';
		html += '<button class="btn btn-danger btn-sm" onclick="revData(this);">삭제</button>';
		html += '</div>';
		html += '</div>';
	}
	document.querySelector(".list-wrap").innerHTML = html;
});
*/