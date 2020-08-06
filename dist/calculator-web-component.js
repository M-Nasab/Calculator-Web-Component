'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var keys = {
  NUM_1: 1,
  NUM_2: 2,
  NUM_3: 3,
  NUM_4: 4,
  NUM_5: 5,
  NUM_6: 6,
  NUM_7: 7,
  NUM_8: 8,
  NUM_9: 9,
  NUM_0: 0,
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: '×',
  DIVIDE: '÷',
  EQUALS: '=',
  DOT: '.',
  SQRT: '√',
  CHS: '±',
  CLEAR: 'c'
};
function Calculator() {
  var operands = [0];
  var operators = [];
  var cursor = 0;
  var displayPointer = 0;
  var nextDisplayPointer = 0;
  var shouldReplace = false;

  function clear() {
    operands = [0];
    operators = [];
    cursor = 0;
    displayPointer = 0;
    nextDisplayPointer = 0;
    shouldReplace = false;
  }

  function isNumber(key) {
    var numberKeys = [keys.NUM_0, keys.NUM_1, keys.NUM_2, keys.NUM_3, keys.NUM_4, keys.NUM_5, keys.NUM_6, keys.NUM_7, keys.NUM_8, keys.NUM_9];
    return numberKeys.includes(key);
  }

  function isBinaryOperator(key) {
    var binaryOperators = [keys.ADD, keys.SUBTRACT, keys.DIVIDE, keys.MULTIPLY];
    return binaryOperators.includes(key);
  }

  function isUnaryOperator(key) {
    var unaryOperators = [keys.SQRT, keys.CHS];
    return unaryOperators.includes(key);
  }

  function calculate(firstOperand, secondOperand, operation) {
    switch (operation) {
      case keys.ADD:
        return firstOperand + secondOperand;

      case keys.SUBTRACT:
        return firstOperand - secondOperand;

      case keys.MULTIPLY:
        return firstOperand * secondOperand;

      case keys.DIVIDE:
        if (secondOperand === 0) {
          throw new Error('division by zero');
        }

        return firstOperand / secondOperand;

      default:
        throw new Error("operation is not valid");
    }
  }

  function calculateUnaryOperation(operand, operator) {
    switch (operator) {
      case keys.SQRT:
        return Math.sqrt(operand);

      case keys.CHS:
        return -operand;

      default:
        throw new Error("operation is not valid");
    }
  }

  function doOperation() {
    if (operators[0]) {
      var operation = operators[0];
      var firstOperand = operands[0];
      var secondOperand = operands[1];
      var result = firstOperand !== undefined && secondOperand !== undefined ? calculate(firstOperand, secondOperand, operation) : firstOperand;
      operands[0] = result;
    }

    displayPointer = 0;
    shouldReplace = true;
    cursor = 0;
  }

  function display() {
    return operands[displayPointer];
  }

  function pressKey(key) {
    var isValidKey = Object.keys(keys).some(function (k) {
      return keys[k] === key;
    });

    if (!isValidKey) {
      throw new Error('Pressed key is invalid');
    }

    if (isNumber(key)) {
      if (nextDisplayPointer !== displayPointer) {
        operands[nextDisplayPointer] = 0;
        cursor = 0;
        displayPointer = nextDisplayPointer;
      }

      var currentValue = !shouldReplace ? operands[displayPointer] : 0;
      var finalValue = cursor === 0 ? currentValue * 10 + key : currentValue + key * Math.pow(10, cursor);
      operands[displayPointer] = finalValue;
      shouldReplace = false;

      if (cursor < 0) {
        cursor--;
      }
    } else if (isBinaryOperator(key)) {
      if (displayPointer === 1) {
        doOperation();
      }

      operators[0] = key;
      nextDisplayPointer = 1;
    } else if (isUnaryOperator(key)) {
      var operand = operands[displayPointer];
      operands[displayPointer] = calculateUnaryOperation(operand, key);
    } else if (key === keys.EQUALS) {
      doOperation();
      nextDisplayPointer = 0;
    } else if (key === keys.DOT) {
      if (cursor === 0) {
        cursor = -1;
      }
    } else if (key === keys.CLEAR) {
      clear();
    }

    return this;
  }

  var calculator = {
    display: display,
    pressKey: pressKey,
    keys: keys
  };
  return calculator;
}

var CalculatorWebComponent = /*#__PURE__*/function (_HTMLElement) {
  _inherits(CalculatorWebComponent, _HTMLElement);

  var _super = _createSuper(CalculatorWebComponent);

  function CalculatorWebComponent() {
    var _this;

    _classCallCheck(this, CalculatorWebComponent);

    _this = _super.call(this);
    _this.calculator = Calculator();
    _this.keys = _this.calculator.keys;
    _this.buttonClickHandler = _this.buttonClickHandler.bind(_assertThisInitialized(_this));

    _this.attachShadow({
      mode: 'open'
    });

    return _this;
  }

  _createClass(CalculatorWebComponent, [{
    key: "getCalculatorKey",
    value: function getCalculatorKey(buttonKey) {
      switch (buttonKey) {
        case 'c':
          return this.keys.CLEAR;

        case 'chs':
          return this.keys.CHS;

        case 'add':
          return this.keys.ADD;

        case 'subtract':
          return this.keys.SUBTRACT;

        case 'multiply':
          return this.keys.MULTIPLY;

        case 'divide':
          return this.keys.DIVIDE;

        case 'equals':
          return this.keys.EQUALS;

        case 'dot':
          return this.keys.DOT;

        case 'sqrt':
          return this.keys.SQRT;

        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          return this.keys["NUM_".concat(buttonKey)];
      }
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      var calculatorTemplate = document.createElement('template');
      calculatorTemplate.innerHTML = "\n            <link href=\"https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&display=swap\" rel=\"stylesheet\">\n            <style>\n                :host {\n                    display: block;\n                    font-family: 'Lobster Two', cursive;\n                    width: 100%;\n                    max-width: 400px;\n                    background-color: #747579;\n                    border-radius: 5px;\n                    box-shadow: 0 0 3px 4px #535050 inset;\n                    overflow: hidden;\n                }\n                .display-container {\n                    padding: 20px;\n                    background-color: #161415;\n                }\n                .buttons-container {\n                    padding: 20px;\n                    display: grid;\n                    gap: 10px;\n                    grid-template-columns: repeat(4, 1fr);\n                }\n                .display {\n                    font-size: 40px;\n                    font-weight: 700;\n                    background: linear-gradient(to right, #b4c6b6, #c1d6c7);\n                    text-align: right;\n                    padding: 5px 20px;\n                    border-radius: 4px;\n                    color: #1f2823;\n                    box-shadow: 0 0 0 2px #666 inset;\n                }\n                .button {\n                    display: block;\n                    background: none;\n                    background-color: #181617;\n                    border-radius: 5px;\n                    color: #ffffff;\n                    padding: 10px;\n                    text-align: center;\n                    border: none;\n                    font-family: 'Lobster Two', cursive;\n                    font-weight: 700;\n                    font-size: 32px;\n                    box-shadow: 0 0 4px 8px #2e2c2d inset;\n                    cursor: pointer;\n                }\n\n                .button:hover {}\n\n                .button-light {\n                    background-color: #403d46;\n                    box-shadow: 0 0 4px 8px #55535a inset;\n                }\n\n                #times-btn {\n                    grid-column: 4;\n                    grid-row: 2;\n                }\n\n                #subtract-btn {\n                    grid-column: 4;\n                    grid-row: 3;\n                }\n\n                #add-btn {\n                    grid-column: 4;\n                    grid-row: 4/6;\n                }\n            </style>\n            <div class=\"display-container\">\n                <div id=\"display\" class=\"display\"></div>\n            </div>\n            <div class=\"buttons-container\">\n                <button data-key=\"c\" id=\"clear-btn\" class=\"button button-light\">C</button>\n                <button data-key=\"chs\" id=\"negative-btn\" class=\"button\">+/-</button>\n                <button data-key=\"sqrt\" id=\"radical-btn\" class=\"button\">\u221A\xAF</button>\n                <button data-key=\"divide\" id=\"divide-btn\" class=\"button\">\xF7</button>\n                <button data-key=\"multiply\" id=\"times-btn\" class=\"button\">\xD7</button>\n                <button data-key=\"subtract\" id=\"subtract-btn\" class=\"button\">-</button>\n                <button data-key=\"add\" id=\"add-btn\" class=\"button\">+</button>\n                <button data-key=\"1\" class=\"button\">1</button>\n                <button data-key=\"2\" class=\"button\">2</button>\n                <button data-key=\"3\" class=\"button\">3</button>\n                <button data-key=\"4\" class=\"button\">4</button>\n                <button data-key=\"5\" class=\"button\">5</button>\n                <button data-key=\"6\" class=\"button\">6</button>\n                <button data-key=\"7\" class=\"button\">7</button>\n                <button data-key=\"8\" class=\"button\">8</button>\n                <button data-key=\"9\" class=\"button\">9</button>\n                <button data-key=\"dot\" class=\"button\">.</button>\n                <button data-key=\"0\" class=\"button\">0</button>\n                <button data-key=\"equals\" class=\"button\">=</button>\n            </div>\n        ";
      this.shadowRoot.appendChild(document.importNode(calculatorTemplate.content, true));
      var displayElement = this.shadowRoot.querySelector('#display');
      displayElement.textContent = this.calculator.display();
      this.shadowRoot.querySelectorAll('button').forEach(function (button) {
        button.addEventListener('click', _this2.buttonClickHandler);
      });
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _this3 = this;

      this.shadowRoot.querySelectorAll('button').forEach(function (button) {
        button.removeEventListener('click', _this3.buttonClickHandler);
      });
    }
  }, {
    key: "buttonClickHandler",
    value: function buttonClickHandler(event) {
      var button = event.target;
      var buttonKey = button.dataset.key;
      var calcKey = this.getCalculatorKey(buttonKey);
      this.calculator.pressKey(calcKey);
      this.shadowRoot.querySelector('#display').textContent = Math.round(this.calculator.display() * 1000000) / 1000000;
    }
  }]);

  return CalculatorWebComponent;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('calculator-web-component', CalculatorWebComponent);
