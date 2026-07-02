import { expect, assert } from 'chai';
import AnnotationHelper  from '../../../../../main/org/metajs/core/AnnotationHelper.js';

describe('AnnotationHelper: getModuleFunctionNameFromRawLine', function() {
  it('get simple function name', function() {
    var variableName = AnnotationHelper.getModuleFunctionNameFromRawLine("this.displayQuote = () => {");
    expect(variableName).to.equal("displayQuote");
  });
  it('get simple function name with spaces', function() {
    var variableName = AnnotationHelper.getModuleFunctionNameFromRawLine("this.sayHello   = () => {");
    expect(variableName).to.equal("sayHello");
  });
  it('get simple async function', function() {
    var variableName = AnnotationHelper.getModuleFunctionNameFromRawLine("this.sayHello = async () => {");
    expect(variableName).to.equal("sayHello");
  });

});
