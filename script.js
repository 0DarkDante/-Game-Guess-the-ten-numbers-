'use strict';

    const randomNumbersArray = getRandomUniqueNumbers(10, 1, 100);
    let foundMatches = 0;
    let isGameOver = false;

    let ths = document.querySelectorAll('th');
    for (let th of ths) {
      th.addEventListener('click', handleCellClick);
    }

    function handleCellClick(event) {
      if (!isGameOver) {
        const numberInCell = parseInt(event.target.textContent);
        const foundMatch = randomNumbersArray.includes(numberInCell);

        if (foundMatch) {
          foundMatches++;
          event.target.style.backgroundColor = 'green';
        } else {
          event.target.style.backgroundColor = 'red';
        }

        if (foundMatches === 10) {
          isGameOver = true;
          alert('Вітаю! Ти переміг!');
          const timerElement = document.getElementById('timer');
          timerElement.textContent = 'Перемога!';
          clearInterval(intervalId); // Останавливаем таймер
          ths.forEach(th => th.removeEventListener('click', handleCellClick));
        }
      }
    }

    console.log(randomNumbersArray);

    function getRandomUniqueNumbers(count, min, max) {
      const allNumbers = Array.from({ length: max - min + 1 }, (_, index) => index + min);
      const shuffledNumbers = shuffleArray(allNumbers);
      return shuffledNumbers.slice(0, count);
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function formatTime(time) {
      const hours = String(Math.floor(time / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
      const seconds = String(time % 60).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }

    let intervalId; // Объявляем переменную для хранения идентификатора интервала

    function countdownTimer(timeInSeconds) {
      const timerElement = document.getElementById('timer');
      let remainingTime = timeInSeconds;

      timerElement.textContent = formatTime(remainingTime);

      intervalId = setInterval(() => {
        remainingTime--;

        if (remainingTime <= 0) {
          clearInterval(intervalId);
          isGameOver = true;
          timerElement.textContent = 'Час вичерпано!';
          ths.forEach(th => th.removeEventListener('click', handleCellClick));
        } else {
          timerElement.textContent = formatTime(remainingTime);
        }
      }, 1000);
    }

    countdownTimer(35);