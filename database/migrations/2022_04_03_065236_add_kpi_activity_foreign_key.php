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
        Schema::table('kpi_activity', function (Blueprint $table) {
          $table->index('rank_id');
          $table->foreign('rank_id')->references('id')->on('rank')->onDelete('cascade');
          $table->index('kpi_group_id');
          $table->foreign('kpi_group_id')->references('id')->on('kpi_group')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('kpi_activity', function (Blueprint $table) {
          $table->dropForeign('kpi_activity_rank_id_foreign');
          $table->dropIndex('kpi_activity_rank_id_index');
          $table->dropForeign('kpi_activity_kpi_group_id_foreign');
          $table->dropIndex('kpi_activity_kpi_group_id_index');
        });
    }
};
