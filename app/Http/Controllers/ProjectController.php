<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::query();

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $projects->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $projects->where('status', request('status'));
        }

        $projects = $projects->orderBy($sortField, $sortDirection)->paginate(10);

        return inertia('Project/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success') ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();

        if ($image) {
            $data['image_path'] = $image->store('project/' . Str::random(10), 'public');
        }

        Project::create($data);

        return redirect()->route('project.index')->with('success', 'Project created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $tasks = $project->tasks();

        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_direction', 'asc');

        if (request('name')) {
            $tasks->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $tasks->where('status', request('status'));
        }

        $tasks = $tasks->orderBy($sortField, $sortDirection)->paginate(10);

        return inertia('Project/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();

        $image = $data['image'] ?? null;
        $data['updated_by'] = auth()->id();

        if ($image) {
            if ($project->image_path) {
                Storage::deleteDirectory(dirname($project->image_path));
            }
            $data['image_path'] = $image->store('project/' . Str::random(10), 'public');
        }

        $project->update($data);

        return redirect()->route('project.index')->with('success', 'Project updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;

        $project->delete();
        if ($project->image_path) {
            Storage::deleteDirectory(dirname($project->image_path));
        }

        $project->tasks()->delete();

        return redirect()->route('project.index')->with('success', "Project \"$name\" deleted successfully");
    }
}
