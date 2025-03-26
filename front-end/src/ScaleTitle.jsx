import './rubric.css'

export default function ScaleTitle({scales}){
    return (
        <div className="row row-header">
            <div className="blank border"></div>
            <div className="scale-header">
                {scales.map((item, index) =>
                    <div key={index} className="scale-title border">
                        {item.value}
                    </div>
                )}
            </div>
        </div>
    )
}