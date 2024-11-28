<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $total_pending_tasks = Task::query()->where('status', 'pending')->count();
        $my_pending_tasks = Task::query()->where('assigned_user_id', auth()->id())->where('status', 'pending')->count();

        $total_in_progress_tasks = Task::query()->where('status', 'in_progress')->count();
        $my_in_progress_tasks = Task::query()->where('assigned_user_id', auth()->id())->where('status', 'in_progress')->count();

        $total_completed_tasks = Task::query()->where('status', 'completed')->count();
        $my_completed_tasks = Task::query()->where('assigned_user_id', auth()->id())->where('status', 'completed')->count();

        $active_tasks = Task::query()->whereIn('status', ['pending', 'in_progress'])->limit(10)->get();
        $active_tasks = TaskResource::collection($active_tasks);

        return inertia('Dashboard', compact(
            'total_pending_tasks',
            'my_pending_tasks',
            'total_in_progress_tasks',
            'my_in_progress_tasks',
            'total_completed_tasks',
            'my_completed_tasks',
            'active_tasks'
        ));
    }
}
