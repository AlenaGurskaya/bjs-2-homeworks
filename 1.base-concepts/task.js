"use strict"

function solveEquation(a, b, c) {
	let arr = [];
	let d = (b ** 2) - (4 * a * c);
	if (d === 0) {
		let root = -b / (2 * a);
		arr.push(root);
	} else if (d > 0) {
		let rootOne = ((-b + Math.sqrt(d)) / (2 * a));
		let rootTwo = ((-b - Math.sqrt(d)) / (2 * a));
		arr.push(rootOne);
		arr.push(rootTwo);
	}
	return arr;
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
	let monthPercent = percent / 100 / 12;
	let sumReturn = amount - contribution;

	if (sumReturn <= 0) {
		return 0;
	}

	let monthPay = sumReturn * (monthPercent + (monthPercent / (Math.pow(1 + monthPercent, countMonths) - 1)));
	let sum = monthPay * countMonths;
	return parseFloat(sum.toFixed(2));
}