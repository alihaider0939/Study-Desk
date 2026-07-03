import random
import time

# 1. Initialize State Metrics
metrics = {
    "focus_time": 0,
    "distraction_time": 0,
    "streak": 0.0,
    "focus_score": 100,
    "posture_score": 100,
    "productivity_score": 100
}

def evaluate_telemetry_step():
    """Simulates a single telemetry check from the AI model (runs every few seconds)"""
    global metrics
    
    # AI classifications mapping array
    states = ["Focusing", "Looking Away", "Slouching"]
    current_state = random.choice(states)
    
    print(f"\n[AI State Detected: {current_state}]")

    if current_state == "Focusing":
        metrics["focus_time"] += 3
        metrics["streak"] += 0.05
        # Reward positive behavior up to a cap of 100
        metrics["focus_score"] = min(100, metrics["focus_score"] + 1)
        metrics["posture_score"] = min(100, metrics["posture_score"] + 1)
        
    elif current_state == "Looking Away":
        metrics["distraction_time"] += 3
        metrics["streak"] = 0.0  # Break focus streak
        # Penalize focus loss down to a floor of 0
        metrics["focus_score"] = max(0, metrics["focus_score"] - 4)
        print("LOG ALERT: Gaze drifted away from screen.")
        
    elif current_state == "Slouching":
        metrics["focus_time"] += 3  # Still working, but poorly positioned
        metrics["posture_score"] = max(0, metrics["posture_score"] - 5)
        print("LOG ALERT: Poor posture ergonomics detected.")

    # 2. Compute Weighted Composite Scores
    # Focus accounts for 70% of total productivty index, Posture accounts for 30%
    metrics["productivity_score"] = int((metrics["focus_score"] * 0.7) + (metrics["posture_score"] * 0.3))

    # 3. Output updated dataset snapshot
    print(f"-> Focus Score: {metrics['focus_score']}% | Posture Score: {metrics['posture_score']}%")
    print(f"-> Productivity Index: {metrics['productivity_score']}%")

# Run 5 simulated logic steps to observe the metric updates
for _ in range(5):
    evaluate_telemetry_step()
    time.sleep(1)