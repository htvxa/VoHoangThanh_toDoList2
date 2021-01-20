function Validation() {
	this.kiemTraRong = function (input, mess) {
		if (input !== "") {
			return true;
		}
		alert(mess);
		return false;
	};
	this.kiemTraItem = function (input, mess, arr) {
		var check = true;
		arr.forEach(function (item) {
			if (input === item.taskName) {
				//Sai
				check = false;
			}
		});
		if (check) {
			return true;
		}
        alert(mess);
		return false;
    };
}
