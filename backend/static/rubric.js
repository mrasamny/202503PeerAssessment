
rubric_data = [{
    category: 'Quality of Work',
    categoryDescription: 'Consider the degree to which the student team member provides work that is accurate and complete.',
    scaleDescription:[
        'Produces unacceptable work, fails to meet minimum group or project requirements.',
        'Occasionally produces work that meets minimum group or project requirements.',
        'Meets minimum group or project requirements.',
        'Regularly produces work that meets minimum requirements and sometimes exceeds project or group requirements.',
        'Produces work that consistently exceeds established group or project requirements.'
    ]
},{
    category: 'Timeliness of Work',
    categoryDescription: 'Consider the student team member\'s timeliness of work.',
    scaleDescription:[
        'Fails to meet deadlines set by group.',
        'Occasionally misses deadlines set by group.',
        'Regularly meets deadlines set by group.',
        'Consistently meets deadlines set by group and occasionally completes work ahead of schedule.',
        'Consistently completes work ahead of schedule.'
    ]
},{
    category: 'Task Support',
    categoryDescription: 'Consider the amount of task support the student team member gives to other team members.',
    scaleDescription:[
        'Gives no task support to other members.',
        'Sometimes gives task support to other members.',
        'Occasionally provides task support to other group members.',
        'Consistently provides task support to other group members.',
        'Consistently gives more task support than expected.'
    ]
},{
    category: 'Interaction',
    categoryDescription:'Consider how the student team member relates and communicates to other team members.',
    scaleDescription:[
        'Behavior is detrimental to group.',
        'Behavior is inconsistent and occasionally distracts group meetings.',
        'Regularly projects appropriate team behavior including: listening to others, and allowing his/her ideas to be criticized.',
        'Consistently demonstrates appropriate team behavior.',
        'Consistently demonstrates exemplary team behavior.'
    ]
},{
    category: 'Attendance',
    categoryDescription:'Consider the student team member\'s attendance at the group meetings.  (This includes in class meetings.)',
    scaleDescription:[
        'Failed to attend the group meetings.',
        'Attended 1%-32% of the group meetings.',
        'Attended 33%-65% of the group meetings.',
        'Attended 66%-99% of the group meetings.',
        'Attended 100% of the group meetings.'
    ]
},{
    category: 'Responsibility',
    categoryDescription:'Consider the ability of the student team member to carry out a chosen or assigned task, the degree to which the student can be relied upon to complete a task.',
    scaleDescription:[
        'Is unwilling to carry out assigned tasks.',
        'Sometimes carries out assigned tasks but never volunteers to do a task.',
        'Carries out assigned tasks but never volunteers to do a task.',
        'Consistently carries out assigned tasks and occasionally volunteers for other tasks.',
        'Consistently carries out assigned tasks and always volunteers for other tasks.'
    ]
},{
    category: 'Involvement',
    categoryDescription:'Consider the extent to which the student team member participates in the exchange of information (does outside research, brings outside knowledge to group).',
    scaleDescription:[
        'Fails to participate in group discussions and fails to share relevant material.',
        'Sometimes participates in group discussions and rarely contributes relevant material for the project.',
        'Takes part in group discussions and shares relevant information.',
        'Regularly participates in group discussion and sometimes exceeds expectations.',
        'Consistently exceeds group expectations for participation and consistently contributes relevant material to project.'
    ]
},{
    category: 'Leadership',
    categoryDescription:'Consider how the team member engages in leadership activities.',
    scaleDescription:[
        'Does not display leadership skills.',
        'Displays minimal leadership skills in team.',
        'Occasionally assumes leadership role.',
        'Regularly displays good leadership skills.',
        'Consistently demonstrates exemplary leadership skills.'
    ]
},{
    category: 'Overall Performance Rating',
    categoryDescription:'Consider the overall performance of the student team member while in the group.',
    scaleDescription:[
        'Performance significantly fails to meet group requirements.',
        'Performance fails to meet some group requirements.',
        'Performance meets all group requirements.',
        'Performance meets all group requirements consistently and sometimes exceeds requirements.',
        'Performance consistently exceeds all group requirements.'
    ]
}]

students = ['Student 1', 'Student 2', 'Student 3', 'Student 4']

function createCategoryDiv(category, description){
    let categoryDiv = document.createElement("div")
    categoryDiv.textContent = category + ": " + description
    categoryDiv.classList.add("category")
    return categoryDiv
}

function createScaleDescriptionDiv(scaleDescription, category){
    let rowDiv = document.createElement("div")
    rowDiv.classList.add("row", "row-header")
    let blankDiv = document.createElement("div")
    blankDiv.classList.add("blank", "border")
    let scaleDiv = document.createElement("div")
    scaleDiv.classList.add("scale-header")
    rowDiv.appendChild(blankDiv)
    rowDiv.appendChild(scaleDiv)
    scaleDescription.forEach((item, index) => {
        let descDiv = document.createElement("div")
        descDiv.classList.add("scale-title", "border")
        descDiv.innerText = index
        scaleDiv.appendChild(descDiv)
        descDiv.addEventListener("pointerover", function(e){
            tag = document.getElementById(category+index)
            let rect = this.getBoundingClientRect()
            tag.style.display = "block"
            tag.style.top = (rect.y + rect.height) + "px"
            tag.style.left = rect.x + "px"
            console.log(tag.innerText)
        })
        descDiv.addEventListener("pointerout", function(e){
            tag = document.getElementById(category+index)
            tag.style.display = "none"
        })
    })
    return rowDiv
}

function createStudentEvalDiv(studentName, category, numOfInputs){
    rowDiv = document.createElement("div")
    rowDiv.classList.add("row", "row-student")
    studentDiv = document.createElement("div")
    studentDiv.classList.add("student", "border")
    studentDiv.textContent = studentName
    scaleDiv = document.createElement("div")
    scaleDiv.classList.add("scale")
    rowDiv.appendChild(studentDiv)
    rowDiv.appendChild(scaleDiv)
    for(let count = 0; count < numOfInputs; count++){
        let inputDiv = document.createElement("div")
        inputDiv.classList.add("input", "border")
        inputDiv.innerHTML = `<input type="radio" name="${category}|${studentName}" value="${count}">`
        var prev = null
        inputDiv.addEventListener("click", function(e){
            if (prev !== null){
                prev.classList.remove("highlight")
            }
            prev = this
            this.classList.add("highlight")
            this.children[0].checked = true
        })
        scaleDiv.appendChild(inputDiv)
    }
    return rowDiv
}

function createRubric(){
    let rubricContent = document.getElementById("rubricContent")
    
    for(let categoryIndex=0; categoryIndex < rubric_data.length; categoryIndex++){
        let category = rubric_data[categoryIndex].category
        let categoryDescription = rubric_data[categoryIndex].categoryDescription
        let scaleDescription = rubric_data[categoryIndex].scaleDescription

        let categoryDiv = createCategoryDiv(category, categoryDescription)
        rubricContent.appendChild(categoryDiv)

        let scaleDescriptionDiv = createScaleDescriptionDiv(scaleDescription, category)
        rubricContent.appendChild(scaleDescriptionDiv)
        
        
        let count = scaleDescription.length
        
        students.forEach((item, index) => {
            let rowDiv = createStudentEvalDiv(item, category, count)
            rubricContent.appendChild(rowDiv)
        })

        scaleDescription.forEach((item, index) => {
            let descDiv = document.createElement("div")
            descDiv.classList.add("scale-description")
            descDiv.setAttribute("id",category+index)
            descDiv.innerText = item
            rubricContent.appendChild(descDiv)
        })
    }
    let divButton = document.createElement("div")
    divButton.setAttribute("id","submit")
    let submitButton = document.createElement("button");
    submitButton.textContent = "Submit"
    divButton.appendChild(submitButton)
    rubricContent.appendChild(divButton)
    divButton.addEventListener('click',function(e){
        e.preventDefault()
        tags = document.getElementsByTagName('input')
        formData = {}
        for(let item of tags){
            if (item.checked){
                formData[item.name] = item.value
            }
        }
        console.log(JSON.stringify(formData))
        try{
            const response = fetch('127.0.0.1:12000/eval', {
                method: "POST"
            })
        } catch (error){
            console.log(error)
        }
    })
}

createRubric()