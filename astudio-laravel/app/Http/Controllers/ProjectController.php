<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function create(Request $request)
    {

        $this->validate($request, [
            'name' => 'required',
            'department' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'status' => 'required',
        ]);

        $project = Project::create($request->all());

        return response()->json(['message' => 'Project created successfully', 'project' => $project], 201);
    }

    public function read($id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        return response()->json(['project' => $project], 200);
    }

    public function readAll()
    {
        $projects = Project::all();

        return response()->json(['projects' => $projects], 200);
    }

    public function update(Request $request, $id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $this->validate($request, [
            'name' => 'required',
            'department' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'status' => 'required',
        ]);

        $project->update($request->all());

        return response()->json(['message' => 'Project updated successfully', 'project' => $project], 200);
    }

    public function delete($id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $project->delete();

        return response()->json(['message' => 'Project deleted successfully'], 200);
    }
}