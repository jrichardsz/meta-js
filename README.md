# Meta JS

![](./coverage/lines.svg) ![](./coverage/statements.svg) ![](./coverage/branches.svg) ![](./coverage/functions.svg)

A lightweight framework that brings annotation-based programming to JavaScript (frontend and backend), similar to the capabilities found in Java and C#.

## Features

* Define your own class-level, property, and method annotations.
* Scan nested directories for annotated files.
* Automatically generate dependency and metadata information.

## How it works?

### 1. Define your ES6 class with annotations

Create a JavaScript ES6 class and decorate your class, properties, or methods with your desired annotations.

* **Codebase:** `/home/acme-system`
* **File:** `/src/controllers/UserController.js`

```js
[Controller(id="userController", entrypoint="true" )]
export class UserController {

  [Autowire(id = "userRepository")]
  userRepository;

  [Protected(permission="self:update")]
  [Put(path = "/user")]
  async updateUser (req, res) {
    await this.userRepository.updateUser({...});
    return res.json({code: 200, message: "success"})
  }


  [WebAssembly(file = "home_form.wasm")]
  async loadHomeForm (obj) {
    obj.instance.exports.run();
  }  

}

```

### 2. Configure and extract dependencies

Use the `DependencyHelper` to scan your project and extract metadata based on your defined annotations.

```js
var classLevelAnnotations = ["Controller"];
var internalAnnotations = ["Autowire", "Put", "WebAssembly", "Protected"];

dependencies = DependencyHelper.getDependecies(
  "/home/acme-system", 
  [".js"], 
  ["src/main/Index.js", ".test.js"], 
  classLevelAnnotations, internalAnnotations);

```

### 3. Access dependency metadata

The resulting `dependencies` object contains a detailed map of your application's structure and metadata, which you can use for dependency injection, routing, or automated documentation.

```json
[
    {
        "variables": {
            "userRepository": [
                {
                    "name": "Autowire",
                    "arguments": {
                        "id": "userRepository"
                    }
                }
            ]
        },
        "functions": {
            "updateUser": [
                {
                    "name": "Put",
                    "arguments": {
                        "path": "/user"
                    }
                },
                {
                    "name": "Protected",
                    "arguments": {
                        "permission": "self:update"
                    }
                }
            ],
            "loadHomeForm": [
                {
                    "name": "WebAssembly",
                    "arguments": {}
                }
            ]
        },
        "meta": {
            "name": "Controller",
            "arguments": {
                "id": "userController",
                "entrypoint": "true",
                "name": "userController"
            },
            "location": "/controllers/UserController.js",
            "className": "UserController"
        }
    }
]

```

## Road map

* Improve the documentation/comments within `src/main/org/metajs/hook/NodeInternalModulesHook.js`.
* Refactor the codebase to align more closely with standard Java Annotation framework patterns.

## Contributors

<table>
  <tbody>
    <td>
      <img src="https://avatars0.githubusercontent.com/u/3322836?s=460&v=4" width="100px;"/>
      <br />
      <label><a href="http://jrichardsz.github.io/">JRichardsz</a></label>
      <br />
    </td>    
  </tbody>
</table>
