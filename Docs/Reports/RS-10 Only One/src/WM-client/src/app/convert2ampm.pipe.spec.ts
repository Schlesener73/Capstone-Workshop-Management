import { PhonePipe } from './phone.pipe';
import { String2ampmPipe } from './convert2ampm.pipe';

describe('String2ampmPipe', () => {
  it('create an instance', () => {
    const pipe = new String2ampmPipe();
    expect(pipe).toBeTruthy();
  });
});
