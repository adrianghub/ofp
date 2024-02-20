function validator(validatorCb) {
  const input = document.getElementById('input');
  const validateButton = document.getElementById('validateButton');
  const clearButton = document.getElementById('clearButton');
  const result = document.getElementById('result');

  validateButton.addEventListener('click', () => {
    const isValidInput = validatorCb(input.value);

    if (!isValidInput) {
      result.innerHTML = 'Invalid';
      return;
    }
    result.innerHTML = 'Valid';
  });

  clearButton.addEventListener('click', () => {
    input.value = '';
    result.innerHTML = '';
  });
}

function isValidNumberInRangeAndEven(input) {
  const numberInput = input && Number(input);
  return numberInput > 0 && numberInput < 100 && numberInput % 2 === 0;
}

validator(isValidNumberInRangeAndEven);
