import './rubric.css'

export default function SubmitButton({handleSubmit}){

    return (
        <button id="submit"
            type="submit"
            onClick={handleSubmit}>
            Submit Peer Assessment
        </button>
    )
}