import './App.css';
import './rubric.css'
import ScaleItem from './ScaleItem'
import ScaleTitle from './ScaleTitle'
import SubmitButton from './SubmitButton'
import CatalogTitle from './CatalogTitle'
import { useEffect,useState, useRef } from 'react'
import { useParams} from 'react-router-dom';
import axios from 'axios'

const baseURL = 'http://127.0.0.1:12000'


function EvalSheet() {
  const [rubric, setRubric] = useState(null)
  const [group, setGroup] = useState(null)
  const [assessed, setAssessed] = useState([])
  const assessment_id = useRef(0)
  const assessor_id = useRef(0)
  const group_id = useRef(0)
  
  const params = useParams()

  async function handleSubmit(){
    try{
      const response = await axios.post(`${baseURL}/assessed`,assessed)
    }catch (error){
      console.log(error)
    }
  }

  async function loadDeploymentData(){
    try{
      const response = await axios.get(`${baseURL}/deployment/${params.deployment_code}`)
      assessment_id.current = response.data.assessment_id
      assessor_id.current = response.data.assessor_id
      group_id.current = response.data.group_id
    }catch(error){
      console.log(error);
    }
  }

  async function loadRubricData(){
    const response = await axios.get(`${baseURL}/assessment/${assessment_id.current}`)
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

  async function loadGroupData(){
    const studentGroup = await axios.get(`${baseURL}/groupMembers/${group_id.current}`)
    setGroup(studentGroup.data);
  }

  async function loadData(){
    const tasks = [
      () => loadDeploymentData(),
      () => {
        loadRubricData()
        loadGroupData()
      }
    ]
    for(const task of tasks){
      await task()
    }
  }

  useEffect(()=>{
    loadData()
  },[])

  function handleScaleChange(name, scale_id, value){
    const [category_id, student_id] = name.split('|')
    
    setAssessed([...assessed.filter((item, index)=>
        parseInt(item.category_id) !== parseInt(category_id) || 
        parseInt(item.assessed_student_id) !== parseInt(student_id)
    ),{
      category_id: parseInt(category_id),
      assessment_id: assessment_id.current,
      assessed_student_id: parseInt(student_id),
      assessor_student_id: assessor_id.current,
      scale_id: scale_id
    }])
  }

  return (
      !rubric ? <p>Loading data...</p>:
        <form >
        {rubric.map((category, index)=>
          <div key={"Div"+index}>
          <CatalogTitle 
            key={"Category"+index}
            name={category.title} 
            description={category.description}/>
          <ScaleTitle
            key={"ScaleTitle"+index}
            scales={category.scales}/>
          {group.map((student, index) => 
            <ScaleItem
              key={"ScaleItem"+index}
              name={category.id + "|" + student.id}
              display={student.first_name + " " + student.last_name}
              scales={category.scales}
              handleScaleChange={handleScaleChange} 
            />
          )}
          </div>
        )}
        <SubmitButton handleSubmit={handleSubmit}></SubmitButton>
        </form>
  )
}

export default EvalSheet;
