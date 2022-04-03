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
        Schema::table('kpi_group', function (Blueprint $table) {
          $table->index('parent_id');
          $table->foreign('parent_id')->references('id')->on('kpi_group')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('kpi_group', function (Blueprint $table) {
          $table->dropForeign('kpi_group_parent_id_foreign');
          $table->dropIndex('kpi_group_parent_id_index');
        });
    }
};
