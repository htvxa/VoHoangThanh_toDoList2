var validation = new Validation();
var taskList = new TaskList();

function getListUser() {
	// document.getElementsByClassName("loader-wrapper")[0].removeAttribute("style");
	taskList
		.getListUser()
		.then(function (rs) {
			$(".loader-wrapper").fadeOut("slow");
			taoList(rs.data);
			arr = rs.data;
		})
		.catch(function (err) {
			console.log(err);
		});
}
getListUser();

getEle("addItem").addEventListener("click", function () {
	var taskName = getEle("newTask").value;
	var isValid = true;
	isValid &=
		validation.kiemTraRong(taskName, "Task rong") &&
		validation.kiemTraItem(taskName, "Trung ma", arr);
	if (!isValid) return;
	var task = new Task("", taskName);
	taskList
		.addTask(task)
		.then(function (rs) {
			getListUser();
		})
		.catch(function (err) {
			console.log(err);
		});
});

function deleteToDo(id) {
	taskList
		.deleteTask(id)
		.then(function (rs) {
			getListUser();
		})
		.catch(function (err) {
			console.log(err);
		});
}

async function changeStatus(id) {
	var getUser = await taskList.getUserById(id);
	var taskChange = getUser.data;
	if (taskChange.status !== false) {
		taskChange.status = false;
	} else {
		taskChange.status = true;
	}
	isLoading = true;
	taskList
		.updateTask(taskChange)
		.then(function (rs) {
			getListUser();
		})
		.catch(function (err) {
			console.log(err);
		});
}

function taoList(list) {
	var t = "",
		n = "";
	getEle("todo").innerHTML = "";
	getEle("completed").innerHTML = "";
	list &&
		list.length > 0 &&
		list.forEach(function (item) {
			false === item.status
				? ((t += taoTask(item)), (getEle("todo").innerHTML = t))
				: true === item.status &&
				  ((n += taoTask(item)), (getEle("completed").innerHTML = n));
		});
}

function taoTask(task) {
	return `
    <li>
    <span>${task.taskName}</span>
    <div class="buttons">
      <button class="remove" onclick="deleteToDo(${task.id})">
        <i class="fa fa-trash-alt"></i>
      </button>
      <button class="complete" onclick="changeStatus(${task.id})">
        <i class="far fa-check-circle"></i>
        <i class="fas fa-check-circle"></i>
      </button>
    </div>
    </li>
  `;
}

//Check Pending axios
var numberOfAjaxCAllPending = 0;
// Add a request interceptor
axios.interceptors.request.use(
	function (config) {
		numberOfAjaxCAllPending++;
		// show loader
		document
			.getElementsByClassName("loader-wrapper")[0]
			.removeAttribute("style");
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);
// Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		numberOfAjaxCAllPending--;
		console.log("------------  Ajax pending", numberOfAjaxCAllPending);

		if (numberOfAjaxCAllPending == 0) {
			//hide loader
		}
		return response;
	},
	function (error) {
		numberOfAjaxCAllPending--;
		if (numberOfAjaxCAllPending == 0) {
			//hide loader
			$(".loader-wrapper").fadeOut("slow");
		}
		return Promise.reject(error);
	},
);
//----------------------------------------------------------------------

function getEle(id) {
	return document.getElementById(id);
}
