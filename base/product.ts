  /////////////////////////////////////////////////////////////
//                                                             //
//  Buider classes are low-level abstraction                   //
//  They do the following:                                     //
//    Override default CdkProps classes                        //
//      a) Add writers for props                               //
//      b) Add methods for changing Array props                //
//  They dont have any attributes                              //
//  Their methods start with:                                  //
//    a) add... if attribute is an Array                       //
//  They define it's interface in the same file                //
//  They define Builder interface in the same file             //
//  They define BullderConstructor interface in the same file  //
//                                                             //
//  CAUTION: It is sometimes not safe to provide setters for   //
//  some attributes, check documentation for each property!    //
//                                                             //
  /////////////////////////////////////////////////////////////
/*
export class BaseProduct implements IBaseProduct {
  parameter?: boolean;
  innerParams: any[];
}

interface IBaseProduct { // extends SomeProps
  parameter?: boolean;
}

export interface IBaseBuilder {
  props: any;
  setAttribute?(): IBaseBuilder;
  addInnerParameter?(innerParameter?: any): IBaseBuilder;
  getResult(): any; // extended SomeProps
}

export interface IBaseBuilderConstructor {
  new (): IBaseBuilder;
}
*/
