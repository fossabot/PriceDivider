// Copyright (c) 2019 Zekromaster <personal@zekromaster.net>
//
// GNU GENERAL PUBLIC LICENSE
//    Version 3, 29 June 2007
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import * as readline from 'readline-sync';
import { readdirSync, readFileSync } from 'fs';
import { format } from 'util'

class Utils {
	static round(x: number, precision: number): number {
		return Math.round((x * Math.pow(10, precision))) / Math.pow(10, precision);
	}
}

class Locale {
	private _name: string;
	private _translations;

	private constructor(name: string, translations: any) {
		this._name = name;
		this._translations = translations;
	}

	get name(): string {
		return this._name;
	}

	translate(key: string): string {
		return this._translations[key];
	}

	//Factory
	static LocaleFactory(name: string, translations: any): Locale {
		return new Locale(name, translations);
	}
	static ReadLocale(locale: string): Locale {
		return Locale.LocaleFactory(locale, JSON.parse(readFileSync(Localizer.langDir + locale + ".json", 'utf8')));
	}
}

class Localizer {
	static readonly langDir: string = __dirname + "/lang/";
	private _locales: Array<Locale>;
	private _currentLocale: string;

	private constructor() {
		let jsonFile: RegExp = /(\w+)\.json/
		this._locales = [];
		let localeList: Array<string> = readdirSync(Localizer.langDir, 'utf8').filter((x) => x.match(jsonFile));
		localeList.forEach(
			(locale) => {
				this._locales.push(Locale.ReadLocale(locale.match(jsonFile)[1]));
			}
		)
		this._currentLocale = "en";
	}

	get locales(): Array<string> {
		return this._locales.map((locale) => locale.name);
	}

	get currentLocaleName(): string {
		return this._currentLocale;
	}
	set currentLocaleName(value: string) {
		if (this.locales.includes(value)) {
			this._currentLocale = value;
		}
	}

	get currentLocale(): Locale {
		return this.getLocaleObject(this.currentLocaleName) || this.getLocaleObject("en");
	}

	getLocaleObject(locale: string): Locale {
		return this._locales.find((localeF) => localeF.name === locale);
	}

	localize(key: string, locale?: string): string {
		var lang: Locale = locale ? this.getLocaleObject(locale) : this.currentLocale
		return lang.translate(key);
	}

	// Factory
	static LocalizerFactory() {
		return new Localizer();
	}
}

class Order {
	private _people: Array<Person>;
	private _price: number;

	private constructor(price: number) {
		this._price = price;
		this._people = [];
	}

	join(person: Person) {
		this._people.push(person);
	}

	get people(): Array<Person> {
		return this._people;
	}
	get shipping(): number {
		return this._price;
	}

	get shippingPerCapita(): number {
		return Utils.round(this.shipping / this.people.length, 2);
	}

	get shippingSurplus(): number {
		return Utils.round(this.shipping - (this.shippingPerCapita * this.people.length), 2);
	}

  get shipfreePrice(): number {
    var sum = 0;
    for (let person of this.people) {
      sum += person.price;
    }
    return sum;
  }

  get totalPrice(): number {
    return Utils.round(this.shipfreePrice + this.shipping, 2);
  }

	getPersonalPrice(person: string): number {
		return Utils.round(this.people.find((pPerson) => pPerson.name == person).price + this.shippingPerCapita, 2);
	}

	// Factory
	static OrderFactory(price: number) {
		return new Order(price);
	}
}

class Person {
	private _name: string;
	private _products: { [name: string]: Product }

	private constructor(name: string) {
		this._name = name;
		this._products = {}
	}

	get name(): string {
		return this._name;
	}
	get products(): { [name: string]: Product } {
		return this._products;
	}

	get price(): number {
		let price = 0;
		for (let product in this.products) {
			price += this.products[product].totalPrice;
		}
		return Utils.round(price, 2);
	}

	buy(productName: string, product: Product): void {
		this._products[productName] = product;
	}

	buyMany(...products: [string, Product][]): void {
		for (let product of products) {
			this.buy(product[0], product[1]);
		}
	}

	// Factory
	static PersonFactory(nome: string): Person {
		return new Person(nome);
	}
}

class Product {
	private _price: number;
	private _number: number;

	private constructor(price: number, number: number) {
		this._price = price;
		this._number = number;
	}

	get price(): number {
		return this._price;
	}
	get number(): number {
		return this._number;
	}

	set number(value: number) {
		this._number = value;
	}

	public add(addition: number) {
		this.number = Math.max(this.number + addition, 0);
	}

	get totalPrice(): number {
		return this.number * this.price;
	}

	// Factory
	static ProductFactory(price: number, number: number): Product {
		return new Product(price, number);
	}
	static CloneProduct(product: Product): Product {
		return new Product(product.price, product.number);
	}
	static ChangeProductNumber(product: Product, number: number): Product {
		var newProduct: Product = Product.CloneProduct(product);
		newProduct.number = number;
		return newProduct;
	}
}

// Declaring the main function
function main() {
	// Localization
	var localizer: Localizer = Localizer.LocalizerFactory();
	localizer.currentLocaleName = localizer.locales[readline.keyInSelect(localizer.locales, "Select a language: ")];

	// Getting products and people
	var productFileName: string = readline.question(localizer.localize("getProductFileName"));
	var peopleFileName: string = readline.question(localizer.localize("getPeopleFileName"));
	var peopleFile: { people: Array<{ name: string, products: Array<{ name: string, number: number }> }>, shipping: number } = JSON.parse(readFileSync(__dirname + "/" + peopleFileName, 'utf8'));
	var productsFile: Array<{ name: string, price: number }> = JSON.parse(readFileSync(productFileName, 'utf8'));

  // Parsing people
	var people: { [name: string]: Person } = {};
	for (let person of peopleFile.people) {
		people[person.name] = Person.PersonFactory(person.name);
	}

	// Parsing products
	var products: { [name: string]: Product } = {};
	for (let product of productsFile) {
		products[product.name] = Product.ProductFactory(product.price, 0)
	}

	// Assigning products to people
	for (let name in people) {
		let person = people[name];
		var fileData = peopleFile.people.find((value) => { return value.name === name });
		for (let product of fileData.products) {
			person.buy(product.name, Product.ChangeProductNumber(products[product.name], product.number));
		}
	}

  // Creating the order
	var order: Order = Order.OrderFactory(peopleFile.shipping);
	for (let person in people) {
		order.join(people[person]);
	}

  // At this point we output
	for (let index in people) {
    var person: Person = people[index];
    console.log(person.name + " - " + order.getPersonalPrice(person.name));
	}
	console.log("---------------------------");
	console.log(format(localizer.localize("finalResults"), order.totalPrice, order.shippingSurplus));
}

main();
