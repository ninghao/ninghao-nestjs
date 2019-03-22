import { DemoAuthGuard } from './demo-auth.guard';

describe('DemoAuthGuard', () => {
  it('should be defined', () => {
    expect(new DemoAuthGuard()).toBeDefined();
  });
});
