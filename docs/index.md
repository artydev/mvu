# MVU
MVU est une librairie qui expose quelques fonctions permettant de créer une interface WEB entièrement en Javascript.
Ce mode de fonctionnement est celui utilisé par toutes les librairies modernes (React, Angular, Vue, Svelte...).
Cela facilite le développement d'applications sous forme de composants.

La grande différence avec ces librairies est le fait que MVU peut être utilisé directement dans un navigateur sans tooling particulier.

Le projet est hébergée sur Github  : [MVU](https://github.com/artydev/mvu)

## Fonctions exposées par MVU

Elles sont au nombre de cinq.

- html
- m
- dom
- udom
- render

# La fonction __html__

La fonction **html** prend une chaîne de caractères en entrée représentant un fragment html, et renvoie un élément HTML.

Example : 

    const html = MVU.html
    
    const style_barre = (color) => `
      background:${color};
      line-height:50px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 50px;
      padding-left:10px;
      padding-right:10px;
      box-shadow: 0 5px 5px rgba(0,0,0,0.3);  
    `
    
    const barre = (color) => html(`
        <div style="${style_barre(color)}">
          <div>GAUCHE</div>
          <div>CENTRE</div>
          <div>DROITE</div>
        </div>
    `)
    
    let bg = barre('lightgreen');
    let bo = barre('orange');
    
    bg.onclick = () => alert("Green Bar")
    bo.onclick = () => alert("Orange Bar") 

Vous pouvez tester l'exemple  ici : [Function HTML](https://flems.io/#0=N4IgzgpgNhDGAuEAmIBcIB0ALeBbKIANCAGYCWMYaA2qAHYCGuEamO+RIsA9nYn6wAEAHjCwATmQAO8QWHGwAvAB0QOeFLCoA9NthI6GAFZgk0MgDdxGOhHjaA5lm0Nx8AJ5mL23BYCuAAIAjBghAEzaSGRg9r5+GH64SBi4ZIYmqgB8wtpikjKZynSCRSJ50vCFxYI1PHQxguxQgoqCALIAagCq2HhQpTUl1bW8DTHuMAD6AEau4hAtggAUPFDc4gCULZmCAAYDg4KzsADWDuLcfnRIqAAkwKvrAL4A3AeDUGkQALRYEGROeCoACsAAYpAAPN7DQZRMBSKAMdyoQQkGBQ941Ix+GJkEjub51fhAuRSBiwH7TOwAdwgEDo0MONVwrgcaW+0248Hg3FwKLBkMZTLJSCidAc3xgJCBQXBGJhNRFYolkkBqFlgsxR24EO+YCwDCQ3GpKNBgmBkPNlvEDlmS1BhAdTowAGYNi8au99jD3nUGrNxPNFituGtNttGn0lt6mYNhFELHIPDAVCB7uMpgH5iGwxsnlktYd45ZMgBxACCXQAwgAJACiOQTVVjRabVbrADkACoAJQbkRLhbjTYAIj2APIASS7-abQ8bg5huw273eMFk0wciyzECWAHJPoDznS6Hv3Wu7Nrt3Nd3v1gxxRAz0LPTDNxheLBPqdg1tFDsGBgNwllUUt5npQQACFXFUFc324D86C-Mgf1aJY-wAoD4BAkBx3EB8HAWaDxFgw4ilKHJygKThIBgBAyFGVgwgADlQAAWF1vhdVBQRAJ5CHoJgWHQYwqGIIl6XgVg+IEkBGGYVgMFgMAxK4XhiWkp4AF1iHk4TSCuejeEjDgniAA)

Au passage, on peut constater que la fonction **barre** peut être considérée comme un générateur de composants. 

# Les functions __dom__ et __udom__

Dans le précédent exemple, les barres on été rattachées directement à la balise **body** du document.
Très souvent, on souhaite 'isoler' une portion de code html au sein d'un division; on utilise pour cela les balises **<div></div>**
C'est exactement ce que réalisent les fonctions __dom__ et __udom__.

La fonction **dom**, si elle est utilisé sans lui passer de paramètres,crée un élément **div** qui encapsule le composant définie après. 
On peut lui passer un **élément**, dans ce cas le composant défini après est rattaché à ce même élément.

La function **udom** permet de terminer l'encapsulation.

Dans l'exemple suivant, les barres **bg** et **bo** sont placées respectivement dans les éléments d'id **green** et **orange** :

**Partie html**

    <div id="green">
    </div>
     <hr />
     <div id="orange">
    </div>

**Partie JS**

    let div_green = dom (document.getElementById("green"))
      let bg = barre('lightgreen');
    udom()
    
    let div_orange = dom(document.getElementById("orange"))
      let bo = barre('orange');
    udom()
    
    div_green .style.border = "10px solid orange"
    div_orange.style = "border:10px solid lightgreen;";
    
Remarquez comment on garde toujours une référence aux éléments (**div_green**, **div_orange**)  qui encapsulent les barres.

Vous pouver tester l'exemple ici : [DomUDom](https://flems.io/#0=N4IgtglgJlA2CmIBcAWATAOgBwEYA0IAzvAgMYAu8UyIGAFuWLCAQGYQKHIDaoAdgEMwiJLQZMWIUgHs+lOTQAEAHkKkAThAAO5RYXWkAvAB0QDclsJIA9NdJQ+GAFaEoJCADd1GPvHLWAczprAXVyAE83D2swDwBXAAEcDGS0aygIQn9YuIw4sCgMSEcXUwA+ZWs1TR0y4z5FepU6HDqGxUUAcXV4eAaAIVD6ypa2lQyPRWgTEACevvKmjuH0zzGm5Tp1RWt1hs3WpcUAeXUBPgD4RUH1FdGNiamoGekzi-hF9sa+Som975U1W05DGHUUMj4WUUwHEsDwiig0jA8LiiORijAigAvh1DIoALIANQAqgBuI4AsEQqGPPFgAAUpgmpgAlBSKdTdFlwggAPoAI1CPUUePpMlgrxZIrKigABhSOoLSABrObSOJ8KBIAAkwHFryx5K+YNgEF8AFo6PAIEFyEgAKwABi0AA8jWCwRlCFpYAJwkhFKwEG6FYonHEshBWOFzRD5Ha9FoBKR4Ob+X4AO69Pjuj2KJMwM0Bc0IVh2nDOkPGjoFjIXc2aW1ICuu3Me-nSF3mwh0ASIjMBx2Ke2u4ej9QBQX0x14GdzjAAZhZpOWxvlxo5sihgvUwtF+vUUsMMth9PXebByke3IQM11N-gAqF8DF0glh6xnwvHqva06AEFiQAYQACQAUV+NZQx-P4gLAgA5AAVAAlCDVg8UFv3GNYABFkOOABJRC0L+aCVHQzC5TZDdjQQXQJl5OZsxFBEkUUelEVIfI+nIDBLnIMCEGEOR+nCAioEZWZ5j4VlqIvOjFH5AIWJ3Hp6QAclNW0mL6dTlwpVEkXpOSwQpBSGNec5LhYtEOOkLjhN4-jBPgRzRPEyTLPeWTQwUjsVOfDSvMuPS20UQyGRM1cPQpBidIaDAHwwDt1DcbY8VMFsXT0N9oEUYKPhAWLPF5ArEoiBAWNMFK0ubSsctNKBFC0hh4vJEAwvZfYqg0YEykkYgyHICAtxoe00Ade1zXQJBHRALE8H4IQRFoFxJDjHiaHmxaQEEYQaAwUhCC4AgNoUUR5oAXQIPaVtYDUKBGhpYXmoA)

# La function __m__

La function __html__ est très pratique qaund il s'agit décrire de large portions de code html. Elle n'est cependant pas très pratique quand il s'agit d'insérer des éléments dynamiquement : 
         
         - affichages conditionnés
         - création de listes
         - style dynamique
         - ...
         
La fonction **m** permet de créer des 'générateurs' d'éléments, c'est à dire qu'elle permet de créer des fonctions qui créent des éléments.
On peut donc à l'aide de ces fonctions créér des éléments à la volée, en prenant en compte le contexte d'exécution.

La function **m** prend en paramètre en nom de 'tag' html et renvoie un fonction génératrice d'élèment de type 'tag'.
Le code suivant permet de se faire une idée plus précise.

    // fonction génératrice d'éléments de type 'h2'
    const h2 = m("h2")
    
    // fonction génératrice d'éléments de type 'boutton'
    const btn = m("button")
    
    // fonction gératrice d'éléménts de type 'input'
    const inp = m("input")
    
    
    h2("Exemple de fonctions génératrices")
    
    // utilisation de la function inp
    const input = inp()
    input.placeholder = "waiting..."
 
    
    // utilisation de la fonction btn
    const b = btn("send")
    b.onclick = () =>  {
      input.value && alert(input.value)
    }
 
 Vous pouvez tester le code précédent ici : [function_m_exemple](https://flems.io/#0=N4IgtglgJlA2CmIBcBmA7AOjQNgDQgGd4EBjAF3imRAwAsyxYR8AzCBA5AbVADsBDMIiQ16jZiBIB7XhVnUABAB4CJAE4QADmQUE1JALwAdEPTKaCSAPRWSUXhgBWBKMQgA3NRl7wyVgOa0VvxqZACeru5WYO4ArgACAIwYyQBMVlAQBH4xsRixYFAYkA7OJgB8SlaqGtrlRrwNCk1NKupaZPW8Cj0K0rzZCsBisLgKUFJgY7ETUwpgCgC+PQYKALIAagCqANxNvfs9NgosMuQQMgr+AJe812r8ZBok8OMA5New10KyBOOv4U0rzetFSb0OfRkg1BClWYAAFCZQSYAJQQiHHU68c6XG53B5PCAvd6fb7wX7-BSA4EAIyksTIZBk4O6vX6gxpZG6cMRIBpDKZjRAaNZPQxVhOZzIF26NwJz1eUA+XzAtzIf1cVLCQIUbwgvE0DJZvUhAx0+s0sPmvItDNR6NFzUdoN5AFEAB7wMCaBCUrE4gZXW73R4Kgj2x3ihQM9hZR4yymwfgnWLY6WXC0Q9nmg0Mq0W+Eik22sgYH38F60KSwVxqK0mADu-Ag0t4-gwHZMLUjjuOMdgcfT3U1SclaYTnMajuzChpVsnvKIvCgEZNNIwZwHJAA1lbC7Dyj1gBCeiWMO5+LBYq8AGQ3hSX+CheFni9X+BF3qLbsHbpVGodOUEhEKQQ6cCIqQAJxIIkAC0aBIAADCAiy4HwgjCDQzgSP0chkNQKFoSAAhCNQGAkAQnD4Lh5L4SIKEALr4CRmEsKmAYKCMKFAA)
 
 Un autre exemple, un peu plus avancé
 
      const txt_header = "Exemple de création de liste"
      
      function test(item) {
        header.innerText = `${txt_header} - item clicked : ${item}`
      }
     
      const {html, dom, udom, m }  = MVU;
      
      const h3 = m("h3")
      
      let header = h3(txt_header)
      
      const uls = m("ul")
    
      const lis = m("li")
    
      let liste = [...Array(1000)].map((_,i) => i + 1)
    
      let ul = uls()
    
      // on définie ul comme base de rattachement aux 'li' crées ultérieurement
      dom(ul)
        liste.map(item => {  
          let l = lis(item,{onclick:`test(${item})`})
       
        })
      udom()

Vous pouvez tester l'exemple ici : [Liste](https://flems.io/#0=N4IgtglgJlA2CmIBcBmA7AOjQNgDQgGd4EBjAF3imRAwAsyxYR8CSAnAe1iaQG0AGXPwC6+AGYQEBZL1AA7AIZhESGvUbMQJDnIq7qAAgA8rNhAAOZAwTYkAvAB0Q9MuYJIA9B5JQ5GAFYEUMQQAG5sGHLwZB4A5rQeCmxkAJ7BoR5goQCuAAIAjBiFAEweUBAEMVnZGNlgUBiQfoFOAHxGHqYWZK0Ocn0GAwMm7N29coMTBtpylQZkAB5kAPq08ArBbAZ2gyAAogvwYOYIBsHTbACXCmQQOmfwBrAVFE4DkwYGYtly5HcTFEqAAoIBQwABKAzAd6fNYbeARCByKJsAAq8CW2wMAAMACTARYrOGbAC+BgAtAZQUdps8SABrSgGJAGfHUsAk7HvElDKYzObAdSwXBnDhgEXZKBikVgAxkrEAWQAagBVADc73e-KstBQWLAQKcuqc4M1UwQOvWmyxuqBhNWVoRpqmWp0c2ysAI+sNIA9Jr6rtmVmeXp2Bqcz39-XN0SeL0eO14GGTAEE2GwFCkgfl+LnwcJGgpzECgctcBBIXZWlSDABqAz5Z3vC0GD1Yj0EIFNqZeAz3KCXCRyCCPNvaMDKAwAIwURAeBgzZDIChIa2UugMCmyCwMAHJnruLpd4F6PWRLmZ4Nk2Ed4Lp3lKDR7nZ9PiGKIXi+zttXgJ8Ya+LawFiIYgmCuDADoJB0vSSDYoCZBAmyYIkuC2KoTCAEYVMkpil2AYuhMHRdJYrSaEQpC3G61AABxIMUKAgCSEEgIoyjUAE0j4DMehkNQTEsWxKg0CQBBcVoOi8dQbbQlMM4MrEnA-FASDPPEZCKfAd4alMADu0BkLQqDFPw5gLDpnzmBs5RyLE9GmeZ7xrBA6ksgALLmZkWX2oQImIsAcLpSBbmQHDee+5KVCkCAsnIOjwH0PLRs8UIEe8VkwEidkGCgXmJWlcjPEgtAcL5WyyZ88n0opHDKSybCxDOQKCC1QgYMU4LeSQ14EBwbAsuYHBIhQbA6SS5HEPAfzUao+T5Eg-BMaIrFKMJ3y-FRExCkxQA)















