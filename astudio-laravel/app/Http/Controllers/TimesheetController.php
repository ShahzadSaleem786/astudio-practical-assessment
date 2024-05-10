<?php

namespace App\Http\Controllers;

use App\Models\Timesheet;
use Illuminate\Http\Request;

class TimesheetController extends Controller
{
    public function create(Request $request)
    {

        $this->validate($request, [
            'task_name' => 'required',
            'date' => 'required|date',
            'hours' => 'required|numeric',
            'user_id' => 'required|exists:users,id',
            'project_id' => 'required|exists:projects,id',
        ]);

        $timesheet = Timesheet::create($request->all());

        return response()->json(['message' => 'Timesheet created successfully', 'timesheet' => $timesheet], 201);
    }

    public function read($id)
    {
        $timesheet = Timesheet::find($id);
        if (!$timesheet) {
            return response()->json(['message' => 'Timesheet not found'], 404);
        }

        return response()->json(['timesheet' => $timesheet], 200);
    }

    public function readAll()
    {
        $timesheets = Timesheet::all();

        return response()->json(['timesheets' => $timesheets], 200);
    }

    public function update(Request $request, $id)
    {
        $timesheet = Timesheet::find($id);
        if (!$timesheet) {
            return response()->json(['message' => 'Timesheet not found'], 404);
        }

        $this->validate($request, [
            'task_name' => 'required',
            'date' => 'required|date',
            'hours' => 'required|numeric',
            'user_id' => 'required|exists:users,id',
            'project_id' => 'required|exists:projects,id',
        ]);

        $timesheet->update($validatedData);

        return response()->json(['message' => 'Timesheet updated successfully', 'timesheet' => $timesheet], 200);
    }

    public function delete($id)
    {
        $timesheet = Timesheet::find($id);
        if (!$timesheet) {
            return response()->json(['message' => 'Timesheet not found'], 404);
        }

        $timesheet->delete();

        return response()->json(['message' => 'Timesheet deleted successfully'], 200);
    }
}