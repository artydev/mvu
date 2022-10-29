# MVU

Based on [DML](https://github.com/efpage/DML) and [Morphdom](https://github.com/patrick-steele-idem/morphdom)

[![](https://data.jsdelivr.com/v1/package/gh/artydev/mvu/badge)](https://www.jsdelivr.com/package/gh/artydev/mvu)

MVU tries to follows the Model View Update pattern.
The idea is to make the View a function of the State only.

For now MVU does not use any reactivity. 
The view must be updated manually. But I will soon intregrate it.

MVU can be used totally in the browser, and don't use any external framework, it's plain vanilla Javascript.
Thanks to [DML](https://github.com/efpage/DML).

Here is an example [SimpleCounter](https://flems.io/#0=N4IgtglgJlA2CmIBcBWAzAOgGwoDQgGd4EBjAF3imRAwAsyxYR8CSAnAe1iaQG0AGXAEYhaALr4AZhAQFkvUADsAhmERIa9RsxAkOiigeoAeAIQARAPIBhACoBNAAoBRAARbYAPgA6i4x9dYZUUAcwBebxB4RUifGL9aeGUoONc012M1MmVXElplNiIyCJAAVVsAMQBaAA5Y33SMrJz6MgAHKvgARwBXCAA3EoANKtKAQSrrDjA25TIIACMESNz9Q2LIgElnMMoQ+HrFRsz4bNcVNRL+iHgAdzaONjIVvQNojZBb6DJaMKh4a4keBVL5QH64VwQRQQebKWBVVhw+BhIQYfiHY7zMgITwAZQgMwQrimPTebGMAHosTiGuljKw2BA2mRXAQ2CQSq02gQkBSKSQoIoMAArAj-WADNgYRSnCkhWgUgpkACe-36FLA-R6AAFUaiAEwUqAQAhkDVajA9MBQDCQIWi2KUhlMshxSmJZJxXzGBYcKDK1J0439SFQErKNptQ60tKU4OB2PO5leo6NdKvU2uYBQaYQno5sAQwvuBiwCFsaL-NiuAC+rjCrgAsgA1UoAbl8MbTCBZprm8HrWa7afTHFJFDYSFc6NTI5rndnaYzLIWPTIZH0g7AAApIqv1-pIgBKDuLxrL9xCLe7kC0ITH08jtIX2j66+RV8P4fpb9pSSk8gIE3EkyW3PsKCPIczyfHtIUUEhB23SCwk8LNWWyCgMD0cd4GrABqBshDbVwejaKB+wAfWuO4wIw+BIJrR8n0aV9twAA2wslXCnAASYBwPgLCxzJGs2KPX8033DdFBvKESGPDB9BICUSAAa0HOSmLnBdmP-eD5k3MZI1o-tIOACTGlg6jbkHAskK05i0w8bcAHJ-DfU1lQQEoKAADzIKo4QgEJFCQIEyViMZXH6XDlVZAk2iJTiJ3dfVPBc8ToMc4lhInEyIIs9J82mezCrSCsyB6NgjmsiT53iXSAIMo5SPIigqJuW58voqDstcCtFCrbcIzaCEjLabqj0y5j6uYiTWso6zJt-LsnXYF03QpX1-RTd1S08HQiFIZq5A0AAWFAkH1LAqiEAB2JAhBAGtcCUVR1BoUUdFedZqF8Q7iHgQD9FOkAhCQfhntekALg+rCCDkfAfveagelgXrXAWZQ1JCThSSgJAJXlMhcfgaImNBH4kCwM7+DaXymNmGAoRCK66YZ2lEmC+gp1p9mmI4GK2EkWAOFuJBlDXDgmIlU0ERVBAp0UfQDlTXx6t8CUoJ01wmeNUIpzQenTw1+IJSQWhBdwjGsZxvHBqnNgQix7dBDd3B+AwfUT1pEgqoIR4pweKEJxNhc71wV9I7QDGwAKEIoQhxnkn11n+BNgHjqAxRQbQR6nprCQYfe6g9OBo4PGeoA) :



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







