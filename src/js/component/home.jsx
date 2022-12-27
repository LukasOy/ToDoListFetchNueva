import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const CSS1 = {
  textAlign: "center",
  marginTop: "100px",
  backgroundColor: "Green",
  width:"600px",
}
const CSS2 = {
  textAlign: "center",
  marginTop: "5px",
  backgroundColor: "Green",
  width:"600px",
  paddingTop: "10px",  
}


const Home = () => {

  const [tarea, nueva] = useState([]);
  const borrar = (b) => {
    nueva(tarea.filter((value, index, arr) => {
        return index != b;
      })
    );
  };

  function putApi() {
	var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(tarea);

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://assets.breatheco.de/apis/fake/todos/user/juli1", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  }

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/juli1")
      .then((response) => response.json())
      .then((data) => nueva(data));
  }, []);
  
  useEffect(()=>{
	putApi();
  }, [tarea]);

  return (

    <div className="text-center container">
      <div className="text-center container" style={CSS1}>
      <h1>Lista de Tareas </h1>
      </div>
      <div className="text-center container" style={CSS2}>
      <form
        onSubmit={(event) => {
          event.preventDefault(); //que no se actualize el componente//
          nueva([...tarea, { label: event.target[0].value, done: false }]);
          putApi();
          event.target[0].value="";
        }}
      >
        
        <input type="text" placeholder="¿cual es tu tarea?"></input>
        <button> Ingresar </button>
      </form>
      {tarea.map((value, index) => {
        return (
          <li key={index}>
            {value.label}
            <button onClick={() => borrar(index)}> X </button>
          </li>
        );
      })}
      <div className="text-center container">
      <p>Cantidad de tareas {tarea.length}</p>
      </div>
    </div>
    </div>
  );

}
export default Home;


