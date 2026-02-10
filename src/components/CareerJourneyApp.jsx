import React, { useState } from 'react';
import { Heart, Sparkles, TrendingUp, Award, MessageCircle, Compass, ArrowRight, Target } from 'lucide-react';

export default function CareerJourneyApp() {
  const [currentStage, setCurrentStage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showReflection, setShowReflection] = useState(false);
  const [finalResults, setFinalResults] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const stages = [
    {
      id: 'mind',
      title: 'The Mind',
      subtitle: 'Let\'s understand how you think and process',
      icon: Sparkles,
      color: 'from-violet-500 to-purple-600',
      questions: [
        {
          id: 'logicalQuotient',
          question: 'How would you rate your logical and analytical thinking?',
          subtitle: 'From following patterns to solving complex problems',
          type: 'slider',
          min: 1,
          max: 9
        },
        {
          id: 'codingSkills',
          question: 'How comfortable are you with coding and programming?',
          subtitle: 'Whether you build apps or just curious scripts',
          type: 'slider',
          min: 1,
          max: 9
        }
      ]
    },
    {
      id: 'growth',
      title: 'Growth & Exposure',
      subtitle: 'How you\'ve expanded beyond the classroom',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600',
      questions: [
        {
          id: 'hackathons',
          question: 'How many hackathons or coding competitions have you participated in?',
          subtitle: 'Enter a number from 0-10',
          type: 'number',
          min: 0,
          max: 10
        },
        {
          id: 'extraCourses',
          question: 'How many extra courses have you completed?',
          subtitle: 'Beyond your regular curriculum (0-10)',
          type: 'number',  // Changed from 'yesno'
          min: 0,
          max: 10
        },
        {
          id: 'certifications',
          question: 'Which area have you earned certifications in?',
          subtitle: 'Select the most relevant one',
          type: 'choice',
          options: ['None', 'app development', 'distro making', 'full stack', 'hadoop', 'information security', 'machine learning', 'python', 'r programming', 'shell programming']
        },
        {
          id: 'workshops',
          question: 'Which type of workshops have you attended?',
          subtitle: 'Select the most relevant one',
          type: 'choice',
          options: ['None', 'cloud computing', 'data science', 'database security', 'game development', 'hacking', 'system designing', 'testing', 'web technologies']
        }
      ]
    },
    {
      id: 'passion',
      title: 'Passion & Interests',
      subtitle: 'What makes you come alive',
      icon: Heart,
      color: 'from-amber-500 to-orange-600',
      questions: [
        {
          id: 'interestedSubjects',
          question: 'What subjects or topics fascinate you most?',
          subtitle: 'Choose the area that interests you the most',
          type: 'choice',
          options: ['Computer Architecture', 'IOT', 'Management', 'Software Engineering', 'cloud computing', 'data engineering', 'hacking', 'networks', 'parallel computing', 'programming']
        },
        {
          id: 'interestedCareer',
          question: 'What career areas excite you?',
          subtitle: 'Your dream career path',
          type: 'choice',
          options: ['Business process analyst', 'cloud computing', 'developer', 'security', 'system developer', 'testing']
        },
        {
          id: 'bookType',
          question: 'What type of books do you gravitate toward?',
          type: 'choice',
          options: ['Action and Adventure', 'Anthology', 'Art', 'Autobiographies', 'Biographies', 'Childrens', 'Comics', 'Cookbooks', 'Diaries', 'Dictionaries', 'Drama', 'Encyclopedias', 'Fantasy', 'Guide', 'Health', 'History', 'Horror', 'Journals', 'Math', 'Mystery', 'Poetry', 'Prayer books', 'Religion-Spirituality', 'Romance', 'Satire', 'Science', 'Science fiction', 'Self help', 'Series', 'Travel', 'Trilogy']
        }
      ]
    },
    {
      id: 'vision',
      title: 'Vision & Work Environment',
      subtitle: 'Where you see yourself thriving',
      icon: Compass,
      color: 'from-blue-500 to-indigo-600',
      questions: [
        {
          id: 'companyType',
          question: 'What type of organization do you see yourself in?',
          type: 'choice',
          options: ['BPA', 'Cloud Services', 'Finance', 'Product based', 'SAaS services', 'Sales and Marketing', 'Service Based', 'Testing and Maintainance Services', 'Web Services', 'product development']
        },
        {
          id: 'managementOrTechnical',
          question: 'Do you see yourself in a technical role or management?',
          type: 'choice',
          options: ['Technical', 'Management']
        },
        {
          id: 'workerType',
          question: 'How would you describe your work approach?',
          type: 'choice',
          options: ['hard worker', 'smart worker']
        }
      ]
    }
  ];

  const updateAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const getStageProgress = () => {
    if (currentStage >= stages.length) return 100;
    const stage = stages[currentStage];
    const answeredInStage = stage.questions.filter(q => answers[q.id] !== undefined).length;
    return (answeredInStage / stage.questions.length) * 100;
  };

  const getTotalProgress = () => {
    const totalQuestions = stages.reduce((sum, stage) => sum + stage.questions.length, 0);
    const answeredQuestions = Object.keys(answers).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const handleNext = async () => {
    setShowReflection(true);
    setIsAnimating(true);
    
    setTimeout(() => {
      setShowReflection(false);
      if (currentStage < stages.length - 1) {
        setCurrentStage(prev => prev + 1);
        setIsAnimating(false);
      } else {
        generateResults();
      }
    }, 3000);
  };

  const isStageComplete = () => {
    if (currentStage >= stages.length) return false;
    const stage = stages[currentStage];
    const answeredInStage = stage.questions.filter(q => answers[q.id] !== undefined).length;
    return answeredInStage === stage.questions.length;
  };

  const transformAnswersForAPI = () => {
    // Transform to match backend's exact expected format
    return {
      logicalQuotient: answers.logicalQuotient || 1,
      
      codingSkills: answers.codingSkills || 1,
      
      hackathons: {
        participated: answers.hackathons > 0 ? 'yes' : 'no',
        count: answers.hackathons || 0
      },
      
      extraCourses: answers.extraCourses || 0, 
      
      workerType: answers.workerType || 'smart worker',
      
      managementOrTechnical: answers.managementOrTechnical || 'Technical',
      
      interestedSubjects: answers.interestedSubjects || 'programming',
      
      bookType: answers.bookType || 'Series',
      
      certifications: answers.certifications && answers.certifications !== 'None' 
        ? answers.certifications 
        : 'python',
      
      workshops: answers.workshops && answers.workshops !== 'None'
        ? answers.workshops
        : 'testing',
      
      companyType: answers.companyType || 'BPA',
      
      interestedCareer: answers.interestedCareer || 'developer'
    };
  };

  const generateResults = async () => {
    const transformedAnswers = transformAnswersForAPI();
    
    console.log('Sending to API:', transformedAnswers);
    
    try {
      const response = await fetch('http://localhost:5000/predict-career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transformedAnswers)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log('API Response:', data);
      
      // Extract the predicted job role from API response
      const predictedJob = data.suggestedJobRole || data.predicted_role || data['Suggested Job Role'] || 'Software Developer';
      
      setFinalResults({
        suggestedJobRole: predictedJob,
        apiPrediction: predictedJob, // Store the exact API prediction
        personalitySummary: generatePersonalitySummary(),
        skillsToImprove: generateSkillsToImprove(),
        careerRoles: generateCareerRoles(predictedJob),
        motivation: generateMotivation()
      });
      
      setCurrentStage(stages.length);
    } catch (error) {
      console.error('API Error:', error);
      
      // Fallback if API fails
      setFinalResults({
        suggestedJobRole: generateCareerRoles()[0],
        apiPrediction: null,
        personalitySummary: generatePersonalitySummary(),
        skillsToImprove: generateSkillsToImprove(),
        careerRoles: generateCareerRoles(),
        motivation: generateMotivation(),
        error: 'Unable to connect to prediction service. Showing general recommendations.'
      });
      
      setCurrentStage(stages.length);
    }
  };

  const generatePersonalitySummary = () => {
    const lines = [];
    const techScore = (answers.codingSkills || 0) + (answers.logicalQuotient || 0);
    
    if (techScore >= 14) {
      lines.push("You have a natural affinity for technology and systematic thinking.");
    } else if (techScore >= 8) {
      lines.push("You balance technical understanding with creative problem-solving.");
    } else {
      lines.push("Your strengths lie beyond pure technical skills—and that's exactly what the world needs.");
    }
    
    if (answers.hackathons > 0) {
      lines.push("You're a self-directed learner who thrives on autonomy and curiosity.");
    }
    
    lines.push("The path ahead is yours to shape, and you have everything you need to succeed.");
    
    return lines.join(' ');
  };

  const generateSkillsToImprove = () => {
    const suggestions = [];
    
    if ((answers.codingSkills || 0) < 6) {
      suggestions.push({ skill: 'Programming & Development', reason: 'Building technical skills opens countless doors' });
    }
    if ((answers.logicalQuotient || 0) < 6) {
      suggestions.push({ skill: 'Analytical Thinking', reason: 'Structured problem-solving is universally valuable' });
    }
    if (answers.hackathons === 0 || !answers.hackathons) {
      suggestions.push({ skill: 'Practical Experience', reason: 'Hands-on projects and competitions accelerate learning' });
    }
    if (answers.extraCourses === 'no') {
      suggestions.push({ skill: 'Continuous Learning', reason: 'Extra courses expand your knowledge and opportunities' });
    }
    
    return suggestions.slice(0, 3);
  };

  const generateCareerRoles = (predictedJob = null) => {
    // If we have a predicted job, generate related roles
    if (predictedJob) {
      const roleMapping = {
        'Software Developer': ['Full Stack Developer', 'Backend Developer', 'Frontend Developer'],
        'Web Developer': ['Full Stack Developer', 'Frontend Developer', 'UI Developer'],
        'Database Developer': ['Data Engineer', 'Database Administrator', 'Backend Developer'],
        'Applications Developer': ['Mobile Developer', 'Software Engineer', 'Full Stack Developer'],
        'Software Engineer': ['Senior Software Engineer', 'Tech Lead', 'Software Architect'],
        'Testing': ['QA Engineer', 'Test Automation Engineer', 'Quality Assurance Lead'],
        'Developer': ['Software Developer', 'Full Stack Developer', 'Applications Developer'],
        'Security': ['Security Analyst', 'Cybersecurity Engineer', 'Security Consultant'],
        'Business process analyst': ['Business Analyst', 'Process Improvement Specialist', 'Data Analyst'],
        'System developer': ['Systems Engineer', 'DevOps Engineer', 'Infrastructure Developer'],
        'Cloud computing': ['Cloud Engineer', 'DevOps Engineer', 'Cloud Architect']
      };
      
      return roleMapping[predictedJob] || ['Software Developer', 'Web Developer'];
    }
    
    // Fallback roles
    return ['Software Developer', 'Web Developer'];
  };

  const generateMotivation = () => {
    const motivations = [
      "Your journey is just beginning. Every skill you build brings you closer to the person you're becoming.",
      "The world needs what you're building inside yourself. Your unique combination of skills will create something special.",
      "Don't compare your chapter 1 to someone else's chapter 20. You're exactly where you need to be.",
      "Success isn't about being the best. It's about being authentic, persistent, and willing to grow.",
      "Your potential isn't a destination—it's a direction. Keep moving forward, and trust the process."
    ];
    
    return motivations[Math.floor(Math.random() * motivations.length)];
  };

  const stage = currentStage < stages.length ? stages[currentStage] : null;

  if (currentStage >= stages.length && finalResults) {
    return <FinalResults results={finalResults} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-neutral-100">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-stone-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500 transition-all duration-700"
          style={{ width: `${getTotalProgress()}%` }}
        />
      </div>

      {/* Header */}
      <header className="pt-12 pb-8 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-stone-200">
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-stone-700">AI Career Mentor</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 leading-tight">
            Your Journey to <br />
            <span className="bg-gradient-to-r from-violet-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
              Self-Discovery
            </span>
          </h1>
          <p className="text-lg text-stone-600 max-w-xl mx-auto">
            I'm here to help you understand yourself better and guide you toward a career that truly fits who you are.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 pb-20">
        {!showReflection && stage && (
          <div className="space-y-8">
            {/* Stage Header */}
            <div className={`bg-gradient-to-r ${stage.color} rounded-3xl p-8 text-white shadow-2xl`}>
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <stage.icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium opacity-90 mb-1">
                    Stage {currentStage + 1} of {stages.length}
                  </div>
                  <h2 className="text-3xl font-bold">{stage.title}</h2>
                </div>
              </div>
              <p className="text-white/90 text-lg">{stage.subtitle}</p>
              
              <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-500"
                  style={{ width: `${getStageProgress()}%` }}
                />
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              {stage.questions.map((question, idx) => (
                <div 
                  key={question.id}
                  className={`bg-white rounded-3xl p-8 shadow-xl border border-stone-200 transition-all duration-500 ${
                    answers[question.id] !== undefined ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-violet-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-stone-900 mb-2">
                          {question.question}
                        </h3>
                        {question.subtitle && (
                          <p className="text-stone-600">{question.subtitle}</p>
                        )}
                      </div>
                    </div>

                    <QuestionInput 
                      question={question} 
                      value={answers[question.id]} 
                      onChange={(val) => updateAnswer(question.id, val)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            {isStageComplete() && (
              <div className="sticky bottom-6 pt-8">
                <button
                  onClick={handleNext}
                  disabled={isAnimating}
                  className="w-full bg-gradient-to-r from-violet-600 via-rose-600 to-amber-600 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl"
                >
                  {currentStage < stages.length - 1 ? (
                    <>Continue to Next Stage <ArrowRight className="w-6 h-6" /></>
                  ) : (
                    <>See My Results <Sparkles className="w-6 h-6" /></>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Reflection Screen */}
        {showReflection && (
          <ReflectionScreen currentStage={currentStage} totalStages={stages.length} />
        )}
      </main>
    </div>
  );
}

function QuestionInput({ question, value, onChange }) {
  if (question.type === 'slider') {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-stone-500">Low</span>
          <span className="text-3xl font-bold text-violet-600">{value || question.min}</span>
          <span className="text-sm text-stone-500">High</span>
        </div>
        <input
          type="range"
          min={question.min}
          max={question.max}
          value={value || question.min}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-3 bg-stone-200 rounded-full appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-stone-400">
          {Array.from({ length: question.max - question.min + 1 }, (_, i) => (
            <span key={i}>{i + question.min}</span>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === 'yesno') {
    return (
      <div className="flex gap-4">
        {['yes', 'no'].map(option => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
              value === option
                ? 'bg-gradient-to-r from-violet-600 to-rose-600 text-white shadow-lg scale-105'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {option === 'yes' ? 'Yes' : 'No'}
          </button>
        ))}
      </div>
    );
  }

  if (question.type === 'number') {
    return (
      <input
        type="number"
        min={question.min || 0}
        max={question.max || 100}
        value={value || ''}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="w-full px-6 py-4 border-2 border-stone-200 rounded-2xl focus:border-violet-500 focus:outline-none text-lg"
        placeholder="0"
      />
    );
  }

  if (question.type === 'choice') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map(option => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`py-4 px-6 rounded-2xl font-semibold transition-all duration-300 text-left ${
              value === option
                ? 'bg-gradient-to-r from-violet-600 to-rose-600 text-white shadow-lg scale-105'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }

  return null;
}

function ReflectionScreen({ currentStage, totalStages }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900/95 via-stone-900/95 to-neutral-900/95 backdrop-blur-md flex items-center justify-center z-40">
      <div className="max-w-3xl mx-6 text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500 rounded-full blur-3xl opacity-40"></div>
          <div className="relative w-24 h-24 bg-gradient-to-br from-violet-400 via-rose-400 to-amber-400 rounded-full mx-auto flex items-center justify-center shadow-2xl">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            I see something <br />
            <span className="bg-gradient-to-r from-violet-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
              special in you
            </span>
          </h3>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto"></div>
        </div>

        <p className="text-2xl md:text-3xl text-stone-200 leading-relaxed max-w-2xl mx-auto font-light">
          {currentStage < totalStages - 1 ? 'Preparing your next stage...' : 'Analyzing your journey...'}
        </p>

        <div className="flex gap-2 justify-center pt-4">
          {Array.from({ length: totalStages }, (_, idx) => (
            <div 
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx <= currentStage ? 'w-12 bg-gradient-to-r from-violet-400 to-rose-400' : 'w-8 bg-stone-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FinalResults({ results }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-neutral-100 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-6 py-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500 rounded-full mb-6">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 leading-tight">
            Your Journey <br />
            <span className="bg-gradient-to-r from-violet-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
              Revealed
            </span>
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            I've learned so much about you. Here's what I see.
          </p>
        </div>

        {/* Error message if API failed */}
        {results.error && (
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 text-center">
            <p className="text-amber-800 font-medium">{results.error}</p>
          </div>
        )}

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-stone-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-violet-100 rounded-2xl">
              <Heart className="w-6 h-6 text-violet-600" />
            </div>
            <h2 className="text-3xl font-bold text-stone-900">Who You Are</h2>
          </div>
          <p className="text-xl text-stone-700 leading-relaxed">
            {results.personalitySummary}
          </p>
        </div>

        <div className="bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500 rounded-3xl p-1 shadow-xl">
          <div className="bg-white rounded-[23px] p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-amber-100 rounded-2xl">
                <Target className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-3xl font-bold text-stone-900">Your Path Forward</h2>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-stone-600 mb-2">
                  {results.apiPrediction ? 'AI-POWERED RECOMMENDATION' : 'PRIMARY RECOMMENDATION'}
                </p>
                <p className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
                  {results.suggestedJobRole}
                </p>
                {results.apiPrediction && (
                  <p className="text-sm text-stone-500 mt-2">
                    ✨ Based on AI analysis of your unique profile
                  </p>
                )}
              </div>
              
              <div className="pt-6 border-t border-stone-200">
                <p className="text-sm font-medium text-stone-600 mb-4">OTHER STRONG MATCHES</p>
                <div className="flex flex-wrap gap-3">
                  {results.careerRoles.map((role, idx) => (
                    <div key={idx} className="px-4 py-2 bg-stone-100 rounded-full text-stone-800 font-medium">
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-stone-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-rose-100 rounded-2xl">
              <TrendingUp className="w-6 h-6 text-rose-600" />
            </div>
            <h2 className="text-3xl font-bold text-stone-900">Areas to Strengthen</h2>
          </div>
          <div className="space-y-4">
            {results.skillsToImprove.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-5 bg-stone-50 rounded-2xl">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-violet-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-stone-900 mb-1">{item.skill}</h3>
                  <p className="text-stone-600">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-violet-600 via-rose-600 to-amber-600 rounded-3xl p-8 md:p-12 text-white shadow-xl text-center">
          <Award className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <p className="text-2xl md:text-3xl font-bold leading-relaxed mb-6">
            {results.motivation}
          </p>
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
            <Heart className="w-4 h-4" />
            <span>Keep building. Keep growing. Keep believing.</span>
          </div>
        </div>

        <div className="text-center pt-8 pb-12">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-full font-semibold hover:bg-stone-800 transition-colors shadow-lg"
          >
            Start a New Journey
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}