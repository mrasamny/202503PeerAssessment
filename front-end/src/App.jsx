import logo from './logo.svg';
import './App.css';
import './rubric.css'
import ScaleItem from './ScaleItem'
import ScaleTitle from './ScaleTitle';
import CatalogTitle from './CatalogTitle';
import { useEffect } from 'react';


function App() {
  useEffect(()=>{
    async function loadData(){
      
    }
  },[])

  function handleScaleChange(name, id, value){
    console.log(name + id + value)
  }

  return (
    <>
      <CatalogTitle name="Timliness" description="Blah blah blah"/>
      <ScaleTitle scales={[{id: 1, value: 0},{id: 2, value: 1}, {id:3, value: 2}]}/>
      <ScaleItem name="1|1" 
        display="Jack Smith" 
        scales={[{id: 1, value: 0},{id: 2, value: 1}, {id:3, value: 2}]}
        handleScaleChange={handleScaleChange}
      />
    </>
  )
}

export default App;
