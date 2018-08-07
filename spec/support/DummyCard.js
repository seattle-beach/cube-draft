export function DummyCard(props={}) {
    return {
        id: props.id ? props.id : 0,
        name: props.name ? props.name : "",
        image: props.image ? props.image : "",
    }
}