let totalC1 = 0; // Variable to store the sum of all c1 values
let serialNo = 1; // To keep track of serial number for each line

// Function to add a new line of inputs
function addLine() {
    const container = document.getElementById('lines-container');
    
    const line = document.createElement('div');
    line.classList.add('line');
    
    const serialNoSpan = document.createElement('span');
    serialNoSpan.textContent = serialNo; // Set the current serial number

    const inputA1 = document.createElement('input');
    inputA1.type = 'number';
    inputA1.value = ''; // Default blank value
    inputA1.min = 0;
    inputA1.placeholder = 'A1';
    inputA1.oninput = () => updateC1(line, inputA1, inputB1, inputC1);
    
    const inputB1 = document.createElement('input');
    inputB1.type = 'number';
    inputB1.value = 1; // Default value is 1
    inputB1.min = 0;
    inputB1.placeholder = 'B1';
    inputB1.oninput = () => updateC1(line, inputA1, inputB1, inputC1);
    
    const inputC1 = document.createElement('input');
    inputC1.type = 'text';
    inputC1.readOnly = true;
    inputC1.value = 0;
    inputC1.classList.add('extra-bold-text');  // Extra bold text for C1 value

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-line');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => removeLine(line);
    
    line.appendChild(serialNoSpan);
    line.appendChild(inputA1);
    line.appendChild(inputB1);
    line.appendChild(inputC1);
    line.appendChild(removeButton);
    
    container.appendChild(line);

    serialNo++; // Increment serial number for the next line
    updateTotal();
}

// Function to update C1 based on A1 and B1 values
function updateC1(line, inputA1, inputB1, inputC1) {
    const a1Value = parseFloat(inputA1.value) || 0;
    const b1Value = parseFloat(inputB1.value) || 1; // Default B1 is 1
    
    const c1Value = a1Value * b1Value;
    inputC1.value = c1Value.toFixed(2);
    
    updateTotal();
}

// Function to update the total value of D
function updateTotal() {
    totalC1 = 0;

    const lines = document.querySelectorAll('.line');
    lines.forEach(line => {
        const c1Value = parseFloat(line.querySelector('input[type="text"]').value) || 0;
        totalC1 += c1Value;
    });

    const totalInput = document.getElementById('d');
    totalInput.value = totalC1.toFixed(2);
    totalInput.classList.add('extra-bold-text');  // Extra bold style for D box
}

// Function to remove a line
function removeLine(line) {
    line.remove();
    serialNo = 1; // Reset serial number

    // Recalculate serial numbers for all remaining lines
    const remainingLines = document.querySelectorAll('.line');
    remainingLines.forEach((line, index) => {
        line.querySelector('span').textContent = index + 1;
    });
    
    updateTotal();
}
