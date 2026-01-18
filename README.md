# 🌿 AI-Powered Tea Leaf Disease Detection System

![Python](https://img.shields.io/badge/Python-3.10%2B-blue)
![React](https://img.shields.io/badge/React-Vite-61DAFB)
![YOLOv8](https://img.shields.io/badge/YOLOv8-Object%20Detection-orange)
![Flask](https://img.shields.io/badge/Flask-Backend-green)

A machine learning-based web application designed to detect tea leaf diseases and provide actionable fertilizer/remedy recommendations in both **Sinhala** and **English**. This project aims to help tea planters identify diseases early and treat them effectively using both organic and chemical methods.

## 🚀 Features

* **Real-time Disease Detection:** Identifies diseases like Blister Blight, Red Rust, Gray Blight, Brown Blight, and Healthy leaves.
* **High Accuracy:** Powered by the **YOLOv8** object detection model trained on a dataset of 1,494 images.
* **Intelligent Recommendations:** Provides specific treatments based on the detected disease.
    * 🌱 **Organic Remedies** (Home-made/Natural solutions)
    * 🧪 **Chemical Solutions** (Fungicides/Fertilizers)
* **Bilingual Support:** Advice is displayed in both **Sinhala** and **English**.
* **Responsive UI:** User-friendly interface built with **React** and **Tailwind CSS**.

## 🛠️ Tech Stack

### Machine Learning & Data
* **Model:** [YOLOv8](https://github.com/ultralytics/ultralytics) (Nano version for speed)
* **Training Platform:** Google Colab (T4 GPU)
* **Dataset Tool:** Roboflow (Annotation & Augmentation)
* **Preprocessing:** Auto-orientation, Resizing (640x640), Augmentation (Flip, Rotation, Brightness, Noise).

### Backend
* **Framework:** Flask (Python)
* **Libraries:** `ultralytics`, `flask-cors`, `pillow`
* **Functionality:** Loads the custom trained `.pt` model and serves predictions via a REST API.

### Frontend
* **Framework:** React.js (via Vite)
* **Styling:** Tailwind CSS
* **Functionality:** Image upload, preview, and displaying structured advice.

## 📂 Project Structure

```bash
Tea-Leaf-Disease-Predictor/
├── backend/
│   ├── app.py              # Flask API Server
│   ├── best.pt             # Trained YOLOv8 Model
│   ├── requirements.txt    # Python Dependencies
│   └── ...
├── frontend/
│   ├── src/                # React Source Code
│   ├── public/
│   ├── tailwind.config.js
│   └── ...
└── README.md
