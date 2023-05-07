import  { MVU } from "./mvu.js"

const { html, dom, udom, render, svg } = MVU;

const target = document.getElementById("app");

let state = {
    init : true,
    red : 255,
    green: 128,
    blue: 125
}

function Circle (state) {
    const strcolor = (state) => `rgb(${state.red},${state.green},${state.blue})`; 
    let node =  (
        svg`<svg width=60 height=60 fill=${strcolor(state)}>
            ${svg`<circle cx=30 cy=30 r=30></circle>`}
        </svg>`
    )
    return node
}


function Slider (color, state) {
    let slider = dom ();
    let input = html`
        <div> 
            <div style="display:flex;align-items:center">
                <div  style="width:20px;text-align:right;margin-right:10px">
                    ${color.charAt(0)}
                </div>
                <div>
                    <input type="range" min="0" max="255" value=${state[color]}>
                </div>
            </div>
        </div>`
    udom ();
    input.oninput = function (e) {
        let value = e.target.value
        state[color] = value;
        update(state)
    }
    return slider
}


function App (state) {
    let app = dom ();
        html`
            <div>${Circle(state)}</div>
            <div>${Slider("red", state)}</div>
            <div>${Slider("green", state)}</div>
            <div>${Slider("blue", state)}</div>
        `
    udom ();
    return app
}

function update (state) {
    render(target, App(state))
}

update (state)



