
var xhr = new XMLHttpRequest();
function getData() {
 	xhr.open("get", "/api");
 	xhr.send();
}
getData();

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