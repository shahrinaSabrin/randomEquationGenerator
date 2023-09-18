
    const equations = [];	
		let canGenerateNewEquation = true;
		function selectEquation(){

			if (!canGenerateNewEquation) {
    	return;
  		}		
		 	let type= Math.floor(Math.random()*3)+1;
			let x,y,expectedAnswer,equationText;
			if(type===1)
			{
      x = Math.floor(Math.random() * 8) + 1; 
      y = Math.floor(Math.random() * (9 - x - 1)) + 1;
			equationText = `${x} + ${y} =  `;
			expectedAnswer=(x+y).toString();
			}
			else if(type===2)
			{
			y = Math.floor(Math.random() * 8) + 1; 
      x = Math.floor(Math.random() * (9 - y)) + y;
			equationText = `${x} - ${y} =  `;
			expectedAnswer=(x-y).toString();
			}

			else{
				x = Math.floor(Math.random() * 8) + 1; 
				y = Math.floor(Math.random() * (9 - x - 1)) + 1;
				let z= Math.floor(Math.random()*(x+y-1))+1;
				equationText = `${x} + ${y} - ${z} = `;
  			expectedAnswer = (x + y - z).toString();

				
			}
			generateEquation(equationText,expectedAnswer);
		}
    function generateEquation(equationText,expectedAnswer) {
			canGenerateNewEquation=false;
      const equationDiv = document.getElementById('equations');

      const newEquation = document.createElement('div');
      newEquation.style.padding = '5px';
      newEquation.textContent = equationText;

      // Create an input element to put the sum
      const userInput = document.createElement('input');
      userInput.type = 'text';
			userInput.style.fontSize='24px';
			userInput.style.width= '50%';

      // Create a  Checkbox
      const correctness = document.createElement('span');
      newEquation.appendChild(userInput);
      newEquation.appendChild(correctness);
      equationDiv.appendChild(newEquation);

      equations.push({
        equation: newEquation,
        userInput,
        correctness
      });

      // Add an event listener to check the answer when Enter is pressed
      userInput.addEventListener("keypress", function(event) {
        if (event.key === 'Enter') {
          const userAnswer = userInput.value.trim();
          if (userAnswer === expectedAnswer) {
            correctness.textContent = '✔';
            correctness.className = 'correct';
						canGenerateNewEquation=true;
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