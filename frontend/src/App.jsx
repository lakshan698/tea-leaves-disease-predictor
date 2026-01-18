import { useState } from 'react';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // පින්තූරය තෝරාගත් විට
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file)); // Preview එක පෙන්වීමට
      setResult(null); // පරණ result එක අයින් කරන්න
    }
  };

  // Backend එකට යැවීම (Predict)
  const handlePredict = async () => {
    if (!selectedImage) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      // Flask Backend එකේ URL එක මෙතනට දෙන්න
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error predicting:", error);
      alert("Error connecting to backend!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-10 font-sans">
      
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-green-800 mb-2">🌿 Tea Leaf Disease Predictor</h1>
      <p className="text-gray-600 mb-8 ml-2 mr-2 p-1">Upload a tea leaf image to detect diseases & get remedies.</p>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-green-100">
        
        {/* Image Upload Area */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-green-300 rounded-xl p-6 bg-green-50 hover:bg-green-100 transition cursor-pointer relative">
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {preview ? (
            <img src={preview} alt="Preview" className="h-64 object-contain rounded-lg shadow-md" />
          ) : (
            <div className="text-center text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="font-semibold">Click to upload an image</p>
            </div>
          )}
        </div>

        {/* Analyze Button */}
        {selectedImage && (
          <button 
            onClick={handlePredict} 
            disabled={loading}
            className={`w-full mt-6 py-3 rounded-xl text-white font-bold text-lg transition shadow-md ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? 'Analyzing...' : '🔍 Analyze Leaf'}
          </button>
        )}

        {/* Results Section */}
        {result && (
          <div className="mt-8 animate-fade-in">
            {/* Status Header */}
            <div className={`p-4 rounded-xl text-center mb-6 border ${
              result.disease_name === 'healthy' 
                ? 'bg-green-100 border-green-300 text-green-800' 
                : 'bg-red-100 border-red-300 text-red-800'
            }`}>
              <h2 className="text-2xl font-extrabold uppercase tracking-wider">{result.disease_name}</h2>
              <p className="text-sm opacity-80 mt-1">Confidence: {result.confidence}%</p>
            </div>

            {/* General Advice */}
            <div className="mb-6">
              <h3 className="text-gray-700 font-bold mb-2 flex items-center">
                 📋 Diagnosis & Advice
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-lg text-gray-800 font-medium mb-1">{result.sinhala_advice}</p>
                <p className="text-sm text-gray-500 italic">{result.english_advice}</p>
              </div>
            </div>

            {/* Remedies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Organic Option */}
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h4 className="text-green-800 font-bold flex items-center mb-2">
                  🌱 Organic Remedy
                </h4>
                <p className="text-green-700 text-sm">{result.organic_remedy}</p>
              </div>

              {/* Chemical Option */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h4 className="text-blue-800 font-bold flex items-center mb-2">
                  🧪 Chemical Solution
                </h4>
                <p className="text-blue-700 text-sm">{result.chemical_remedy}</p>
              </div>
            </div>

          </div>
        )}

      </div>
      
      {/* Footer */}
      <p className="mt-10 text-gray-400 text-sm">© 2026 Tea Research Project</p>
    </div>
  );
}

export default App;