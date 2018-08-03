
export class ServiceDiscovery {
    untapURI() {
        if (window.location.origin.indexOf("cfapps.io") > -1) {
            return window.location.origin.replace("cube-draft", "cube-untap")
        }
        
        return "http://cube-untap.localhost.dev"
    }
}