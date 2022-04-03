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
        Schema::table('submission_bukti_fisik', function (Blueprint $table) {
          $table->index('kpi_submission_id');
          $table->foreign('kpi_submission_id')->references('id')->on('kpi_submission')->onDelete('cascade');
          $table->index('bukti_id');
          $table->foreign('bukti_id')->references('id')->on('bukti_fisik')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('submission_bukti_fisik', function (Blueprint $table) {
          $table->dropForeign('submission_bukti_fisik_kpi_submission_id_foreign');
          $table->dropIndex('submission_bukti_fisik_kpi_submission_id_index');
          $table->dropForeign('submission_bukti_fisik_bukti_id_foreign');
          $table->dropIndex('submission_bukti_fisik_bukti_id_index');
        });
    }
};
