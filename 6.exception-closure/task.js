//Задача 1
function parseCount(number) {
	let numberParse = Number.parseFloat(number);
	if (isNaN(numberParse)) {
		throw new Error("Невалидное значение");
	} else {
		return numberParse;
	}
}

function validateCount(number) {
	try {
		return parseCount(number)
	} catch (error) {
		return error;
	}
}

//Задача 2
class Triangle {
	constructor(a, b, c) {
		this.a = a;
		this.b = b;
		this.c = c;
		if (a + b <= c || a + c <= b || b + c <= a) {
			throw new Error("Треугольник с такими сторонами не существует");
		}
	}

	get perimeter() {
		return this.a + this.b + this.c;
	}

	get area() {
		let p = 0.5 * this.perimeter;
		let area = Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
		return parseFloat(area.toFixed(3));
	}
}

function getTriangle(a, b, c) {
	try {
		return new Triangle(a, b, c);
	} catch (error) {
		return {
			get area() {
				return "Ошибка! Треугольник не существует";
			},
			get perimeter() {
				return "Ошибка! Треугольник не существует";
			}
		}
	}
}