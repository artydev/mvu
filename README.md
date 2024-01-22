# MVU

Based on [DML](https://github.com/efpage/DML), [Morphdom](https://github.com/patrick-steele-idem/morphdom) and [HTL](https://github.com/observablehq/htl)

[![](https://data.jsdelivr.com/v1/package/gh/artydev/mvu/badge)](https://www.jsdelivr.com/package/gh/artydev/mvu)

MVU tries to follow the Model View Update pattern.
The idea is to make the view a function of the state only.

MVU can be used directly in the browser, and don't use any external framework, it's plain vanilla Javascript.

Here is an example , you can test it here [ChooseColors](https://flems.io/#0=N4IgtglgJlA2CmIBcBWA7AOgMwBYA0IAxgPYB2AzsQskVbAIYAO58UIBAZhAucgNqhS9MIiQgMACwAuYWO1qkp8RTQA85QgCcIjKQAJymwgF4AOiGlTmSAPQ3CUUhgBW5KPFgQAbpoyl4UjYA5hI29JpSAJ7uXjZgXgCuAAIATBgADBgAjDZQEOSB8QkYCWBQGJBOruYAfKo2Gtq6Naakrap5XnrQZiBMjLWtenrtud418iwIhFIQZLxiWUjpIAC+eILCouKu8iSKylI0+wV6wHrSsnh6UMRg1wm393qayu6a1+ReQXqresZ6IoYACyADUAKoAblaJ30UnCQQC-xuxEIpUOGERUgAoggRIoAEKRACSUAAFOZ+uYAJStBD6Ar0JTI4BDYbdUgQKRIPRSTQJeB4NnDV5QHkpFAoIWkdl6IKvZQ8rIpAAc0tlACNYAKlRLWqtWhwEqQZnMZQBhCBGBBkxlKalnYV6WEGPkkWDETTI23w+3-Gp6AAGmiCGrJABJgHb4BhRetI9HMQrSPGo76Y1qBatqYHoTL2fS9KRiO5vU7ZV8goH1N89AB3aBSCS9LLpdKMAAe5gu8AgISkLbbne7XFgsGMCbdVE9PqZ8Gpqxa+dlsoT32rhCthAQzo7xhQ6WdkX3h80J7q9i3CBqgYNy-Z9UrN6dtPvrykCU0MuL7n1huNppkHoADKnjvGS7qep86YOqy96FuQYHwF6AJPGS1J5rKhYQKQjAJPoAKXLAgblnoHTjCM94rmRnSupECC9Hk5CMAwkRIBwCAdpC9CeEEpAALRcvAYDkEghCHMhgxUdRD60XRDHmA2UBNqg7ZcUoHZSPxPF9qQSDaP2kJgAiOH8QZ0hIK2nbQiAS4yfZ7KRpBviEBI4QAIJSGS6TUhgUjEOCjCMMh5r0Cw6F3g5K71J0dlRbJ4ykfFZE4XhcKRMFvSaPQpCIt2lS9Ok+X0Hu5gSig3ZeDxAoTmmc58M5AC6i5JTJMWJdJDmTvVTWRQ57VeHFsoDc+96PHc6GYeyqX4RgZAzQRehGiasxAWS86Op1eiFlV2rwMiMbwiGAQYLtAqtdGDXTpojXImd8BTdRCSMFAc6zvaTp9SKASfjKiHQJJKb-itZp6AAKlyO7oZtwyFrMUg7oRMjEaoEhZDU7kgRAYAsft5rXeQejmhIxDECwmj1Gjo3fR+X68pD8B-qQy2ATK7lBe9G1wVhSL9MiaEYU6REkdJkYQwj8ARaR5FdNuYXkMYADkzn8a5pPk4rQ3RbFkaWtakvRguI2tcMMvOgw5AK+YKv-e8UnJTLWtRY7kagQDmgUiAormNBc5G2Mg0m9r4yu0hHvmPK8DKD7rp+6sxtbdRLvAG74HmJmjPsLH9rxwHTttXnQcJ0neeBpRsrjWAk1Ou+v16FSQPMwBq0ys9r1KJzsE128yFkkdWLXOzjCd6+d5t29huPSurQz6QkwePArMLCAWQAJzLPxKTpMsawbCAQgiDQGCEJbexkEoKhiBqJaRDDegavQhAANbysQxpQHoPJao-T9TYw9AwBwkEZYU1jIhhwiAtkzkkB1gkEJPMfxZ4AGI+bcxuPkFi9A2IcXgFxNkzgEgFAgBwSIqtz6HB5MxR+8BtKaDfqQKAkJKJ3laMfa6qsSZk2QnfDSWkdJ8TEhJL0f8AF5FykqFA1k2TX00O8JUnYDBUGgPWOBSgEGzzYR6TQ-FbbcLQUxTB2DOKgJMnpQ89B8LEBEYA8RegsiSLwfmAhRCSFkIOIoSh-9xK0PoYw2ewx-42KCGZPsFkDzDhTPPaYLdl72KQCkAAbGsZqQA)

```js
const { html, dom, udom, render, svg } = mvu.MVU;
const target = document.getElementById("app")
let state = {
    init: true,
    red: 255,
    green: 128,
    blue: 125
}
function Circle(state) {
    const strcolor = (state) => `rgb(${state.red},${state.green},${state.blue})`;
    let node = (
        svg`<svg width="100px" height="100px" fill=${strcolor(state)}>
          ${svg`<circle cx=50 cy=50 r=50></circle>`}
      </svg>`
    )
    return node
}
function Slider(color, state) {
    let slider = dom();
    let input = html`
      <div> 
          <div style="display:flex;align-items:center">
              <div  style="width:50px;text-align:right;margin-right:10px;">
                  ${color.charAt(0).toUpperCase()}
              </div>
              <div>
                  <input type="range" min="0" max="255" value=${state[color]}>
              </div>
               ${state[color]}
          </div>
      </div>`
    udom();
    input.oninput = function (e) {
        let value = e.target.value
        state[color] = value;
        update(state)
    }
    return slider
}
function Title () {
  let title = html`<h1>A Simple Colors Chooser</h1>`
  return title
}
function App(state) {
    let app = dom();
    html`
      ${Title()}
      <div class='color-chooser'>
        <div>${Circle(state)}</div>
          <div class="color-slider">
            <div>
              <div>${Slider("red", state)}</div>
              <div>${Slider("green", state)}</div>
              <div>${Slider("blue", state)}</div>
            </div>
          </div>
      </div>` 
    udom();
    return app
}
function update(state) {
    render(target, App(state))
}
update(state);

```




Here is the a more compact version : [ChooseColors](https://flems.io/#0=N4IgtglgJlA2CmIBcA2A7AOgIwE4A0IAZhAgM7IDaoAdgIZiJIgYAWALmLCAQMYD21NvEHIQAHlI8AThAAObAASkpPALwAdEOzazSSAPT6eUahgBWpKPFgQAblIzV4bfQHMW+2lLYBPK7f0wWwBXAAEAJmwMAAZ9KAhSFyDgjGCwKAxIUwtNAD4xfUkZeVz1ajKxeNsFaA0QWllZPLKFBQq4u1zuEFJreB42CAFyJmikAFYADhAAXzwaekZmC27+QWE2UTXEhWAFdk48BSg+MCPgk7OFKWErKSPSW1cjtlpXUgUZhVUFZIwAWQAagBVADcZW2ij2VSOEGosmCbAeslo1E+3wUr3e4PK1Ehvx4EBUCAxAAoAJTfXJtNHHOykgDkDKOAAMAO7QNgsJAAFmisgAHqCWPAIO42Lz+UKAEa0HgAa1cUj4wWoUCQNygoOlfCkdwAtFJaPFgnpxtEAKQs8k4iHDRQAZRsdzJWSOYFoAqOtlosGC8CONml1gQlNU1OALQUCEUpGd8CkGMuCgpONarVIKOopKDIfgNqjrRjCmsg3hiIxcIRbFJmk0R2Avlk8AUSDaICN1Fc8HrSl8CCQmnimdgtB8SGlsD4Ct7Hq9vzh3t9-pmBdpRecJdgbB9fpbPyqpNLVcRGF3-owbD4DrYMi7FMpUYup1TUbj0ATGESPgQGGHslHHwMU0QgEAFTQ02uZxgikNFI3XdMT0UNtj3LJFC3Tc94BQ7csKjGYygI3FCFVAYhjRXo2AAYT4KcpCPbcjgAJSOABxI4ACFyT2KNSy-ft4AwWUFSVFU1RouiMRZKRXGlUkABJgCYjAkLPZd4DmRTWJUtC1L3TTgA4nTqz0ldyRZQjQRpMoSLxQYBAUABBRoU0peDWnxBpZCTU5XMgjz7QUQliX3AkiR4ElXwQ-EKBYhR2IUDiAF0MQoDDWidD96OiI5wnGcYjiwcJJiOTQmM0ckjhpdN00yu5SRyhQ8oKhQipK1pNFYirSoQjL42y3L8sK4rSpADiKowpLIOfMAoo62lYrYzikowQhdQAUTlFhSVJd87jDCMML2z9VIEJCyQO1p3JqoLwt-b9f2ExVlVVKAJN1KSZLkxTlNUrCDO0v71IMoygf08z-PTY6HCwnSnCkAAVeABUUH5oeM088IQojWlXSC32cd76OCiKAwUOKEq4-HaRuNgYLRLycSIsobjVBNSS8o5nNkB9bWobpegQMjhlEHkUCQaJ9TGaJZnmEA6AYUQMB4UhyF4AQhBEJgv3jK6o3-QCJynBUmYFvpheoEYQCwJAsB5WYkoIBWliJ0g6oTWYgA)


```js
const { html, dom, udom, render, svg, tags } = mvu.MVU;
const { div, input, span } = tags;

const mcircle = () => 
  div('', `width:40px;height:40px;background:red;border-radius:50%`);

const Slider = (min, max, value, libelle) => {
  let slider = dom ();
    span(libelle);
    let eltinput = input("", {type : "range", style:"display:block", max, min, value});
    let eltvalue = div(eltinput.value.toString()) 
  udom();
  slider.style.display = "flex";
  return {
      input : eltinput,
      value: eltvalue
  }
}

function setColor(elt, R, G, B){ 
  elt.style.backgroundColor = `rgb(${R.input.value},${G.input.value},${B.input.value})`
}; 

function App () {
  const app = dom ();
    const circle = mcircle ();
    const [R, G, B] = [
      Slider(0, 255, 128, "R"),  
      Slider(0, 255, 128,  "G"), 
      Slider(0, 255, 128, "B")
    ];
  udom();
  
  [R, G, B].forEach((slider) => {
    slider.input.oninput = () =>  {
      circle.style.backgroundColor = `rgb(${R.input.value},${G.input.value},${B.input.value})`;
      slider.value.innerText = slider.input.value
    }
  });
  
  setColor(circle, R, G, B);
  
  return app;
}

render(app, App());

```




