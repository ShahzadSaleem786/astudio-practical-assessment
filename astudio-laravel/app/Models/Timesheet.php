<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Timesheet extends Model
{
    protected $fillable = [
        'task_name', 'date', 'hours',
    ];

    /**
     * Get the user who logged the timesheet.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the project associated with the timesheet.
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
