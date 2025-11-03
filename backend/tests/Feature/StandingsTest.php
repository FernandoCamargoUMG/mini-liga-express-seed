<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class StandingsTest extends TestCase
{
    use \Illuminate\Foundation\Testing\RefreshDatabase;

    public function test_standings_points_calculation()
    {
        // Crear dos equipos
        $teamA = \App\Models\Team::create(['name' => 'Sevilla']);
        $teamB = \App\Models\Team::create(['name' => 'Real Madrid']);

        // Crear un partido entre ellos
        $match = \App\Models\Matches::create([
            'home_team_id' => $teamA->id,
            'away_team_id' => $teamB->id,
        ]);

        // Registrar resultado: victoria de A
        $match->update([
            'home_score' => 2,
            'away_score' => 1,
        ]);
        $teamA->refresh();
        $teamB->refresh();

        // Registrar resultado: empate
        $match2 = \App\Models\Matches::create([
            'home_team_id' => $teamA->id,
            'away_team_id' => $teamB->id,
        ]);
        $match2->update([
            'home_score' => 1,
            'away_score' => 1,
        ]);
        $teamA->refresh();
        $teamB->refresh();

        // Verificar puntos
        $response = $this->getJson('/api/standings');
        $response->assertStatus(200);
        $standings = $response->json();

        $equipoA = collect($standings)->firstWhere('team', 'Sevilla');
        $equipoB = collect($standings)->firstWhere('team', 'Real Madrid');

        $this->assertEquals(4, $equipoA['points']); // 3 victoria + 1 empate
        $this->assertEquals(1, $equipoB['points']); // 1 empate
        $this->assertEquals(2, $equipoA['played']);
        $this->assertEquals(2, $equipoB['played']);
    }
}
