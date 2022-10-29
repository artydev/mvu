# MVU

Based on [DML](https://github.com/efpage/DML) and [Morphdom](https://github.com/patrick-steele-idem/morphdom)

[![](https://data.jsdelivr.com/v1/package/gh/artydev/mvu/badge)](https://www.jsdelivr.com/package/gh/artydev/mvu)

MVU tries to follows the Model View Update pattern.
The idea is to make the View a function of the State only.

For now MVU does not use any reactivity. 
The view must be updated manually. But I will soon intregrate it.

MVU can be used totally in the browser, and don't use any external framework, it's plain vanilla Javascript.
Thanks to [DML](https://github.com/efpage/DML).

A [simpleCounter](https://flems.io/#0=N4IgtglgJlA2CmIBcBWAzAOgGwoDQgGd4EBjAF3imRAwAsyxYR8CSAnAe1iaQG0AGXAEYhaALr4AZhAQFkvUADsAhmERIa9RsxAkOiigeoAeAIQARAPIBhACoBNAAoBRAARbYAPgA6i4x9dYZUUAcwBebxB4RUifGL9aeGUoONc012M1MmVXElplNiIyCJAAVVsAMQBaAA5Y33SMrJz6MgAHKvgARwBXCAA3EoANKtKAQSrrDjA25TIIACMESNz9Q2LIgElnMMoQ+HrFRsz4bNcVNRL+iHgAdzaONjIVvQNojZBb6DJaMKh4a4keBVL5QH64VwQRQQebKWBVVhw+BhIQYfiHY7zMgITwAZQgMwQrimPTebGMAHosTiGuljKw2BA2mRXAQ2CQSq02gQkBSKSQoIoMAArAj-WADNgYRSnCkhWgUgpkACe-36FLA-R6AAFUaiAEwUqAQAhkDVajA9MBQDCQIWi2KUhlMshxSmJZJxXzGBYcKDK1J0439SFQErKNptQ60tKU4OB2PO5leo6NdKvU2uYBQaYQno5sAQwvuBiwCFsaL-NiuAC+rjCrgAsgA1UoAbl8MbTCBZprm8HrWa7afTHFJFDYSFc6NTI5rndnaYzLIWPTIZH0g7AAApIqv1-pIgBKDuLxrL9xCLe7kC0ITH08jtIX2j66+RV8P4fpb9pSSk8gIE3EkyW3PsKCPIcz27U5VnHeBqwbAttyPX8YJZKESEHFD608LNWWyCgMD0eDqwAagbIQ21cHo2igfsAH1rjuMDCPgSCa0fJ9GlfbcAAMSLJVwpwAEmAcD4GIscyRrPjUOgkd9w3RQb0w48MH0EgJRIABrQdMK47j82mFC0OfaSJ2IoICAIAAZE0yAwZIoBvQSJy-BT0grMgejYI43IQwy03neJuP-RRAM3MZI1Y-tIOAMz0h7VxmNuQdkJPRKRw8bcAHJ-DfU1lQQEoKAADzIKo4QgEJFCQIEyViMYUoQ5VWQJNoiQC8kKVfTxcvk7juJAidYogrKaIyoLuO83yjlStCQrQ8LIqOWj6IoJibluMb2Kgoa0grRQq23CM2ghaK2l2o9BqfELuLQ9bGNS67fy7J12BdN0KV9f0U3dUtPB0IhSHmfQ5A0fgkH4KoUAAFiQAB2EAa1wJRVHUGhRR0V51moXxgeIeBVohkAhGhlG0ZAC5MeImycbWd5qCk0j9tcWYYChEIkCEfg2jKtswAKEIoWh1xlDXDg23Kyrqtq+r3kC1xfTYKspyEfnWS4aBlaCXS21BH4kH1fg+YF3wa0J0GgMUUnyZqOGUYkamMeoFawaODwUaAA) :

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Counter</title>
    <script src="https://cdn.jsdelivr.net/gh/artydev/mvu@1.1.2/dist/mvu.umd.min.js"></script>
</head>

<body>
    <div id="app">

    </div>
    <script>

        const {dom, udom, m, html, render } = MVU;

        let state = {
            counter: 0
        }

        const button = m("button");
        const h1 = m("h1");
        const h2 = m("h2");
        
        function Counter(state) {
          let counter = dom()
            let inc = () => { state.counter += 1; update_view(state) };
            h2(`counter : ${state.counter}`)
            button("inc").onclick = inc;
          udom()
          counter.classList.add("counter");
          return counter;
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
       
    </script>
</body>

</html>
 ```
     
You can try other demos here : [Examples](https://github.com/artydev/mvu/wiki/MVU-in-practice)







