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
  const [group, setGroup] = useState(null)

  useEffect(()=>{

    async function loadRubricData(){
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

    /**
     * Fetches group data (i.e. students in a group) with group_id of 1
     * from the backend and places the data in the state variable group, 
     * which has already been allocated using useState.  The
     * variable group is an array of objects. Each object contains 
     * groud_id, id (the primary key), first_name, last_name, email.
     * For example, for the group with group_id of 1, 
     * [{"group_id":1,"id":1,"email":"ayang@students.desu.edu","first_name":"Alena","last_name":"Yang"},
     * {"group_id":1,"id":2,"email":"rstephenson@students.desu.edu","first_name":"Ross","last_name":"Stephenson"},
     * {"group_id":1,"id":3,"email":"snash@students.desu.edu","first_name":"Susan","last_name":"Nash"},
     * {"group_id":1,"id":4,"email":"pphelps@students.desu.edu","first_name":"Phoenix","last_name":"Phelps"},
     * {"group_id":1,"id":5,"email":"dgonzalez@students.desu.edu","first_name":"Deanna","last_name":"Gonzalez"}]
     * 
     * use the endpoint `${baseURL}/groupMembers/1 to fetch the students in 
     * group with group_id=1.
     */
    async function loadGroupData(){
      // TODO: replace this line with your code
    }

    loadGroupData()
    loadRubricData()

  },[])

  function handleScaleChange(name, id, value){
    console.log(name + id + value)
  }

  return (
      !rubric ? <p>Loading data...</p>:
        <>
        {
        // TODO: replace this line with your code to display peer assessment sheet

        /* <CatalogTitle name="Timliness" description="Blah blah blah"/>
        <ScaleTitle scales={[{id: 1, value: 0},{id: 2, value: 1}, {id:3, value: 2}]}/>
        <ScaleItem name="1|1" 
          display="Jack Smith" 
          scales={[{id: 1, value: 0},{id: 2, value: 1}, {id:3, value: 2}]}
          handleScaleChange={handleScaleChange}
        /> */}
        </>
  )
}

export default App;
