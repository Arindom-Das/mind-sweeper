document.addEventListener('DOMContentLoaded', function() {
  const gridItems = document.querySelectorAll('.grid-item');
  const gridItemsArray = Array.from(gridItems);
  const randomItem = gridItemsArray[Math.floor(Math.random() * gridItemsArray.length)];
  const randomItemIndex = gridItemsArray.indexOf(randomItem);

  let randomImageFound = false;
  let nonRowColItemsClicked = 0;
  const flippedImage = 'Untitled_design__1_-removebg-preview__1_-removebg-preview.png';
  const randomImage = 'image (2).png'; // Replace with the desired image URL for i3

  function getRowAndColumn(index) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return { row, col };
  }

  function flipGridItems(clickedIndex) {
    const clickedItem = gridItems[clickedIndex];
    const randomItem = gridItems[randomItemIndex];

    const clickedImg = clickedItem.querySelector('img');
    const randomImg = randomItem.querySelector('img');

    clickedImg.src = flippedImage;
    randomImg.src = randomImage;

    clickedItem.classList.add('flipped');
    randomItem.classList.add('flipped', 'random');

    randomImageFound = true;
    setTimeout(showGameOver, 1700);
  }

  gridItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      if (!this.classList.contains('flipped') && !randomImageFound) {
        if (index === randomItemIndex) {
          const img = this.querySelector('img');
          img.src = randomImage;
          this.classList.add('flipped', 'random');
          randomImageFound = true;
          setTimeout(showGameOver, 1700);
        } else {
          const { row, col } = getRowAndColumn(index);
          const randomItemRow = getRowAndColumn(randomItemIndex).row;
          const randomItemCol = getRowAndColumn(randomItemIndex).col;
          if (row === randomItemRow || col === randomItemCol) {
            flipGridItems(index);
          } else {
            const img = this.querySelector('img');
            img.src = flippedImage;
            this.classList.add('flipped');
            nonRowColItemsClicked++;

            if (nonRowColItemsClicked === 4) {
              initConfetti();
              showWinnerMessage();
            }
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
    video.src = 'Untitled design.mp4';
    video.autoplay = true;
    video.loop = false;
    video.muted = true;
    gameOverContainer.appendChild(video);
    document.body.appendChild(gameOverContainer);

    const gameOverContent = document.createElement('div');
    gameOverContent.classList.add('game-over-content');
    const gameOverImage = document.createElement('img');
    gameOverImage.src = 'fontbolt-removebg-preview.png';
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

  function showWinnerMessage() {
    const winnerContainer = document.createElement('div');
    winnerContainer.classList.add('winner-container');

    const winnerImage = document.createElement('img');
    winnerImage.src = 'the forext.png'; // Replace with the path to your winner image
    winnerImage.alt = 'Winner';
    winnerImage.classList.add('winner-image');

    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.classList.add('play-again-btn');
    playAgainButton.addEventListener('click', restartGame);

    winnerContainer.appendChild(winnerImage);
    winnerContainer.appendChild(playAgainButton);
    document.body.appendChild(winnerContainer);
  }

  function initConfetti(confettiCount = 100, colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#8b00ff']) {
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container');
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = Math.random() * 100 - 50 + 'vh'; // Start above the viewport
      confetti.style.width = getRandomSize() + 'px';
      confetti.style.height = getRandomSize() + 'px';
      confetti.style.backgroundColor = getRandomColor(colors);
      confetti.style.animationDuration = (Math.random() * 2 + 3) + 's'; // 3s to 5s duration
      confetti.style.animationDelay = Math.random() * 2 + 's';
      confettiContainer.appendChild(confetti);
    }
  }

  function getRandomSize() {
    return Math.random() * 10 + 5; // 5px to 15px
  }

  function getRandomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function restartGame() {
    window.location.reload();
  }
});
