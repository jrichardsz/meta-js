var LinksStartJsDomUtil = require('linkstartjs-nerve-utils').LinksStartJsDomUtil

[DefaultAction(name="helloWorldAction", entrypoint="true", route="hello"  )]
export class HelloWorldAction {

  [Autowire(location="pages/helloWorld")]
  helloWorldPage;

  [Autowire(name="acmeApiClient")]
  acmeApiClient;

}
