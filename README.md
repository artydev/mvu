# MVU

Based on [DML](https://github.com/efpage/DML) and [Morphdom](https://github.com/patrick-steele-idem/morphdom)

[![](https://data.jsdelivr.com/v1/package/gh/artydev/mvu/badge)](https://www.jsdelivr.com/package/gh/artydev/mvu)

MVU tries to follows the Model View Update pattern. The idea is to make the View a function of the State only.
For now MVU does not use any reactivity. 
The View must be updated manually. But I will soon intregrate it. 

Here is an example :

```js
 const {dom, udom, m, html, render } = MVU;

  let state = {
      counter: 0
  }

  const button = m("button");
  const h1 = m("h1");
  const h2 = m("h2");

  function Counter(state) {
      let inc = () => { state.counter += 1; update_view(state) };
      h2(`counter : ${state.counter}`)
      button("inc").onclick = inc;
  }

  function App(state) {
      let view = dom();
          html('<h2 style="text-align:center">A very simple counter</h2>')
          Counter(state)
      udom();
      return view
  }

  function update_view(state) {
     render(app, App(state))
  }

  update_view(state)
 ```
     
You can try other demos here : [Examples](https://github.com/artydev/mvu/wiki/MVU-in-practice)







