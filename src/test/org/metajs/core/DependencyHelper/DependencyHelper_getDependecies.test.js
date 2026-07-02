import { expect, assert } from 'chai';
import path from "path";
import DependencyHelper from '../../../../../main/org/metajs/core/DependencyHelper.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);

describe('DependencyHelper: getDependecies', function() {
  it('empty class', function() {

    var headAnnotations = ["DefaultAction"];
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"];

    var src = path.resolve(__filename,'..')+'/test1/src';

    var dependencies = DependencyHelper.getDependecies(src, [".js", ".html"], ["src/index.js", "src/index.html"],
    headAnnotations, internalAnnotations);

    assert(dependencies);
    expect(dependencies.length).to.equal(1);
    expect(dependencies[0].meta.name).to.equal("DefaultAction");
    expect(dependencies[0].meta.arguments.name).to.equal("helloWorldAction");
    expect(dependencies[0].meta.arguments.entrypoint).to.equal("true");
    expect(dependencies[0].meta.arguments.route).to.equal("hello");
  });

  it('class with two variables', function() {

    var headAnnotations = ["DefaultAction"];
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"];

    var src = path.resolve(__filename,'..')+'/test2/src';

    var dependencies = DependencyHelper.getDependecies(src, [".js", ".html"], ["src/index.js", "src/index.html"],
    headAnnotations, internalAnnotations);
    console.log(JSON.stringify(dependencies, null, 4))
    assert(dependencies);
    expect(dependencies.length).to.equal(1);
    expect(dependencies[0].meta.name).to.equal("DefaultAction");
    expect(dependencies[0].meta.arguments.name).to.equal("helloWorldAction");
    expect(dependencies[0].meta.arguments.entrypoint).to.equal("true");
    expect(dependencies[0].meta.arguments.route).to.equal("hello");

    assert(dependencies[0].variables.helloWorldPage)
    expect(dependencies[0].variables.helloWorldPage.length).to.equal(1);
    expect(dependencies[0].variables.helloWorldPage[0].name).to.equal("Autowire");
    expect(dependencies[0].variables.helloWorldPage[0].arguments.location).to.equal("pages/helloWorld");
    expect(dependencies[0].variables.acmeApiClient[0].name).to.equal("Autowire");
    expect(dependencies[0].variables.acmeApiClient[0].arguments.name).to.equal("acmeApiClient");

  });

  it('class with one variable and two annotations', function() {

    var headAnnotations = ["DefaultAction"];
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"];

    var src = path.resolve(__filename,'..')+'/test3/src';

    var dependencies = DependencyHelper.getDependecies(src, [".js", ".html"], ["src/index.js", "src/index.html"],
    headAnnotations, internalAnnotations);

    assert(dependencies);
    expect(dependencies.length).to.equal(1);
    expect(dependencies[0].meta.name).to.equal("DefaultAction");
    expect(dependencies[0].meta.arguments.name).to.equal("helloWorldAction");
    expect(dependencies[0].meta.arguments.entrypoint).to.equal("true");
    expect(dependencies[0].meta.arguments.route).to.equal("hello");

    assert(dependencies[0].variables.helloWorldPage)
    expect(dependencies[0].variables.helloWorldPage.length).to.equal(2);

    expect(dependencies[0].variables.helloWorldPage[0].name).to.equal("Autowire");
    expect(dependencies[0].variables.helloWorldPage[0].arguments.location).to.equal("pages/helloWorld");
    expect(dependencies[0].variables.helloWorldPage[1].name).to.equal("Render");
    expect(dependencies[0].variables.helloWorldPage[1].arguments.required).to.equal("true");
  });


  it('class with one function', function() {

    var headAnnotations = ["DefaultAction"];
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"];

    var src = path.resolve(__filename,'..')+'/test4/src';

    var dependencies = DependencyHelper.getDependecies(src, [".js", ".html"], ["src/index.js", "src/index.html"],
    headAnnotations, internalAnnotations);

    console.log(JSON.stringify(dependencies, null, 4));

    assert(dependencies);
    expect(dependencies.length).to.equal(1);
    expect(dependencies[0].meta.name).to.equal("DefaultAction");
    expect(dependencies[0].meta.arguments.name).to.equal("helloWorldAction");
    expect(dependencies[0].meta.arguments.entrypoint).to.equal("true");
    expect(dependencies[0].meta.arguments.route).to.equal("hello");

    assert(dependencies[0].functions.clickOnSomeHtmlElement)
    expect(dependencies[0].functions.clickOnSomeHtmlElement.length).to.equal(1);
    expect(dependencies[0].functions.clickOnSomeHtmlElement[0].name).to.equal("ActionListener");
    expect(dependencies[0].functions.clickOnSomeHtmlElement[0].arguments.htmlId).to.equal("resetButton");
    expect(dependencies[0].functions.clickOnSomeHtmlElement[0].arguments.typeFunction).to.equal("onclick");

  });

  it('module with one function who has two annotations', function() {

    var classLevelAnnotations = ["Controller"];
    var internalAnnotations = ["Autowire", "Put", "WebAssembly", "Protected"];

    var src = path.resolve(__filename,'..')+'/test5/src';

    var dependencies = DependencyHelper.getDependecies(src, [".js", ".html"], ["src/index.js", "src/index.html"],
    classLevelAnnotations, internalAnnotations);
    console.log(JSON.stringify(dependencies, null, 4));

    assert(dependencies);
    expect(dependencies.length).to.equal(1);
    expect(dependencies[0].meta.name).to.equal("Controller");
    expect(dependencies[0].meta.arguments.name).to.equal("userController");
    expect(dependencies[0].meta.arguments.entrypoint).to.equal("true");
    expect(dependencies[0].meta.location).to.equal("/controllers/UserController.js");
    expect(dependencies[0].meta.className).to.equal("UserController");
    
    assert(dependencies[0].functions.updateUser)
    expect(dependencies[0].functions.updateUser.length).to.equal(2);
    expect(dependencies[0].functions.updateUser[0].name).to.equal("Put");
    expect(dependencies[0].functions.updateUser[0].arguments.path).to.equal("/user");
    expect(dependencies[0].functions.updateUser[1].name).to.equal("Protected");
    expect(dependencies[0].functions.updateUser[1].arguments.permission).to.equal("self:update");

    assert(dependencies[0].variables);
    expect(dependencies[0].variables.userRepository.length).to.equal(1);
    expect(dependencies[0].variables.userRepository[0].name).to.equal("Autowire");
    expect(dependencies[0].variables.userRepository[0].arguments.id).to.equal("userRepository");

  });
});
