<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Program;
use App\Models\Category;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => '12345678',
            'is_admin' => true,
        ]);

        Category::create([
            'name' => 'How to talk',
            'user_id' => $user->id
           ]);

        for ($i=0; $i < 10; $i++) { 
            Program::create([
             'name' => 'Program'.' '. $i
            ]);
        }  
    }
}
