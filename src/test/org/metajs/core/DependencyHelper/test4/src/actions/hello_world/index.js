var LinksStartJsDomUtil = require('linkstartjs-nerve-utils').LinksStartJsDomUtil

@DefaultAction(name="helloWorldAction", entrypoint="true", route="hello"  )
function HelloWorldAction() {

  @ActionListener(htmlId="resetButton", typeFunction="onclick")
  this.clickOnSomeHtmlElement = (e) => {
    return x * y
  };

}

module.exports = ClickCounterAction;
