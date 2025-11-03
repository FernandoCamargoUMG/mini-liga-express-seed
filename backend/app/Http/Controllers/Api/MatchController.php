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
    public function index(Request $request)
    {
        $query = Matches::with(['homeTeam', 'awayTeam']);

        // Si se pide solo partidos pendientes (sin resultado)
        if ($request->query('played') === 'false') {
            $query->whereNull('home_score')->whereNull('away_score');
        }
        // Si se pide solo partidos jugados
        elseif ($request->query('played') === 'true') {
            $query->whereNotNull('home_score')->whereNotNull('away_score');
        }

        $matches = $query->orderBy('created_at', 'asc')->get();

        return response()->json([
            'success' => true,
            'matches' => $matches->map(function ($match) {
                return [
                    'id' => $match->id,
                    'home_team' => [
                        'id' => $match->homeTeam->id,
                        'name' => $match->homeTeam->name
                    ],
                    'away_team' => [
                        'id' => $match->awayTeam->id,
                        'name' => $match->awayTeam->name
                    ],
                    'home_score' => $match->home_score,
                    'away_score' => $match->away_score,
                    'played_at' => $match->played_at,
                    'is_played' => !is_null($match->home_score) && !is_null($match->away_score),
                    'created_at' => $match->created_at,
                    'updated_at' => $match->updated_at
                ];
            })
        ]);
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
