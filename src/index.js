import  { MVU } from "./mvu.js"

const { html, dom, udom, render, svg } = MVU;

const target = document.getElementById("app");

function Circle (color = "red") {
    return (
        svg`<svg width=60 height=60 fill=${color}>
            ${svg`<circle cx=30 cy=30 r=30></circle>`}
        </svg>`
    )
}

function App (color) {
    let app = dom ();
        html`<input value=3 />`
        Circle(color)
        

    udom ();
    return app
}

function update (color="blue") {
    render(target, App(color))
}

update ()

setInterval(() => { update("yellow")}, 1000)

