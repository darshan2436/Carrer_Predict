import React from "react";

export default function QuestionInput({ question, value, onChange }) {
  if (question.type === 'slider') {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center font-['Inter',_sans-serif]">
          <span className="text-sm text-stone-500">Not at all</span>
          <span className="text-3xl font-bold text-violet-600">{value || question.min}</span>
          <span className="text-sm text-stone-500">Expert level</span>
        </div>
        <input
          type="range"
          min={question.min}
          max={question.max}
          value={value || question.min}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-3 bg-stone-200 rounded-full appearance-none cursor-pointer slider"
          style={{
            background: value ? `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(value / question.max) * 100}%, #e7e5e4 ${(value / question.max) * 100}%, #e7e5e4 100%)` : undefined
          }}
        />
        <div className="flex justify-between text-xs text-stone-400 font-['Inter',_sans-serif]">
          {Array.from({ length: question.max + 1 }, (_, i) => (
            <span key={i}>{i}</span>
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
            className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 font-['Inter',_sans-serif] ${
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

  if (question.type === 'toggle-number') {
    return (
      <div className="space-y-6">
        <div className="flex gap-4">
          {['yes', 'no'].map(option => (
            <button
              key={option}
              onClick={() => onChange({ ...value, participated: option })}
              className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 font-['Inter',_sans-serif] ${
                value?.participated === option
                  ? 'bg-gradient-to-r from-violet-600 to-rose-600 text-white shadow-lg scale-105'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {option === 'yes' ? 'Yes' : 'No'}
            </button>
          ))}
        </div>
        
        {value?.participated === 'yes' && (
          <div className="animate-fadeIn">
            <label className="block text-sm font-medium text-stone-700 mb-2 font-['Inter',_sans-serif]">
              How many?
            </label>
            <input
              type="number"
              min="0"
              value={value?.count || ''}
              onChange={(e) => onChange({ ...value, count: parseInt(e.target.value) || 0 })}
              className="w-full px-6 py-4 border-2 border-stone-200 rounded-2xl focus:border-violet-500 focus:outline-none text-lg font-['Inter',_sans-serif]"
              placeholder="0"
            />
          </div>
        )}
      </div>
    );
  }

  if (question.type === 'number') {
    return (
      <input
        type="number"
        min="0"
        value={value || ''}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="w-full px-6 py-4 border-2 border-stone-200 rounded-2xl focus:border-violet-500 focus:outline-none text-lg font-['Inter',_sans-serif]"
        placeholder="0"
      />
    );
  }

  if (question.type === 'text') {
    return (
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-6 py-4 border-2 border-stone-200 rounded-2xl focus:border-violet-500 focus:outline-none text-lg font-['Inter',_sans-serif]"
        placeholder={question.placeholder || 'Type your answer...'}
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
            className={`py-4 px-6 rounded-2xl font-semibold transition-all duration-300 text-left font-['Inter',_sans-serif] ${
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

