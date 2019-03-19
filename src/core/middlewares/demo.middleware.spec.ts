import { DemoMiddleware } from './demo.middleware';

describe('DemoMiddleware', () => {
  it('should be defined', () => {
    expect(new DemoMiddleware()).toBeDefined();
  });
});
