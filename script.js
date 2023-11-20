
    const equations = [];	
		let canGenerateNewEquation = true;
    //console.log(canGenerateNewEquation);
		function selectEquation(){

			if (!canGenerateNewEquation) {
    	return;
  		}	
        let type = Math.floor(Math.random() * 2) + 1;
    let x, y, z, equationText;
    let expectedAnswer;
    x = Math.floor(Math.random() * 9) + 1; 
    y = Math.floor(Math.random() * 9) + 1; 
    z = Math.floor(Math.random() * 9) + 1; 
    
    if (type === 1 && x + y > z) {
        equationText = `${x} + ${y} - ${z} = `;
        expectedAnswer = (x + y - z).toString();
        generateEquation(equationText,expectedAnswer);
    } else if (type === 2 && x - y > -0) {
        equationText = `${x} - ${y} + ${z} = `;
        expectedAnswer = (x - y + z).toString();
        generateEquation(equationText,expectedAnswer);
    } else {
      
        selectEquation();
    }
		 	// let type= Math.floor(Math.random()*3)+1;
			// let x,y,expectedAnswer,equationText;
			// if(type===1)
			// {
      // x = Math.floor(Math.random() * 8) + 1; 
      // y = Math.floor(Math.random() * (9 - x - 1)) + 1;
			// equationText = `${x} + ${y} =  `;
			// expectedAnswer=(x+y).toString();
			// }
			// else if(type===2)
			// {
			// y = Math.floor(Math.random() * 8) + 1; 
      // x = Math.floor(Math.random() * (9 - y)) + y;
			// equationText = `${x} - ${y} =  `;
			// expectedAnswer=(x-y).toString();
			// }

			// else{
			// 	x = Math.floor(Math.random() * 8) + 1; 
			// 	y = Math.floor(Math.random() * (9 - x - 1)) + 1;
			// 	let z= Math.floor(Math.random()*(x+y-1))+1;
			// 	equationText = `${x} + ${y} - ${z} = `;
  		// 	expectedAnswer = (x + y - z).toString();

				
			// }
			// generateEquation(equationText,expectedAnswer);
		}
    

function generateEquation(equationText, expectedAnswer) {
  canGenerateNewEquation = false;
  const equationsTable = document.getElementById('equationsTable'); // Update to 'equationsTable'

  // Create a new table row
  const newRow = document.createElement('tr');

  // Create a table cell for the equation text
  const equationCell = document.createElement('td');
  equationCell.textContent = equationText;

  // Create a table cell for the user input
  const userInputCell = document.createElement('td');
  const userInput = document.createElement('input');
  userInput.type = 'text';
  userInput.style.fontSize = '24px';
  userInputCell.appendChild(userInput);

  // Create a table cell for correctness
  const correctnessCell = document.createElement('td');
  const correctness = document.createElement('span');

  newRow.appendChild(equationCell);
  newRow.appendChild(userInputCell);
  newRow.appendChild(correctnessCell);
  correctnessCell.appendChild(correctness);

  equationsTable.appendChild(newRow);

  equations.push({
    equationText,
    expectedAnswer,
    userInput,
    correctness
  });

  // Add an event listener to check the answer when Enter is pressed
  userInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      const userAnswer = userInput.value.trim();
      if (userAnswer === expectedAnswer) {
        correctness.textContent = '✔';
        correctness.className = 'correct';
        canGenerateNewEquation = true;
        selectEquation();

        const currentIndex = equations.findIndex((eq) => eq.userInput === userInput);

        // If there is a next input, focus on it
        if (currentIndex < equations.length - 1) {
          equations[currentIndex + 1].userInput.focus();
        }
      } else {
        correctness.textContent = '✘';
        correctness.className = 'incorrect';
      }
    }
  });
}

    // Generate the initial equation
    selectEquation();