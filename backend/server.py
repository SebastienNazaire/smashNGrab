import json
import os
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["CORS_ORIGINS"] = [
    "http://localhost:3000",  # Replace with the origin of your React app
]

# Load job data from JSON file
with open("jobs.json") as file:
    jobs = json.load(file)

# Define the path to the removed jobs JSON file
removed_jobs_file = "removed_jobs.json"

# Check if the removed jobs JSON file exists
if not os.path.exists(removed_jobs_file):
    # Create the removed jobs JSON file if it doesn't exist
    with open(removed_jobs_file, "w") as file:
        json.dump([], file)

# Load removed job data from the JSON file
with open(removed_jobs_file) as file:
    removed_jobs = json.load(file)


def filter_jobs(search_term):
    if search_term:
        search_term = search_term.lower()
        print(search_term)
        filtered_jobs = [
            {**job, "id": index}
            for index, job in enumerate(jobs)
            if search_term in job["job"].lower()
        ]
    else:
        filtered_jobs = []

    return filtered_jobs


@app.route("/api/jobs", methods=["GET"])
def get_jobs():
    search_term = request.args.get("search")
    filtered_jobs = filter_jobs(search_term)
    return jsonify(filtered_jobs)


@app.route("/api/jobs/<int:job_id>", methods=["DELETE"])
def remove_job(job_id):
    global jobs, removed_jobs

    # Find the job to remove by index (job_id)
    if 0 <= job_id < len(jobs):
        removed_job = jobs.pop(job_id)
        removed_jobs.append(removed_job)
    else:
        return jsonify({"message": "Invalid job ID"})

    # Save the updated jobs data to the JSON file
    with open("jobs.json", "w") as file:
        json.dump(jobs, file, indent=2)

    # Save the updated removed jobs data to the JSON file
    with open("removed_jobs.json", "w") as file:
        json.dump(removed_jobs, file, indent=2)

    return jsonify({"message": "Job removed successfully"})


@app.route("/api/jobs", methods=["POST"])
def add_job():
    global jobs

    job_data = request.json
    jobs.append(job_data)

    # Save the updated jobs data to the JSON file
    with open("jobs.json", "w") as file:
        json.dump(jobs, file, indent=2)

    return jsonify({"message": "Job added successfully"})


if __name__ == "__main__":
    app.run()
