import { useState } from 'react';
import './App.css';

export default function MoodTaskApp() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const moods = [
    { name: "Tired", emoji: "😴", color: "#f9e076", tasks: ["Breathing Exercise", "Stretch"] },
    { name: "Stressed", emoji: "😔", color: "#f9e076", tasks: ["Breathing Exercise", "Worry Shredder", "Soundscape"] },
    { name: "Bored", emoji: "😐", color: "#f9e076", tasks: ["Doodle", "Dance", "Color Focus"] },
    { name: "Excited", emoji: "😃", color: "#f9e076", tasks: ["Dance", "Gratitude Note"] },
    { name: "Sad", emoji: "😢", color: "#f9e076", tasks: ["Gratitude Note", "Punching Bag", "Soundscape"] },
    { name: "Angry", emoji: "😠", color: "#f55e5e", tasks: ["Punching Bag", "Worry Shredder", "Breathing Exercise"] },
    { name: "Happy", emoji: "😊", color: "#f9e076", tasks: ["Gratitude Note", "Dance", "Color Focus"] },
    { name: "Confused", emoji: "🤔", color: "#4caf50", tasks: ["Breathing Exercise", "Doodle", "Worry Shredder"] },
  ];

  const allTasks = [
    { name: "Breathing Exercise", icon: "🌬️", color: "#3498db", description: "Slow, deep breathing reduces stress hormones and helps clear your mind." },
    { name: "Gratitude Note", icon: "❤️", color: "#9b59b6", description: "Writing down things you're thankful for shifts focus from negative to positive thoughts." },
    { name: "Soundscape", icon: "🔊", color: "#1abc9c", description: "Calming sounds can lower blood pressure and heart rate, helping you relax." },
    { name: "Punching Bag", icon: "✊", color: "#e74c3c", description: "Physical release through safe actions helps process intense emotions like anger." },
    { name: "Stretch", icon: "🧍", color: "#f39c12", description: "Gentle stretching reduces muscle tension and promotes relaxation." },
    { name: "Doodle", icon: "✏️", color: "#95a5a6", description: "Free-form drawing requires minimal focus and allows your mind to reset." },
    { name: "Dance", icon: "🎵", color: "#e67e22", description: "Movement releases endorphins, improving mood and energy levels quickly." },
    { name: "Worry Shredder", icon: "✂️", color: "#34495e", description: "Naming then mentally discarding worries creates emotional distance from them." },
    { name: "Color Focus", icon: "🎨", color: "#2ecc71", description: "Concentrating on colors redirects attention from stressful thoughts." },
    { name: "Gentle Flow", icon: "🌊", color: "#3498db", description: "Simple, flowing movements help release tension and improve mindfulness." },
    { name: "Sensory Garden", icon: "🌱", color: "#27ae60", description: "Engaging your senses with plants and textures grounds you in the present moment." },
    { name: "Bubble Pop", icon: "🫧", color: "#9b59b6", description: "Popping virtual bubbles provides a soothing, repetitive action that calms the mind." },
    { name: "Light Shift", icon: "💡", color: "#f1c40f", description: "Watching changing colors helps regulate your nervous system and mood." },
    { name: "Melody Maker", icon: "🎹", color: "#e74c3c", description: "Creating simple tunes engages your creative brain, shifting focus away from stress." },
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setShowExplanation(true);
  };

  const isTaskRecommended = (taskName) => {
    if (!selectedMood) return false;
    const mood = moods.find((m) => m.name === selectedMood);
    return mood ? mood.tasks.includes(taskName) : false;
  };

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">How are you feeling right now?</h1>

      {/* Mood Selection Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 w-full">
        {moods.map((mood) => (
          <button
            key={mood.name}
            className="flex items-center justify-center p-3 rounded-md border transition-colors hover:bg-gray-100"
            style={{
              backgroundColor: selectedMood === mood.name ? `${mood.color}33` : 'white',
              borderColor: selectedMood === mood.name ? mood.color : '#e5e7eb',
            }}
            onClick={() => handleMoodSelect(mood.name)}
          >
            <span className="mr-2 text-xl">{mood.emoji}</span>
            <span className="font-medium">{mood.name}</span>
          </button>
        ))}
      </div>

      {/* Explanation Bubble */}
      {showExplanation && selectedMood && (
        <div className="w-full mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-start">
            <div className="mr-3 text-2xl">{moods.find((m) => m.name === selectedMood)?.emoji}</div>
            <div>
              <h2 className="font-semibold text-lg">{selectedMood}</h2>
              <p className="text-gray-600">
                {selectedMood === "Tired"
                  ? "Take some time to recharge with these activities."
                  : selected
