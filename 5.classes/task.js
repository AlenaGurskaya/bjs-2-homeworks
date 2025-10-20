//Задача 1
class PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		this.name = name;
		this.releaseDate = releaseDate;
		this.pagesCount = pagesCount;
		this._state = 100;
		this.type = null;
	}

	get state() {
		return this._state;
	}
	set state(newState) {
		if (newState < 0) {
			this._state = 0;
		} else if (newState > 100) {
			this._state = 100;
		} else {
			this._state = newState;
		}
	}

	fix() {
		this.state = this.state * 1.5;
	}
}

class Magazine extends PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.type = "magazine";
	}
}

class Book extends PrintEditionItem {
	constructor(author, name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.type = "book";
		this.author = author;
	}
}

class NovelBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "novel";
	}
}

class FantasticBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "fantastic";
	}
}

class DetectiveBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "detective";
	}
}

//Задача 2

class Library {
	constructor(name, books) {
		this.name = name;
		this.books = [];
	}

	addBook(book) {
		if (book.state > 30) {
			this.books.push(book);
		}
	}

	findBookBy(type, value) {
		return this.books.find(book => book[type] === value) || null;
	}

	giveBookByName(bookName) {
		let findBookIndex = this.books.findIndex(book => book.name === bookName);
		if (findBookIndex !== -1) {
			return this.books.splice(findBookIndex, 1)[0];
		} else {
			return null;
		}
	}
}

//Тестовые сценарии
//Создание библиотеки
const library = new Library("Тестовая библиотека.")

//Добавление в библиотеку несколько печатных изданий разных типов
library.addBook(new NovelBook("Иван Бунин", "Новеллы", 2003, 368));
library.addBook(new FantasticBook("Стефани Майер", "Сумерки", 2015, 416));
library.addBook(new DetectiveBook("Холли Джексон", "Хороших девочек не убивают", 2009, 416));
library.addBook(new Magazine("Малая Русь", 1919, 416));
console.log("Количество книг после добавления: " + library.books.length); //4

//Найти книгу, изданную в 1919 году, или создайте её при необходимости
console.log(library.findBookBy("releaseDate", 1919));

//Выдать любую книгу
let givenBook = library.giveBookByName("Сумерки")
console.log(givenBook);
console.log("Количество книг после выдачи: " + library.books.length); //3

//Повредить выданную книгу
console.log("Состояние книги до повреждения: " + givenBook.state);
givenBook.state = 10;
console.log("Состояние книги после повреждения: " + givenBook.state);

//Восстановить выданную книгу
givenBook.fix();
console.log("Состояние книги после восстановления: " + givenBook.state);

//Попытка добавить восстановленную книгу обратно в библиотеку.
library.addBook(givenBook);
console.log("Количество книг после добавления, восстановленной книги: " + library.books.length); //4