function TaskList() {
	this.arr = [];
	this.getListUser = function () {
		return axios({
			url: "https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/todo",
			method: "GET",
		});
	};
	this.addTask = function (task) {
		return axios({
			url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/todo/${task.id}`,
			method: "POST",
			data: task,
		});
	};
	this.deleteTask = function (id) {
		return axios({
			url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/todo/${id}`,
			method: "DELETE",
		});
	};

	this.updateTask = function (user) {
		return axios({
			url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/todo/${user.id}`,
			method: "PUT",
			data: user,
		});
	};
	this.getUserById = function (id) {
		return axios({
			url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/todo/${id}`,
			method: "GET",
		});
	};
}
