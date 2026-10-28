
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();

        if (value === "AC") {
            clearDisplay();
        } else if (value === "DEL") {
            deleteLast();
        } else if (value === "=") {
            calculate();
        } else {
            appendValue(value);
        }
    });
});

function appendValue(value) {
    if (display.value === "Error") {
        display.value = "";
    }

    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    if (display.value === "Error") {
        display.value = "";
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    const expression = display.value;

    if (!expression) return;

    // Allow only calculator characters
    if (!/^[0-9+\-*/%.()\s]+$/.test(expression)) {
        display.value = "Error";
        return;
    }

    try {
        // Convert values such as 50% to 50/100
        const prepared = expression.replace(
            /(\d+\.?\d*|\.\d+)%/g,
            "($1/100)"
        );

        const result = Function(
            '"use strict"; return (' + prepared + ')'
        )();

        if (!Number.isFinite(result)) {
            display.value = "Error";
        } else {
            display.value = Number(
                result.toPrecision(12)
            ).toString();
        }
    } catch (error) {
        display.value = "Error";
    }
}
