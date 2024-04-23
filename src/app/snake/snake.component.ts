import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {

  grid: number[][] = []; // La griglia di gioco
  snake: { x: number; y: number }[] = []; // Il serpente
  fruit: { x: number; y: number }= { x: 0, y: 0 }; // La frutta
  direction: string = 'right'; // La direzione del serpente
  intervalId: any; // ID dell'intervallo per il movimento del serpente

  constructor() { }

  ngOnInit(): void {
    this.initializeGame();
    this.startGame();
  }

  initializeGame(): void {
    // Inizializza la griglia di gioco
    for (let i = 0; i < 20; i++) {
      this.grid[i] = [];
      for (let j = 0; j < 20; j++) {
        this.grid[i][j] = 0;
      }
    }
    // Inizializza il serpente
    this.snake = [{ x: 10, y: 10 }];
    // Posiziona la frutta in modo casuale
    this.generateNewFruit();
    // Aggiorna la griglia di gioco
    this.updateGrid();
  }

  startGame(): void {
    // Avvia il gioco con un intervallo di 200 ms
    this.intervalId = setInterval(() => {
      this.moveSnake();
    }, 200);
  }

  moveSnake(): void {
    // Muove il serpente nella direzione corrente
    const head = this.snake[0];
    let newHead: { x: number; y: number };
    switch (this.direction) {
      case 'up':
        newHead = { x: head.x - 1, y: head.y };
        break;
      case 'down':
        newHead = { x: head.x + 1, y: head.y };
        break;
      case 'left':
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case 'right':
        newHead = { x: head.x, y: head.y + 1 };
        break;
      default:
        newHead = { x: head.x, y: head.y };
        break;
    }
    // Aggiunge la nuova testa al serpente
    this.snake.unshift(newHead);
    // Controlla se il serpente ha mangiato la frutta o ha colpito un muro
    if (this.isFruitCollision(newHead)) {
      this.generateNewFruit(); // Genera una nuova frutta
    } else {
      this.snake.pop(); // Rimuove la coda del serpente
    }
    // Aggiorna la griglia di gioco
    this.updateGrid();
  }

  isFruitCollision(newHead: { x: number; y: number }): boolean {
    // Controlla se la nuova testa del serpente ha colpito la frutta
    return newHead.x === this.fruit.x && newHead.y === this.fruit.y;
  }

  generateNewFruit(): void {
    // Genera una nuova posizione casuale per la frutta
    let newFruit: { x: number; y: number };
    do {
      newFruit = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    } while (this.snake.some(segment => segment.x === newFruit.x && segment.y === newFruit.y));
    this.fruit = newFruit;
  }

  updateGrid(): void {
    // Aggiorna la griglia di gioco con la posizione del serpente e della frutta
    this.initializeGrid();
    this.snake.forEach(segment => {
      this.grid[segment.x][segment.y] = 1; // Segmento del serpente
    });
    this.grid[this.fruit.x][this.fruit.y] = 2; // Frutta
  }

  initializeGrid(): void {
    // Inizializza la griglia di gioco a 0
    for (let i = 0; i < 20; i++) {
      this.grid[i] = [];
      for (let j = 0; j < 20; j++) {
        this.grid[i][j] = 0;
      }
    }
  }

  // Metodo per cambiare la direzione del serpente
  changeDirection(newDirection: string): void {
    if ((newDirection === 'up' && this.direction !== 'down') ||
        (newDirection === 'down' && this.direction !== 'up') ||
        (newDirection === 'left' && this.direction !== 'right') ||
        (newDirection === 'right' && this.direction !== 'left')) {
      this.direction = newDirection;
    }
  }

  // Metodo per controllare se una cella è occupata dal serpente
  isSnake(i: number, j: number): boolean {
    return this.grid[i][j] === 1;
  }

  // Metodo per controllare se una cella contiene la frutta
  isFruit(i: number, j: number): boolean {
    return this.grid[i][j] === 2;
  }

}
