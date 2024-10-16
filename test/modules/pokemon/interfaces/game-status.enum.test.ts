import { GameStatus } from '@/modules/pokemon/interfaces';

describe('GameStatus enum', () => {
  test('should have a value of "playing"', () => {
    expect(GameStatus.PLAYING).toBe('playing');
  });

  test('should have a value of "lost"', () => {
    expect(GameStatus.LOST).toBe('lost');
  });

  test('should have a value of "won"', () => {
    expect(GameStatus.WON).toBe('won');
  });
});
