
export function DummyRouteProps(props={}) {
    return {
        match: {
            params: props.pathParams ? props.pathParams : {}
        }
    }
}