
export class ServiceDiscovery {
    untapURI() {
        if (window.location.href.indexOf("cfapps.io")) {
            return window.location.href.replace("cube-draft", "cube-untap")
        }
        
        return "http://localhost:3001"
    }
}