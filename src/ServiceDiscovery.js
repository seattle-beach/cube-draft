
export class ServiceDiscovery {
    untapURI() {
        if (window.location.hostname === "cube-draft.cfapps.io") {
            return "https://cube-untap.cfapps.io"
        }
        
        return "http://localhost:8080"
    }
}