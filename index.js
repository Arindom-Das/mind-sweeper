document.addEventListener('DOMContentLoaded', function() {
  const gridItems = document.querySelectorAll('.grid-item');
  const gridItemsArray = Array.from(gridItems);
  const randomItem = gridItemsArray[Math.floor(Math.random() * gridItemsArray.length)];
  const randomItemIndex = gridItemsArray.indexOf(randomItem); // Generate a random index
  let randomImageFound = false; // Flag to track if the random image is found
  const flippedImage = 'Untitled_design__1_-removebg-preview__1_-removebg-preview.png';
  const randomImage = 'image (2).png'; // Replace with the desired image URL for i3

  function getRowAndColumn(index) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return { row, col };
  }

  function flipGridItems(rowIndex, colIndex) {
    gridItems.forEach((item, index) => {
      const { row, col } = getRowAndColumn(index);
      const isRowMatch = row === rowIndex;
      const isColMatch = col === colIndex;

      if (isRowMatch || isColMatch) {
        const img = item.querySelector('img');
        if (index === randomItemIndex) {
          img.src = randomImage;
          item.classList.add('flipped', 'random');
        } else {
          img.src = flippedImage;
          item.classList.add('flipped');
        }
      }
    });
    randomImageFound = true;
    setTimeout(showGameOver, 1700); // Delay the "Game Over" text by 2 seconds
  }

  gridItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      if (!this.classList.contains('flipped') && !randomImageFound) {
        if (index === randomItemIndex) {
          const img = this.querySelector('img');
          img.src = randomImage;
          this.classList.add('flipped', 'random');
          randomImageFound = true;
          setTimeout(showGameOver, 1700); // Delay the "Game Over" text by 2 seconds
        } else {
          const { row, col } = getRowAndColumn(index);
          const randomItemRow = getRowAndColumn(randomItemIndex).row;
          const randomItemCol = getRowAndColumn(randomItemIndex).col;

          if (row === randomItemRow || col === randomItemCol) {
            flipGridItems(randomItemRow, randomItemCol);
          } else {
            const img = this.querySelector('img');
            img.src = flippedImage;
            this.classList.add('flipped');
          }
        }
      }
    });
  });





  function showGameOver() {
    const gameOverContainer = document.createElement('div');
    gameOverContainer.classList.add('game-over-container');


    const video = document.createElement('video');
    video.classList.add('game-over-video');
    video.src = 'Untitled design.mp4'; // Replace with the actual path to your video file
    video.autoplay = true;
    video.loop = true;
    video.muted = true;

    gameOverContainer.appendChild(video);
    document.body.appendChild(gameOverContainer);
  
    const gameOverContent = document.createElement('div');
    gameOverContent.classList.add('game-over-content');
  
    const gameOverImage = document.createElement('img');
    gameOverImage.src = 'fontbolt-removebg-preview.png'; // Replace with the actual path to your image
    gameOverImage.alt = 'Game Over';
    gameOverImage.classList.add('game-over-image');
  
    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.classList.add('play-again-btn');
    playAgainButton.addEventListener('click', restartGame);
  
    gameOverContent.appendChild(playAgainButton);
    gameOverContent.appendChild(gameOverImage);
    document.body.appendChild(gameOverContent);
  }

  function restartGame() {
    window.location.reload();
  }
});