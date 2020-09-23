var LinksStartJsDomUtil = require('linkstartjs-nerve-utils').LinksStartJsDomUtil

@DefaultAction(name="helloWorldAction", entrypoint="true", route="hello"  )
function HelloWorldAction() {

  console.log("Hello world!");

}

module.exports = ClickCounterAction;
