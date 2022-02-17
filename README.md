# Meta JS

![](./coverage/lines.svg) ![](./coverage/statements.svg) ![](./coverage/branches.svg) ![](./coverage/functions.svg)

meta features for nodejs inspired on java and spring boot framework

## Features

- @annotations like java does

## How it works?

- Create a nodejs javascript class with annotations:

```
@Foo
function SomeClass(){

  @Baz
  this.someVariable;

  @Bar(path="/countries")
  this.someMethod = (req, res) => {
    res.json(this.companies);
  }
}

module.exports = SomeClass;
```
- Use meta to get the dependencies at:
  - class level
  - method level
  - variables

## Usage

```
var headAnnotations = ["Config","Route"];
var internalAnnotations = ["Autowire","Get","Post","Put","Delete", "Configuration"];
var dependencies = DependencyHelper.getDependecies(sourceCodeBaseLocation, [".js"], ["src/main/Index.js"],headAnnotations, internalAnnotations);
console.log(JSON.stringify(dependencies, null,4 ));
```

# Road map

- Improve the comments of annotations of src/main/org/metajs/hook/NodeInternalModulesHook.js
- Refactor to be exactly as Java Annotations framework

# Contributors

<table>
  <tbody>
    <td>
      <img src="https://avatars0.githubusercontent.com/u/3322836?s=460&v=4" width="100px;"/>
      <br />
      <label><a href="http://jrichardsz.github.io/">Richard Leon</a></label>
      <br />
    </td>    
  </tbody>
</table>

# Since
- 2018
