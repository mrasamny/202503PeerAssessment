import logo from './logo.svg';
import './App.css';
import './rubric.css'
import ScaleItem from './ScaleItem'
import ScaleTitle from './ScaleTitle'
import CatalogTitle from './CatalogTitle'
import { useEffect,useState } from 'react'
import axios from 'axios'

const baseURL = 'http://127.0.0.1:12000'

function App() {
  const [rubric, setRubric] = useState(null)

  useEffect(()=>{
    async function loadData(){
      const response = await axios.get(`${baseURL}/assessment/1`)
      //console.log(response.data)
      let rubricData = {}
      response.data.forEach((row, index)=> {
        if (row.category_id in rubricData){
          rubricData[row.category_id].scales.push({id: row.scale_id, 
            value: row.scale_value,
            description: row.scale_description
          })
        }else{
          rubricData[row.category_id]={
            id: row.category_id,
            title: row.category_title,
            description: row.category_description,
            scales: [{id: row.scale_id, 
                    value: row.scale_value,
                    description: row.scale_description
                  }]
          }
        }
      })
     const rubric=[]
     Object.keys(rubricData).forEach((key, index)=>{
        rubric.push(rubricData[key])
     })
     setRubric(rubric)
    }
    loadData()
  },[])

  function handleScaleChange(name, id, value){
    console.log(name + id + value)
  }

  return (
      !rubric ? <p>Loading data...</p>:
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
