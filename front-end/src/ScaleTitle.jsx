import './rubric.css'

function showScaleDescription(event, id){
    const tag = document.getElementById(id)
    let rect = event.target.getBoundingClientRect()
    tag.style.display = "block"
    tag.style.top = (rect.y + rect.height) + "px"
    tag.style.left = rect.x + "px"
}

function hideScaleDescription(id){
    const tag = document.getElementById(id)
    tag.style.display = "none"
}

export default function ScaleTitle({scales}){
    return (
        <div className="row row-header">
            <div className="blank border"></div>
            <div className="scale-header">
                {scales.map((item, index) =>
                    <div 
                        key={index}
                        className="scale-title border"
                        onMouseOver={(e)=>showScaleDescription(e,'scale-description-id-'+item.id)}
                        onMouseOut={(e) => hideScaleDescription('scale-description-id-'+item.id)}
                    >
                        {item.value}
                    </div>
                )}
            </div>
            <div>
                {scales.map((item, index) =>
                    <div 
                        key={'desc'+index} 
                        className="scale-description"
                        id={'scale-description-id-'+item.id}
                    >
                        {item.description}
                    </div>
                )}
            </div>
        </div>

    )
}