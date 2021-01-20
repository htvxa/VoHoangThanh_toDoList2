function TaskList() {
	this.arr = [];
	this.getListUser = function () {
		return axios({
			url: "https://600182b108587400174dad65.mockapi.io/api/ToDoList",
			method: "GET",
		});
	};
	this.addTask = function (task) {
		return axios({
			url: `https://600182b108587400174dad65.mockapi.io/api/ToDoList/${task.id}`,
			method: "POST",
			data: task,
		});
	};
	this.deleteTask = function (id) {
		return axios({
			url: `https://600182b108587400174dad65.mockapi.io/api/ToDoList/${id}`,
			method: "DELETE",
		});
	};

	this.updateTask = function (user) {
		return axios({
			url: `https://600182b108587400174dad65.mockapi.io/api/ToDoList/${user.id}`,
			method: "PUT",
			data: user,
		});
	};
	this.getUserById = function (id) {
		return axios({
			url: `https://600182b108587400174dad65.mockapi.io/api/ToDoList/${id}`,
			method: "GET",
		});
	};
}
