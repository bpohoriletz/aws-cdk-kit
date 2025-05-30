import PolicyStatementDirector from '../../directors/policy-statement';
import S3PolicyStatementBuilder from '../../../iam/policy-statement-builders/s3';
import LogsPolicyStatementBuilder from '../../../iam/policy-statement-builders/logs';
import ElasticBPolicyStatementBuilder from '../../../iam/policy-statement-builders/elasticb';
import CodedeployPolicyStatementBuilder from '../../../iam/policy-statement-builders/codedeploy';

describe('new PolicyStatementDirector().constructPolicyStatement()', () => {
  let instance: PolicyStatementDirector;

  test('with S3PolicyStatementBuilder creates S3 read/write policy', () => {
    instance = new PolicyStatementDirector(S3PolicyStatementBuilder);

    expect(instance.constructPolicyStatement(['*'])).toMatchSnapshot();
  });

  test('with LogsPolicyStatementBuilder creates logs policy for EB instances', () => {
    instance = new PolicyStatementDirector(LogsPolicyStatementBuilder);

    expect(instance.constructPolicyStatement(['*'])).toMatchSnapshot();
  });

  test('with ElasticBPolicyStatementBuilder creates statistics policy for EB instances', () => {
    instance = new PolicyStatementDirector(ElasticBPolicyStatementBuilder);

    expect(instance.constructPolicyStatement(['*'])).toMatchSnapshot();
  });

  test('with CodedeployPolicyStatementBuilder creates CodeDeploy full access policy', () => {
    instance = new PolicyStatementDirector(CodedeployPolicyStatementBuilder);

    expect(instance.constructPolicyStatement(['*'])).toMatchSnapshot();
  });
});
