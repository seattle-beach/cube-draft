
export class ServiceDiscovery {
    untapURI() {
        if (window.location.href.indexOf("cfapps.io") > -1) {
            return window.location.href.replace("cube-draft", "cube-untap")
        }
        
        return "http://cube-untap.localhost.dev"
    }
}