// useState usado para trabalhar com estados dentro do React
import React, { useState } from "react";
function Header(props) {
    let [ contador, setContador ] = useState(0);
    function increment() {
        // Conceito de imutabilidade sendo aplicado na prática (uma variável não é sobrescrita ela é alterada com base no seu valor anterior)
        setContador( contador + 1);
    }
    return(
    <> // Tag sem nomenclatura conhecida como fragment
<h1>Contador = {contador}</h1>
       <button onClick={increment}>Click</button>
    </>
    )
}
export default Header;