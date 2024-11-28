<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::query();

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $tasks->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $tasks->where('status', request('status'));
        }

        $tasks = $tasks->orderBy($sortField, $sortDirection)->paginate(10);

        return inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success') ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::query()->orderBy('name')->get();
        $projects = Project::query()->orderBy('name')->get();

        return inertia('Task/Create', [
            'users' => UserResource::collection($users),
            'projects' => ProjectResource::collection($projects)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();

        if ($image) {
            $data['image_path'] = $image->store('task/' . Str::random(10), 'public');
        }

        Task::create($data);

        return redirect()->route('task.index')->with('success', 'Task created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Task/Show', [
            'task' => new TaskResource($task)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $users = User::query()->orderBy('name')->get();
        $projects = Project::query()->orderBy('name')->get();

        return inertia('Task/Edit', [
            'task' => new TaskResource($task),
            'users' => UserResource::collection($users),
            'projects' => ProjectResource::collection($projects)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = auth()->id();

        if ($image) {
            if ($task->image_path) {
                Storage::deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('task/' . Str::random(10), 'public');
        }
        $task->update($data);

        return redirect()->route('task.index')->with('success', 'Task updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;

        $task->delete();

        return redirect()->route('task.index')->with('success', "Task \"$name\" deleted successfully");
    }

    public function myTasks()
    {
        $tasks = Task::query()->where('assigned_user_id', auth()->id());

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $tasks->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $tasks->where('status', request('status'));
        }

        $tasks = $tasks->orderBy($sortField, $sortDirection)->paginate(10);

        return inertia('Task/MyTasks', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success') ?: null,
        ]);
    }
}
