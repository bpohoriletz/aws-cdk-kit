/////////////////////////////////////////////////////////
//                                                         //
//  Buider classes are mid-level abstraction               //
//  They do the following:                                 //
//    Build Products                                       //
//      a) Instantiate Product                             //
//      b) Invoke Product methods to build custom products //
//  They dont have any attributes                          //
//  They may have conditional methods                      //
//  They may have single Base abstract class               //
//  They may use other builders for no-shared resources    //
//  They have method .getResult() that returns CdkProps    //
//  Their methods start with:                              //
//    a) set... if attribute is not Array                  //
//    b) add... if attribute is an Array                   //
//  Their methods may have optional parameters so that     //
//  director classes may safely call them if Director's    //
//  attribute has not been set, i.e. there is no neeed     //
//  to customize value                                     //
//  Their method may have no parameters in cases when      //
//  the builder has default value for such attribute       //
//  their methods always return this, except for           //
//  getResult() which returns CdkProps                     //
//                                                         //
/////////////////////////////////////////////////////////

/*
/* eslint-disable @typescript-eslint/no-unused-expressions /*
export default abstract class BaseBuilder implements IBaseBuilder {
  protected props: BaseProduct;

  constructor() {
    this.props = new BaseProduct();
  }

  setAttribute(parameter?: any): this {
    parameter && (this.props.parameter = parameter);

    return this;
  }

  addInnerParameter(innerParameter: any): this {
    this.props.innerParams.push(innerParameter);

    return this;
  }

  getResult(): any {
    return this.props;
  }
}
*/
