import S3PolicyStatementBuilder from './s3';

describe('new S3PolicyStatementBuilder', () => {
  let instance: S3PolicyStatementBuilder;

  beforeEach(() => {
    instance = new S3PolicyStatementBuilder();
  });

  test('has correct defaults set', () => {
    expect(instance).toMatchSnapshot();
  });

  test('.setRead grants read, read version access', () => {
    instance.setRead();

    expect(instance).toMatchSnapshot();
  });

  test('.setWrite grants write access', () => {
    instance.setWrite();

    expect(instance).toMatchSnapshot();
  });

  test('.addResource adds resource', () => {
    instance.addResource('*');

    expect(instance).toMatchSnapshot();
  });
});
