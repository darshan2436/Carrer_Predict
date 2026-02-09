let answers = {
  "logicalQuotient": 7,              // from column 1
  "hackathons": {
    "participated": "yes",            // column 5
    "count": 3                         // if participated yes, count is random between 1–7
  },
  "codingSkills": 5,                  // column 3
  "publicSpeaking": 0,                // column 4
  "selfLearning": "yes",              // column 5
  "extraCourses": 2,                  // column 6: yes/no -> convert yes to 2, no to 0
  "certifications": 1,                // column 6
  "workshops": 3,                     // column 6 again or random small integer
  "readingWritingSkills": "excellent", // column 8 -> map to numeric: poor=3, medium=6, excellent=9
  "memoryCapability": "medium",        // column 9 -> map poor=3, medium=6, excellent=9
  "interestedSubjects": "programming", // column 10
  "interestedCareer": "testing",      // column 11
  "companyType": "BPA",               // column 12
  "inputsFromSeniors": "no",          // column 13 yes/no
  "bookType": "Series",               // column 14
  "managementOrTechnical": "Management", // column 15
  "workerType": "smart worker",       // column 16
  "teamWork": "yes",                  // column 17
  "personality": "yes"                 // column 18: convert "no" to Introvert, "yes" to Extrovert
}

const response = await fetch("http://localhost:5000/predict-career", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(answers)
});

const data = await response.json();

console.log(data)
