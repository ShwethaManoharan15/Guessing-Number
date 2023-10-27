import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  playerName: string | null | undefined;
  computerNumber: string;
  attempts = 0;

  constructor() {
    this.playerName = '';
    this.computerNumber = '';
    this.attempts = 0;
  }

  generateRandom(): string {
    const digits = '0123456789';
    let number = '';
    while (number.length < 4) {
      const randomDigit = digits[Math.floor(Math.random() * digits.length)];
      if (!number.includes(randomDigit)) {
        number += randomDigit;
      }
    }

    return number;
  }

  startNewGame(): void {
    this.playerName = prompt('Enter the name:');
    if (!this.playerName) {
      alert('Please enter your name to start the game.');
      return;
    }

    this.computerNumber = this.generateRandom();
    this.attempts = 0;
    alert(
      `Hi ${this.playerName}! Let's start the game. Try to guess the 4-digit number.`
    );
    this.playGame();
  }

  playGame(): void {
    let guess: string | null;
    do {
      guess = prompt('Enter the number:');
      if (guess === null) {
        alert('Guessing canceled. Please enter a guess to continue.');
      }
    } while (guess === null || !this.validateInput(guess));

    this.attempts++;
    const output = this.checkGuess(guess);
    alert(`Output: ${output}`);

    if (output === '++++') {
      alert(
        `Congratulations ${this.playerName}! You guessed the number in ${this.attempts} attempts.`
      );
    } else {
      this.playGame();
    }
  }

  validateInput(guess: string): boolean {
    return /^\d{4}$/.test(guess) && new Set(guess).size === 4;
  }

  checkGuess(guess: string): string {
    let output = '';
    for (let i = 0; i < 4; i++) {
      if (guess[i] === this.computerNumber[i]) {
        output += '+';
      } else if (this.computerNumber.includes(guess[i])) {
        output += '-';
      } else {
        output += '*';
      }
    }
    return output;
  }
}

