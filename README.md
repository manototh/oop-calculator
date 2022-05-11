# oop-calculator

This is an exercise to construct a basic calculator in JavaScript using the principles of object-oriented programming (OOP).

The calculator implements the Model View Controller design pattern (MVC). The core functionality and the UI rendering are completely separated in the code.

For an example implementation of this calculator, see [OOP Basic Calculator](https://jsfiddle.net/manototh/8qLvb64t/3/) on JSFiddle.

*I coded this project as part of a [Follow the Pattern](https://followthepattern.net/learn) course.*

## Creating your calculator

To create your calculator, follow these steps:

1. Create a copy of the file `source\oop-navbar.ts`, and open it with your text editor.
2. At the bottom of the file, delete the example.
3. Create a `CalculatorCore` object with no parameters, specifying the title of the navigation bar in a string-type parameter.
4. Create a `CalculatorUIOptions` object. The first parameter is the CSS selector of the HTML element where you want to insert the calculator into the DOM. Optionally, specify the colors of the calculator with the following paramaters:
   - Specify a CSS color value in the second parameter to determine the color of the calculator's background.
   - Specify a CSS color value in the third parameter to determine the color of the buttons.
   - Specify a CSS color value in the fourth parameter to determine the color of the calculator's display.
   - Specify a CSS color value in the fifth parameter to determine the color of the text in the calculator.
4. Create a `CalculatorUI` object with two parameters. The first parameter is the `CalculatorCore` object, and the second parameter is the `CalculatorUIOptions` object you have created in the previous steps.
5. Call the `render` method of the `CalculatorUI` object.

As a result, you have created your calculator.