var LinksStartJsDomUtil = require('linkstartjs-nerve-utils').LinksStartJsDomUtil

@DefaultAction(name="helloWorldAction", entrypoint="true", route="hello"  )
function HelloWorldAction() {

  @Autowire(location="pages/helloWorld")
  this.helloWorldPage;

  @Autowire(name="acmeApiClient")
  this.acmeApiClient;

}

module.exports = ClickCounterAction;
