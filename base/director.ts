  /////////////////////////////////////////////////////
//                                                     //
//  Director classes are the top level abstraction.    //
//  They do the following:                             //
//    Manage Builders i.e.                             //
//      a) Instantiate Builder classes                 //
//      b) Invoke Builder methods to construct         //
//  They may have attributes in order to               //
//      a) Have same behavior across cases             //
//      b) Have small parameter nuber in methods       //
//  They may have multiple methods                     //
//      a) If construction is different per construct  //
//                                                     //
  /////////////////////////////////////////////////////

/*
export default class BaseDirector {
  prop: any;
  private builder: BaseBuilder;

  constructor(builder: IBaseBuilderConstructor) {
    this.builder = new builder();
  }

  constructCustomCdkStruct(scope: Construct, id: string, name?: string) {
    this.builder
      .setAttribute(name)
      .addInnerParameter(innerParameter);

    return new CdkStruct(scope, id, this.builder.getResult());
  }
}
*/
