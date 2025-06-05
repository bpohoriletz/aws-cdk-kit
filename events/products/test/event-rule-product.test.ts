import { EventRuleProduct } from '../event-rule-product';

describe('new EventRuleProduct()', () => {
  it('has correct defaults', () => {
    expect(new EventRuleProduct()).toMatchSnapshot();
  });
});
