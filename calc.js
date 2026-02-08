
        let currentOperand = '0';
        let previousOperand = '';
        let operation = null;

        const currentDisplay = document.getElementById('currentDisplay');
        const previousDisplay = document.getElementById('previousDisplay');

        function updateDisplay() {
            currentDisplay.textContent = currentOperand;
            if (operation != null) {
                previousDisplay.textContent = `${previousOperand} ${operation}`;
            } else {
                previousDisplay.textContent = '';
            }
        }

        function appendNumber(number) {
            if (number === '.' && currentOperand.includes('.')) return;
            
            if (currentOperand === '0' && number !== '.') {
                currentOperand = number;
            } else {
                currentOperand += number;
            }
            updateDisplay();
        }

        function chooseOperation(op) {
            if (currentOperand === '') return;
            
            if (previousOperand !== '') {
                calculate();
            }
            
            operation = op;
            previousOperand = currentOperand;
            currentOperand = '';
            updateDisplay();
        }

        function calculate() {
            let result;
            const prev = parseFloat(previousOperand);
            const current = parseFloat(currentOperand);
            
            if (isNaN(prev) || isNaN(current)) return;
            
            switch (operation) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '×':
                    result = prev * current;
                    break;
                case '÷':
                    if (current === 0) {
                        alert('Cannot divide by zero');
                        clearCalculator();
                        return;
                    }
                    result = prev / current;
                    break;
                case '%':
                    result = prev % current;
                    break;
                default:
                    return;
            }
            
            currentOperand = result.toString();
            operation = null;
            previousOperand = '';
            updateDisplay();
        }

        function clearCalculator() {
            currentOperand = '0';
            previousOperand = '';
            operation = null;
            updateDisplay();
        }

        function deleteDigit() {
            if (currentOperand.length === 1) {
                currentOperand = '0';
            } else {
                currentOperand = currentOperand.slice(0, -1);
            }
            updateDisplay();
        }

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
            if (e.key === '.') appendNumber('.');
            if (e.key === '+' || e.key === '-') chooseOperation(e.key);
            if (e.key === '*') chooseOperation('×');
            if (e.key === '/') {
                e.preventDefault();
                chooseOperation('÷');
            }
            if (e.key === '%') chooseOperation('%');
            if (e.key === 'Enter' || e.key === '=') calculate();
            if (e.key === 'Escape') clearCalculator();
            if (e.key === 'Backspace') deleteDigit();
        });
    