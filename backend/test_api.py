"""
Script rápido para verificar que la API funciona
Ejecutar: python test_api.py
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_api():
    print("🧪 Probando API...")
    print()
    
    # Test 1: Health check
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"✓ Health check: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"✗ Health check falló: {e}")
        print("⚠️  Asegúrate de que el backend esté corriendo: python main.py")
        return
    
    # Test 2: Root
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"✓ Root endpoint: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"✗ Root endpoint falló: {e}")
    
    # Test 3: Get experiences
    try:
        response = requests.get(f"{BASE_URL}/api/experiences")
        print(f"✓ GET /api/experiences: {response.status_code}")
        experiences = response.json()
        print(f"  Encontradas {len(experiences)} experiencias")
    except Exception as e:
        print(f"✗ GET /api/experiences falló: {e}")
    
    # Test 4: Create experience
    try:
        test_experience = {
            "name": "Test Experience",
            "description": "Esta es una experiencia de prueba",
            "price": 99.99,
            "includes": "Test includes",
            "is_active": True
        }
        response = requests.post(
            f"{BASE_URL}/api/experiences",
            json=test_experience,
            headers={"Content-Type": "application/json"}
        )
        print(f"✓ POST /api/experiences: {response.status_code}")
        if response.status_code == 200:
            created = response.json()
            print(f"  Creada experiencia ID: {created.get('id')}")
    except Exception as e:
        print(f"✗ POST /api/experiences falló: {e}")
    
    print()
    print("✅ Tests completados")

if __name__ == "__main__":
    test_api()

