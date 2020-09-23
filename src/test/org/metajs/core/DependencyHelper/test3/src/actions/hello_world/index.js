var LinksStartJsDomUtil = require('linkstartjs-nerve-utils').LinksStartJsDomUtil

@DefaultAction(name="helloWorldAction", entrypoint="true", route="hello"  )
function HelloWorldAction() {

  @Render(required="true")
  @Autowire(location="pages/helloWorld")
  this.helloWorldPage;

}

module.exports = ClickCounterAction;
