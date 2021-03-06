(() => {
	// set up the puzzle pieces and boards
	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
				puzzlePieces = document.querySelectorAll('.puzzle-pieces img'),
				dropZones = document.querySelectorAll('.drop-zone'),
				gameBoard = document.querySelector('.puzzle-board');

	const pieceNames = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	function changeImageSet() {
		// change all the image elements on the page -> draggable image sources
		// change the image elements on the left to match the selected puzzle
		pieceNames.forEach((piece, index) => {
			puzzlePieces[index].src = `images/${piece + this.dataset.puzzleref}.jpg`;
			puzzlePieces[index].id = `${piece + this.dataset.puzzleref}`;
		});


		// and set the drop zone background image based on the puzzle the user selects
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.puzzleref}.jpg)`;
		// debugger;
	}
  function allowDrag(event) {
			console.log('started dragging an image')

			event.dataTransfer.setData("text/plain", this.id);


  }


	function allowDragOver(event) {
		event.preventDefault();
		console.log('dragged over a drop zones');

	}



	function allowDrop(event) {
		// event.preventDefault();
		console.log('dropped on a drop zone');

		let firstDrop = event.target;
		  while (firstDrop !== 0 && !firstDrop.classList.contains("drop-zone")) {
				firstDrop = firstDrop.parentNode;
			}

		if (firstDrop && firstDrop.childNodes.length > 0) {
			return false;
			event.preventDefault();
		}


		//function resetPuzzlePiecies() {

		
		// go and get the dragged element's ID frm the data transfer object
		let currentImage = event.dataTransfer.getData("text/plain");

		// add that image to whatever drop zone  we're dropping our image on
		event.target.appendChild(document.querySelector(`#${currentImage}`));
  }

	//add event handling here -> how is the user going to use our app?
	// what triggers do we need?
	// click on the bottom buttons to change the puzzle image we're working with
	puzzleButtons.forEach(button => button.addEventListener('click', changeImageSet));

	puzzlePieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

	dropZones.forEach(zone => {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	});

	// call the function and pass in the first nav button as a reference
	// research call, apply and bind -> look at MDN
	changeImageSet.call(puzzleButtons[0]);
})();
