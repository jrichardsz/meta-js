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
