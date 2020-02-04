function showArticles() {
	var queryURL = 'https://api.zotero.org/groups/2343539/items?format=json&limit=5&key=giJrwF3CBjDfSbNdwQ8DV9vu';

	fetch(queryURL)
		.then(function(response) {
			// response.json() returns a json string,
			// returning it will convert it
			// to a pure JavaScript
			// object for the next then's callback
			return response.json();
		})
		.then(function(articles) {
			// articles is a JavaScript object here
			console.log(articles);
			displayUsersAsATable(articles);
		})
		.catch(function(error) {
			console.log('Error during fetch: ' + error.message);
		});
}

function trimText(txt) {
	// gets position of end of sentence after n characters
	const pos = txt.indexOf('.', 250);
	// select text until position
	txt = txt.substring(0, pos + 1);
	return txt;
}

function displayUsersAsATable(articles) {
	// articles is a JavaScript object

	// empty the div that contains the results
	const articlesDiv = document.querySelector('#articles');
	articlesDiv.innerHTML = '';

	// creates and populate the table with articles
	const table = document.createElement('table');
	table.setAttribute('class', 'table table-hover table-responsive');
	// creates a header row
	const headerRow = table.insertRow();
	headerRow.setAttribute('class', 'row p-2');
	const headerArray = [
		{ title: 'Date added', col: 'col-2' },
		{ title: 'By', col: 'col-2' },
		{ title: 'Title', col: 'col-4' },
		{ title: 'Abstract', col: 'col-4' },
	];
	headerArray.forEach(function(currentHeader) {
		console.log(currentHeader);
		const headerCell = document.createElement('th');
		headerCell.innerHTML = `${currentHeader.title}`;
		headerRow.appendChild(headerCell);
		headerCell.setAttribute('class', `${currentHeader.col}`);
	});

	// iterate on the array of articles
	articles.forEach(function(currentArticle) {
		const title = currentArticle.data.title;
		let abstract = currentArticle.data.abstractNote;
		//trims text when too long
		if (abstract.length > 250) {
			console.log(abstract.length);
			abstract = trimText(abstract);
		} else {
			abstract = abstract;
		}
		const url = currentArticle.data.url;
		const timestamp = currentArticle.data.dateAdded;
		const date = timestamp.split('T')[0];
		const by = currentArticle.meta.createdByUser.username;
		// creates a row
		const row = table.insertRow();
		row.setAttribute('class', 'row p-2');
		// insert cells in the row
		const dateCell = row.insertCell();
		dateCell.setAttribute('class', 'col-2');
		dateCell.innerHTML = `<time date-time="${date}">${date}</time>`;
		const byCell = row.insertCell();
		byCell.setAttribute('class', 'col-2');
		byCell.innerHTML = by;
		const titleCell = row.insertCell();
		titleCell.setAttribute('class', 'col-4');
		titleCell.innerHTML = `<a href="${url}" target="_blank">${title}</a>`;
		const abstractCell = row.insertCell();
		abstractCell.setAttribute('class', 'col-4');
		abstractCell.innerHTML = abstract;
	});

	// adds the table to the div
	articlesDiv.appendChild(table);
}

// runs above functions when page loads
const load = () => {
	showArticles();
};
window.onload = load;
