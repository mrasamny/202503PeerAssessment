import './rubric.css'

export default function CatalogTitle({name, description}){
    return (
        <div className="category">
            {name} : {description}
        </div>
    )
}