var LinksStartJsDomUtil = require('linkstartjs-nerve-utils').LinksStartJsDomUtil

[DefaultAction(name="helloWorldAction", entrypoint="true", route="hello"  )]
export class HelloWorldAction {

  [ActionListener(htmlId="resetButton", typeFunction="onclick")]
  clickOnSomeHtmlElement (e) {
    return x * y
  }

}
