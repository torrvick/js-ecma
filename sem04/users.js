const urlAPI = 'https://jsonplaceholder.typicode.com/users/';

const idInputEl = document.querySelector('.usersbox__userid');
idInputEl.addEventListener('input', (e) => {
	if (idInputEl.value) getUserData(idInputEl.value);
});

const addUserEl = document.querySelector('.adduser');
addUserEl.addEventListener('submit', (e) => {
	e.preventDefault();
	const newUser = {
		name: username.value,
		age: userage.value,
		email: useremail.value,
	};
	saveUserData(newUser);
});

function getUserData(userid) {
	fetch(`${urlAPI}${userid}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Ошибка получения данных');
			}
			return response.json();
		})
		.then((user) => {
			renderUser(user);
		})
		.catch((error) => {
			console.error('Ошибка:', error.message);
		});
}

function renderUser(user) {
	const userInfoEl = document.querySelector('.usersbox__info');
	userInfoEl.innerHTML = `
		<h4>${user.name}</h4>
		<p>${user.username}</p>
		<p>${user.email}</p>
		<p>${Object.keys(user.address)
			.filter((key) => key !== 'geo')
			.map((key) => user.address[key])
			.join(', ')}</p>	
		<p>${user.phone}</p>
		<p>${user.website}</p>
	`;
}

function saveUserData(user) {
	fetch(`${urlAPI}`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Ошибка добавления данных');
			}
			return response.json();
		})
		.then((json) => {
			console.log(`Пользователь с ID=${json.id} успешно добавлен`);
			document.querySelector('.adduser__status').textContent = `Пользователь с ID=${json.id} успешно добавлен`;
		})
		.catch((error) => {
			console.error('Ошибка:', error.message);
		});
}

const myEl = document.querySelector('#myElement');

myEl.addEventListener('click', () => {
	changeStyleDelayed(myEl, 500);
});

function changeStyleDelayed(elId, delay) {
	setTimeout(() => {
		elId.classList.add('myElement');
	}, delay);
}
