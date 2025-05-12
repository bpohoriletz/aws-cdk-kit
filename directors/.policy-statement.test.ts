import PolicyStatementDirector from './policy-statement';
import PolicyStatementBuilder from '../iam/policy-statement-builder';
import S3PolicyStatementBuilder from '../iam/policy-statement-builders/s3';

describe('new PolicyStatementDirector()', () => {
  let instance: PolicyStatementDirector;

  test('creates empty policy', () => {
    instance = new PolicyStatementDirector(PolicyStatementBuilder);

    expect(instance.constructPolicyStatement()).toMatchSnapshot();
  });

  test('creates S3 read/write policy', () => {
    instance = new PolicyStatementDirector(S3PolicyStatementBuilder);

    expect(instance.constructPolicyStatement(['*'])).toMatchSnapshot();
  });
});
