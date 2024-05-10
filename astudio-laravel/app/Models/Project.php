<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'name', 'department', 'start_date', 'end_date', 'status',
    ];

    /**
     * Get the users associated with the project.
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Get the timesheets logged for the project.
     */
    public function timesheets()
    {
        return $this->hasMany(Timesheet::class);
    }
}
