export function DummyCard(props={}) {
    return {
        name: props.name ? props.name : "",
        image: props.image ? props.image : "",
    }
}