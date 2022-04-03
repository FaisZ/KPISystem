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
        Schema::table('kpi_submission', function (Blueprint $table) {
          $table->index('kpi_activity_id');
          $table->foreign('kpi_activity_id')->references('id')->on('kpi_activity')->onDelete('cascade');
          $table->index('user_id');
          $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('kpi_submission', function (Blueprint $table) {
          $table->dropForeign('kpi_submission_kpi_activity_id_foreign');
          $table->dropIndex('kpi_submission_kpi_activity_id_index');
          $table->dropForeign('kpi_submission_user_id_foreign');
          $table->dropIndex('kpi_submission_user_id_index');
        });
    }
};
