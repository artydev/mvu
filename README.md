# MVU

Based on [DML](https://github.com/efpage/DML) and [Morphdom](https://github.com/patrick-steele-idem/morphdom)

[![](https://data.jsdelivr.com/v1/package/gh/artydev/mvu/badge)](https://www.jsdelivr.com/package/gh/artydev/mvu)

MVU tries to follows the Model View Update pattern.
The idea is to make the view a function of the state only.

MVU can be used directly in the browser, and don't use any external framework, it's plain vanilla Javascript.
Thanks to [DML](https://github.com/efpage/DML).

A [simpleCounter](https://flems.io/#0=N4IgtglgJlA2CmIBcBWAzAOgGwoDQgGd4EBjAF3imRAwAsyxYR8CSAnAe1iaQG0AGXAEYhaALr4AZhAQFkvUADsAhmERIa9RsxAkOiigeoAeAIQARAPIBhACoBNAAoBRAARbYAPgA6i4x9dYZUUAcwBebxB4RUifGL9aeGUoONc012M1MmVXElplNiIyCJAAVVsAMQBaAA5Y33SMrJz6MgAHKvgARwBXCAA3EoANKtKAQSrrDjA25TIIACMESNz9Q2LIgElnMMoQ+HrFRsz4bNcVNRL+iHgAdzaONjIVvQNojZBb6DJaMKh4a4keBVL5QH64VwQRQQebKWBVVhw+BhIQYfiHY7zMgITwAZQgMwQrimPTebGMAHosTiGuljKw2BA2mRXAQ2CQSq02gQkBSKSQoIoMAArAj-WADNgYRSnCkhWgUgpkACe-36FLA-R6AAFUaiAEwUqAQAhkDVajA9MBQDCQIWi2KUhlMshxSmJZJxXzGBYcKDK1J0439SFQErKNptQ60tKU4OB2PO5leo6NdKvU2uYBQaYQno5sAQwvuBiwCFsaL-NiuAC+rjCrgAsgA1UoAbl8MbTCBZprm8HrWa7afTHFJFDYSFc6NTI5rndnaYzLIWPTIZH0g7AAApIqv1-pIgBKDuLxrL9xCLe7kC0ITH08jtIX2j66+RV8P4fpb9pSSk8gIE3EkyW3PsKCPIczzTPlXFuAdbjYCNXB+Ac9BmfR3lcBZTng6JXG3As8wLSCCAJGQClgZUUI4AjjHjCE4wGTwjyPX90lgghaJ+OY4LQ4JXArSR4ArRQgUhFkkjIqjXGCKBZMjGTTWVBAIQBd4CAwLT2LSHtVnHETBwLbdIJ09I9KhEhBxM+tPCzVlsgoDA9AM6sAGoGyENtXB6NooH7AB9a47jAxz4EgmtHyfRpX23AADFyyVcKcABJgHA+BnLHMkazitjoJHfcN0UG9LOPDB9BICUSAAa0HSyoui-NphMszEonZyggIAgABkTTIDBkigG92pEr8CvSCsyB6NgjlGthGrTed4mi-8xPmTcxkjUL+0g4AzN005XGC24jJak8DrTDxtwAcn8N9lIQEoKAADzIKo4QgEJFCQIEyViMZjpE6iyMJNDsond19U8G78ui6KQInHaIMu5qdwuibGimmajhO9jlvYtbAM3Xz-IoIKbluZHwqg+G0lEqttwjNoIS2tpqdY-H2PY0nApOjnfy7J12BdN0KV9f0U3dUtPB0IhSA2xQ5A0fUAE4kAAdgAFhAGtcCUVR1BoUUdFedZqF8OXiHgYmleoIQkH4XX9ZAC4jec7rTbWd5qCy1zadcWYYChEIkCEfg2hetswAKEIoUd2S1w4NtXvez7vt+94RO8302CrKchEj1kuGgbCglqttQR+JB9X4COo98GsrYVoC7Y0B2ah1msJFdw3qCJxWS20GsgA) :

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
          // we wrap the component between (dom, udom) similarly to (<div>, </div>))
          // so that we can reference it easily and apply style, events...
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







