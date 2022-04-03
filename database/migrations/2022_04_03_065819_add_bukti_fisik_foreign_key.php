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
        Schema::table('bukti_fisik', function (Blueprint $table) {
          $table->index('kpi_activity_id');
          $table->foreign('kpi_activity_id')->references('id')->on('kpi_activity')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('bukti_fisik', function (Blueprint $table) {
          $table->dropForeign('bukti_fisik_kpi_activity_id_foreign');
          $table->dropIndex('bukti_fisik_kpi_activity_id_index');
        });
    }
};
