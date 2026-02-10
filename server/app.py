from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

model = pickle.load(open("weights.pkl", "rb"))

# Helper mappings (updated to match your notebook encoding)
yes_no = {"yes": 1, "no": 0}
skill_map = {"poor": 0, "medium": 1, "excellent": 2}

# Categorical encodings from Excel data (exact mappings from cat.codes)
certifications_map = {
    'app development': 0,
    'distro making': 1,
    'full stack': 2,
    'hadoop': 3,
    'information security': 4,
    'machine learning': 5,
    'python': 6,
    'r programming': 7,
    'shell programming': 8
}

workshops_map = {
    'cloud computing': 0,
    'data science': 1,
    'database security': 2,
    'game development': 3,
    'hacking': 4,
    'system designing': 5,
    'testing': 6,
    'web technologies': 7
}

subject_map = {
    'Computer Architecture': 0,
    'IOT': 1,
    'Management': 2,
    'Software Engineering': 3,
    'cloud computing': 4,
    'data engineering': 5,
    'hacking': 6,
    'networks': 7,
    'parallel computing': 8,
    'programming': 9
}

career_map = {
    'Business process analyst': 0,
    'cloud computing': 1,
    'developer': 2,
    'security': 3,
    'system developer': 4,
    'testing': 5
}

company_map = {
    'BPA': 0,
    'Cloud Services': 1,
    'Finance': 2,
    'Product based': 3,
    'SAaS services': 4,
    'Sales and Marketing': 5,
    'Service Based': 6,
    'Testing and Maintainance Services': 7,
    'Web Services': 8,
    'product development': 9
}

book_map = {
    'Action and Adventure': 0,
    'Anthology': 1,
    'Art': 2,
    'Autobiographies': 3,
    'Biographies': 4,
    'Childrens': 5,
    'Comics': 6,
    'Cookbooks': 7,
    'Diaries': 8,
    'Dictionaries': 9,
    'Drama': 10,
    'Encyclopedias': 11,
    'Fantasy': 12,
    'Guide': 13,
    'Health': 14,
    'History': 15,
    'Horror': 16,
    'Journals': 17,
    'Math': 18,
    'Mystery': 19,
    'Poetry': 20,
    'Prayer books': 21,
    'Religion-Spirituality': 22,
    'Romance': 23,
    'Satire': 24,
    'Science': 25,
    'Science fiction': 26,
    'Self help': 27,
    'Series': 28,
    'Travel': 29,
    'Trilogy': 30
}

@app.route("/predict-career", methods=["POST"])
def predict():
    data = request.json
    print(data)

    # Build feature array matching new model input order:
    # 'Logical quotient rating', 'coding skills rating', 'hackathons', 'Extra-courses did',
    # 'B_hard worker', 'B_smart worker', 'A_Management', 'A_Technical', 
    # 'Interested subjects_code', 'Interested Type of Books_code', 'certifications_code',
    # 'workshops_code', 'Type of company want to settle in?_code', 'interested career area_code'
    
    hackathons = data.get("hackathons", {})
    
    # Handle workerType - can accept boolean or string
    worker_type = data.get("workerType", {})
    if isinstance(worker_type, dict):
        # Frontend sends: {"hardWorker": true/false, "smartWorker": true/false}
        hard_worker = 1 if worker_type.get("hardWorker") else 0
        smart_worker = 1 if worker_type.get("smartWorker") else 0
    else:
        # Frontend sends string: "hard worker" or "smart worker"
        hard_worker = 1 if worker_type == "hard worker" else 0
        smart_worker = 1 if worker_type == "smart worker" else 0
    
    # Handle managementOrTechnical - can accept boolean or string
    mgmt_tech = data.get("managementOrTechnical", {})
    if isinstance(mgmt_tech, dict):
        # Frontend sends: {"management": true/false, "technical": true/false}
        is_management = 1 if mgmt_tech.get("management") else 0
        is_technical = 1 if mgmt_tech.get("technical") else 0
    else:
        # Frontend sends string: "Management" or "Technical"
        is_management = 1 if mgmt_tech == "Management" else 0
        is_technical = 1 if mgmt_tech == "Technical" else 0
    
    features = [[
        data.get("logicalQuotient", 0),
        data.get("codingSkills", 0),
        hackathons.get("count", 0) if hackathons.get("participated") == "yes" else 0,
        data.get("extraCourses", 0),
        hard_worker,
        smart_worker,
        is_management,
        is_technical,
        subject_map.get(data.get("interestedSubjects"), 0),
        book_map.get(data.get("bookType"), 0),
        certifications_map.get(data.get("certifications"), 0),
        workshops_map.get(data.get("workshops"), 0),
        company_map.get(data.get("companyType"), 0),
        career_map.get(data.get("interestedCareer"), 0)
    ]]

    prediction = model.predict(features)[0]
    print(f"Prediction: {prediction}")
    print(f"Features: {features}")

    return jsonify({"suggestedJobRole": prediction})

if __name__ == "__main__":
    app.run(port=5000, debug=True)