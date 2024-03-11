const urlAPI = 'https://jsonplaceholder.typicode.com/users/';
// Задание 1
const idInputEl = document.querySelector('.usersbox__userid');
idInputEl.addEventListener('input', (e) => {
	if (idInputEl.value) getUserData(idInputEl.value);
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
			console.log(JSON.stringify(user, null, 2));
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
		})
		.catch((error) => {
			console.error('Ошибка:', error.message);
		});
}

// Задание 2
const addUserForm = document.querySelector('.adduser');

addUserForm.addEventListener('submit', (e) => {
	e.preventDefault();
	fetch(`${urlAPI}`, {
		method: 'POST',
		body: new FormData(addUserForm),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Ошибка добавления данных');
			}
			return response.json();
		})
		.then((addedUser) => {
			console.log(`Пользователь с ID=${addedUser.id} успешно добавлен`);
			document.querySelector('.adduser__status').textContent = `Пользователь с ID=${addedUser.id} успешно добавлен`;
		})
		.catch((error) => {
			console.error('Ошибка:', error.message);
		});
});

// Задание 3
const myEl = document.querySelector('#myElement');

myEl.addEventListener('click', () => {
	changeStyleDelayed(myEl, 500);
});

function changeStyleDelayed(elId, delay) {
	setTimeout(() => {
		elId.classList.add('myElement');
	}, delay);
}
