import  './rubric.css'

function ScaleItem({student, scales}){
    return (
        <div className="row row-student">
            <div className='student border'>
                {student.first_name} {student.last_name}
            </div>
            <div className='scale'>
                {scales.map((item, index) =>
                    <div className="input border">
                        
                    </div>
                )}
            </div>
        </div>
    )
}