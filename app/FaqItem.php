<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FaqItem extends Model
{
    protected $appends = ['category'];

    protected $fillable = ["title", "content", "show"];

    public function faqCategory() {
        return $this->belongsTo(FaqCategory::class);
    }

    public function getCategoryAttribute() {
        return $this->faqCategory->name;
    }
}
