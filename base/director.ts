/////////////////////////////////////////////////////
//                                                       //
//  Director classes are the top level abstraction.      //
//  They do the following:                               //
//    Manage Builders i.e.                               //
//      a) Instantiate Builder classes                   //
//      b) Invoke Builder methods to construct           //
//  They may have attributes in order to                 //
//      a) Have same behavior across cases               //
//      b) Have small parameter nuber in methods         //
//  They may have multiple methods                       //
//      a) If construction is different per construct    //
//  Their methods accept three arguments                 //
//      a) scope: Construct (Stach or NestedStack)       //
//      b) id: string ID of the construct                //
//      c) name?: string optional name of the construct  //
//    all other parameters should be set as properties   //
//                                                       //
/////////////////////////////////////////////////////

/*
export default class BaseDirector {
  prop: any;
  private builder: IBaseBuilder;

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
