let answers = {
        "logicalQuotient": 5,              
        "codingSkills": 5, 
        "hackathons": {
            "participated": "yes",            
            "count": 2                       
        },     
        "extraCourses": 2,
        "worketType":"hardWorker",
        "managementOrTechnical": "management",
        "interestedSubjects": "Software Engineering", 
        "bookType": "Art",               
        "certifications": "hadoop"    ,           
        "workshops":"hacking" ,              
        "companyType": "Finance", 
        "interestedCareer":"developer"
}

const response = await fetch("http://localhost:5000/predict-career", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(answers)
});

const data = await response.json();

console.log(data)
