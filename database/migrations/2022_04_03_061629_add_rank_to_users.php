<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
          $table->index('rank_id');
          $table->foreign('rank_id')->references('id')->on('rank')->onDelete('cascade');
          $table->index('boss_id');
          $table->foreign('boss_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
          $table->dropForeign('users_rank_id_foreign');
          $table->dropIndex('users_rank_id_index');
          $table->dropForeign('users_boss_id_foreign');
          $table->dropIndex('users_boss_id_index');
        });
    }
};
