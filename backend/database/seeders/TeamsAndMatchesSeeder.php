<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamsAndMatchesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teams = collect(['Barcelona', 'Atletico de Madrid', 'Real Madrid', 'Real Betis'])
            ->map(fn($name) => \App\Models\Team::create(['name' => $name]));

        // Crea partidos sin resultado
        \App\Models\Matches::create([
            'home_team_id' => $teams[0]->id,
            'away_team_id' => $teams[1]->id,
        ]);
        \App\Models\Matches::create([
            'home_team_id' => $teams[2]->id,
            'away_team_id' => $teams[3]->id,
        ]);
        \App\Models\Matches::create([
            'home_team_id' => $teams[0]->id,
            'away_team_id' => $teams[2]->id,
        ]);
    }
}
