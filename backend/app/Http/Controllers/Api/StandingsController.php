<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Team;
use App\Models\Matches;

class StandingsController extends Controller
{
    public function index()
    {
        $teams = Team::all()->map(function ($team) {
            $played = Matches::where(function ($q) use ($team) {
                $q->where('home_team_id', $team->id)->orWhere('away_team_id', $team->id);
            })->whereNotNull('home_score')->whereNotNull('away_score')->count();

            $won = Matches::where('home_team_id', $team->id)->whereColumn('home_score', '>', 'away_score')->count()
                + Matches::where('away_team_id', $team->id)->whereColumn('away_score', '>', 'home_score')->count();

            $draw = Matches::where(function ($q) use ($team) {
                $q->where('home_team_id', $team->id)->orWhere('away_team_id', $team->id);
            })->whereColumn('home_score', '=', 'away_score')->count();

            $points = $won * 3 + $draw;
            $goal_diff = $team->goals_for - $team->goals_against;

            return [
                'team' => $team->name,
                'points' => $points,
                'played' => $played,
                'goal_diff' => $goal_diff,
                'goals_for' => $team->goals_for,
            ];
        });

        return $teams->sortByDesc('points')->sortByDesc('goal_diff')->sortByDesc('goals_for')->values();
    }
}
