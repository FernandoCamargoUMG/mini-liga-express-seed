<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Matches;

class MatchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function result(Request $request, $id)
    {
        $request->validate([
            'home_score' => 'required|integer|min:0',
            'away_score' => 'required|integer|min:0',
        ]);

        $match = Matches::findOrFail($id);
        $match->update([
            'home_score' => $request->home_score,
            'away_score' => $request->away_score,
            'played_at' => now(),
        ]);

        // Actualiza goles de los equipos
        $match->homeTeam->increment('goals_for', $request->home_score);
        $match->homeTeam->increment('goals_against', $request->away_score);
        $match->awayTeam->increment('goals_for', $request->away_score);
        $match->awayTeam->increment('goals_against', $request->home_score);

        return $match;
    }
}
