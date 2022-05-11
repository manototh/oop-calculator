'use strict';

// Reactor pattern
class Event {
    constructor(name) {
        this.name = name;
        this.callbacks = [];
    }
}

Event.prototype.registerCallback = function (callback) {
    this.callbacks.push(callback);
}

class Reactor {
    constructor() {
        this.events = {};
    }
}

Reactor.prototype.registerEvent = function (eventName) {
    this.events[eventName] = new Event(eventName);
};

Reactor.prototype.dispatchEvent = function (eventName, eventArgs) {
    this.events[eventName].callbacks.forEach(function (callback) { callback(eventArgs); });
};

Reactor.prototype.addEventListener = function (eventName, callback) {
    this.events[eventName].registerCallback(callback);
};


// Core calculator functionality
class CalculatorCore {
    constructor() {
        this.input = "";
        this._reactor = new Reactor();
        this._reactor.registerEvent("calc");
    }
}

CalculatorCore.prototype.addEventListener = function (eventName, callback) {
    this._reactor.addEventListener(eventName, callback);
}

CalculatorCore.prototype.calculate = function () {
    let result = NaN;
    try {
        result = eval(this.input).toString();
    } catch (e) {
        if (e instanceof SyntaxError) {
            console.error(e);
        } else {
            throw e;
        }
    }

    this._reactor.dispatchEvent("calc", result);
}

CalculatorCore.prototype.setInput = function (input) {
    this.input = input;
}

CalculatorCore.prototype.getInput = function () {
    return this.input;
}

class CalculatorUIOptions {
    constructor(calculatorSelector, calculatorBackgroundColor, buttonBackgroundColor, displayBackgroundColor, textColor) {
        this.calculatorSelector = calculatorSelector;
        this.calculatorBackgroundColor = typeof (calculatorBackgroundColor) === "string" ? calculatorBackgroundColor : "";
        this.buttonBackgroundColor = typeof (buttonBackgroundColor) === "string" ? buttonBackgroundColor : "";
        this.displayBackgroundColor = typeof (displayBackgroundColor) === "string" ? displayBackgroundColor : "";
        this.textColor = typeof (textColor) === "string" ? textColor : "";
    }
}

class CalculatorOptionsTypeError {
    constructor(message) {
        TypeError.call(this);
        this.message = message;
    }
}


// Calculator UI functionality
class CalculatorUI {
    constructor(calculator, options) {
        this.options = options;
        this.calculator = calculator;
        this.calculator.addEventListener("calc", this.onResultChanged.bind(this));
    }
}

CalculatorUI.prototype.onResultChanged = function (result) {
    this.setContent(result);
}

CalculatorUI.prototype.render = function () {
    try {
        this.calculatorWrapper = document.querySelector(this.options.calculatorSelector);
        this.calculatorContainer = this.calculatorWrapper.querySelector(".calculator-container");
        this.calculatorDisplay = this.calculatorWrapper.querySelector(".calculator-display .calculator-element-content");
        this.calculatorButtons = this.calculatorWrapper.querySelectorAll(".calculator-button");
    } catch {
        console.error("No HTML element found with the specified selector.");
    }

    for (let i = 0; i < this.calculatorButtons.length; i++) {
        this.calculatorButtons[i].addEventListener("click", this.onButtonClick.bind(this), false);
    }

    let stylesheetElement = document.createElement('style');
    document.head.append(stylesheetElement);
    let stylesheet = stylesheetElement.sheet;
    stylesheet.insertRule(".calculator-container {background-color: " + this.options.calculatorBackgroundColor + "}");
    stylesheet.insertRule(".calculator-logo-button .calculator-element-container, .calculator-button .calculator-element-container {background-color: " + this.options.buttonBackgroundColor + "}");
    stylesheet.insertRule(".calculator-display .calculator-element-container {background-color: " + this.options.displayBackgroundColor + "}");
    stylesheet.insertRule(".calculator-container {color: " + this.options.textColor + "}");
};

CalculatorUI.prototype.setContent = function (input) {
    this.calculatorDisplay.innerText = input;
    this.calculator.setInput(input);
};

CalculatorUI.prototype.getContent = function () {
    return this.calculator.getInput();
};

CalculatorUI.prototype.setContentToString = function () {
    if (typeof (this.getContent()) !== "string") {
        this.setContent("");
    }
};

CalculatorUI.prototype.onButtonClick = function (event) {
    let buttonClicked = event.target.innerText;
    this.setContentToString.call(this);

    const operationButtons = ["+", "-", "/", "*"];
    const numberButtons = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const decimalButton = ["."];
    const equalButton = ["="];
    const allClearButton = ["AC"];
    const clearButton = ["C"];
    const parenthesesButton = ["()"];

    if (allClearButton.includes(buttonClicked)) {
        this.setContent("");
    } else if (clearButton.includes(buttonClicked)) {
        this.setContent(this.getContent().slice(0, -1));
    } else if (numberButtons.includes(buttonClicked) || decimalButton.includes(buttonClicked) || operationButtons.includes(buttonClicked)) {
        this.setContent(this.getContent() + buttonClicked);
    } else if (parenthesesButton.includes(buttonClicked) && (numberButtons.includes(this.getContent().slice(-1)) || this.getContent().slice(-1) === ")")) {
        this.setContent(this.getContent() + ")");
    } else if (parenthesesButton.includes(buttonClicked) && (operationButtons.includes(this.getContent().slice(-1)) || this.getContent().slice(-1) === "" || this.getContent().slice(-1) === "(")) {
        this.setContent(this.getContent() + "(");
    } else if (equalButton.includes(buttonClicked)) {
        this.calculator.calculate();
    }
};


// Specify the properties of your calculator. See the example below, and replace it with your own code.
let calculator1Core = new CalculatorCore();
let calculator1Options = new CalculatorUIOptions("#calculator1", "snow");

let calculator1 = new CalculatorUI(calculator1Core, calculator1Options);
calculator1.render();