import React from "react";
import { Sparkles, Heart, Target, TrendingUp, Award, ArrowRight } from "lucide-react";

export default function FinalResults({ results, answers }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-neutral-100 font-['Newsreader',_Georgia,_serif] py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500 rounded-full mb-6 animate-scaleIn">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 leading-tight">
            Your Journey <br />
            <span className="bg-gradient-to-r from-violet-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
              Revealed
            </span>
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto font-['Inter',_sans-serif]">
            I've learned so much about you. Here's what I see.
          </p>
        </div>

        {/* Personality Summary */}
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

        {/* Suggested Career */}
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
                <p className="text-sm font-medium text-stone-600 mb-2 font-['Inter',_sans-serif]">PRIMARY RECOMMENDATION</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
                  {results.suggestedJobRole}
                </p>
              </div>
              
              <div className="pt-6 border-t border-stone-200">
                <p className="text-sm font-medium text-stone-600 mb-4 font-['Inter',_sans-serif]">OTHER STRONG MATCHES</p>
                <div className="flex flex-wrap gap-3">
                  {results.careerRoles.map((role, idx) => (
                    <div key={idx} className="px-4 py-2 bg-stone-100 rounded-full text-stone-800 font-medium font-['Inter',_sans-serif]">
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills to Improve */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-stone-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-rose-100 rounded-2xl">
              <TrendingUp className="w-6 h-6 text-rose-600" />
            </div>
            <h2 className="text-3xl font-bold text-stone-900">Areas to Strengthen</h2>
          </div>
          <div className="space-y-4">
            {results.skillsToImprove.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-5 bg-stone-50 rounded-2xl hover:bg-stone-100 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-violet-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold font-['Inter',_sans-serif]">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-stone-900 mb-1">{item.skill}</h3>
                  <p className="text-stone-600 font-['Inter',_sans-serif]">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivation */}
        <div className="bg-gradient-to-r from-violet-600 via-rose-600 to-amber-600 rounded-3xl p-8 md:p-12 text-white shadow-xl text-center">
          <Award className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <p className="text-2xl md:text-3xl font-bold leading-relaxed mb-6">
            {results.motivation}
          </p>
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm font-['Inter',_sans-serif]">
            <Heart className="w-4 h-4" />
            <span>Keep building. Keep growing. Keep believing.</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 pb-12">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-full font-semibold hover:bg-stone-800 transition-colors shadow-lg font-['Inter',_sans-serif]"
          >
            Start a New Journey
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}