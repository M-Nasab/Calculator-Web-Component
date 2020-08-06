import Calculator from 'calculator-logic';

class CalculatorWebComponent extends HTMLElement {
    constructor () {
        super();

        this.calculator = Calculator();
        this.keys = this.calculator.keys;

        this.buttonClickHandler = this.buttonClickHandler.bind(this);
        
        this.attachShadow({ mode: 'open' });
    }

    getCalculatorKey (buttonKey) {
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
                return this.keys[`NUM_${buttonKey}`];
        }
    }

    connectedCallback () {
        const calculatorTemplate = document.createElement('template');
        calculatorTemplate.innerHTML = `
            <link href="https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&display=swap" rel="stylesheet">
            <style>
                :host {
                    display: block;
                    font-family: 'Lobster Two', cursive;
                    width: 100%;
                    max-width: 400px;
                    background-color: #747579;
                    border-radius: 5px;
                    box-shadow: 0 0 3px 4px #535050 inset;
                    overflow: hidden;
                }
                .display-container {
                    padding: 20px;
                    background-color: #161415;
                }
                .buttons-container {
                    padding: 20px;
                    display: grid;
                    gap: 10px;
                    grid-template-columns: repeat(4, 1fr);
                }
                .display {
                    font-size: 40px;
                    font-weight: 700;
                    background: linear-gradient(to right, #b4c6b6, #c1d6c7);
                    text-align: right;
                    padding: 5px 20px;
                    border-radius: 4px;
                    color: #1f2823;
                    box-shadow: 0 0 0 2px #666 inset;
                }
                .button {
                    display: block;
                    background: none;
                    background-color: #181617;
                    border-radius: 5px;
                    color: #ffffff;
                    padding: 10px;
                    text-align: center;
                    border: none;
                    font-family: 'Lobster Two', cursive;
                    font-weight: 700;
                    font-size: 32px;
                    box-shadow: 0 0 4px 8px #2e2c2d inset;
                    cursor: pointer;
                }

                .button:hover {}

                .button-light {
                    background-color: #403d46;
                    box-shadow: 0 0 4px 8px #55535a inset;
                }

                #times-btn {
                    grid-column: 4;
                    grid-row: 2;
                }

                #subtract-btn {
                    grid-column: 4;
                    grid-row: 3;
                }

                #add-btn {
                    grid-column: 4;
                    grid-row: 4/6;
                }
            </style>
            <div class="display-container">
                <div id="display" class="display"></div>
            </div>
            <div class="buttons-container">
                <button data-key="c" id="clear-btn" class="button button-light">C</button>
                <button data-key="chs" id="negative-btn" class="button">+/-</button>
                <button data-key="sqrt" id="radical-btn" class="button">√¯</button>
                <button data-key="divide" id="divide-btn" class="button">÷</button>
                <button data-key="multiply" id="times-btn" class="button">×</button>
                <button data-key="subtract" id="subtract-btn" class="button">-</button>
                <button data-key="add" id="add-btn" class="button">+</button>
                <button data-key="1" class="button">1</button>
                <button data-key="2" class="button">2</button>
                <button data-key="3" class="button">3</button>
                <button data-key="4" class="button">4</button>
                <button data-key="5" class="button">5</button>
                <button data-key="6" class="button">6</button>
                <button data-key="7" class="button">7</button>
                <button data-key="8" class="button">8</button>
                <button data-key="9" class="button">9</button>
                <button data-key="dot" class="button">.</button>
                <button data-key="0" class="button">0</button>
                <button data-key="equals" class="button">=</button>
            </div>
        `;
        
        this.shadowRoot.appendChild(document.importNode(calculatorTemplate.content, true));
        
        const displayElement = this.shadowRoot.querySelector('#display');

        displayElement.textContent = this.calculator.display();

        this.shadowRoot.querySelectorAll('button').forEach((button) => {
            button.addEventListener('click', this.buttonClickHandler);
        });
    }

    disconnectedCallback () {
        this.shadowRoot.querySelectorAll('button').forEach((button) => {
            button.removeEventListener('click', this.buttonClickHandler);
        });
    }

    buttonClickHandler (event) {
        const button = event.target;
        const buttonKey = button.dataset.key;
        const calcKey = this.getCalculatorKey(buttonKey);
        this.calculator.pressKey(calcKey);
        this.shadowRoot.querySelector('#display').textContent = Math.round(this.calculator.display() * 1000000)/1000000;
    }
}

customElements.define('calculator-web-component', CalculatorWebComponent);