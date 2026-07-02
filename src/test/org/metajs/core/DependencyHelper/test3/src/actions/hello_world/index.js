var LinksStartJsDomUtil = require('linkstartjs-nerve-utils').LinksStartJsDomUtil

[DefaultAction(name="helloWorldAction", entrypoint="true", route="hello"  )]
export class HelloWorldAction {

  [Render(required="true")]
  [Autowire(location="pages/helloWorld")]
  helloWorldPage;

}
