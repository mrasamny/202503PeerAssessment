import  './rubric.css'
import { useRef } from 'react'

export default function ScaleItem({name, display, scales, handleScaleChange}){
    //const [prevHighlight, setPrevHighlight] = useState(null)
    const prevHighlight = useRef(null)

    function handleHighlight(id){
        
        if (prevHighlight.current != null){
            prevHighlight.current.classList.remove('highlight')
        }
        const element = document.getElementById(id)
        element.classList.add('highlight')
        //setPrevHighlight(element)
        prevHighlight.current = element
    }

    function handleChecked(id){
        const element = document.getElementById(id)
        element.checked = true
    }

    return (
        <div className="row row-student">
            <div className='student border'>
                {display}
            </div>
            <div className='scale'>
                {scales.map((item, index) =>
                    <div className="input border" 
                        key={name+item.id+index}
                        id={name+item.id}
                        onClick={(e) => {
                            e.preventDefault()
                            handleHighlight(name+item.id)
                            handleChecked(name+item.id+index)
                            handleScaleChange(name, item.id, item.value)
                        }}>
                        <input type="radio" 
                            name={name} 
                            value={item.value}
                            id={name+item.id+index}></input>
                    </div>
                )}
            </div>
        </div>
    )
}